#!/usr/bin/env python3
"""
Qwen3-TTS Local Server
Provides REST API for voice cloning and TTS generation
"""

import os
import sys
import json
import tempfile
import base64
import threading
from pathlib import Path
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

# Global model instances
model_custom = None
model_clone = None
model_design = None
model_lock = threading.Lock()

OUTPUT_DIR = Path(os.environ.get("OUTPUT_DIR", str(Path.home() / "output")))
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def load_models(model_type="clone"):
    """Load Qwen3-TTS models on demand"""
    global model_custom, model_clone, model_design

    import torch
    from qwen_tts import Qwen3TTSModel

    # Determine device and dtype for Mac
    if torch.backends.mps.is_available():
        device = "mps"
        dtype = torch.float32  # MPS requires float32 for voice cloning
    elif torch.cuda.is_available():
        device = "cuda:0"
        dtype = torch.bfloat16
    else:
        device = "cpu"
        dtype = torch.float32

    with model_lock:
        if model_type == "clone" and model_clone is None:
            print(f"Loading voice clone model on {device}...")
            model_clone = Qwen3TTSModel.from_pretrained(
                "Qwen/Qwen3-TTS-12Hz-1.7B-Base",
                device_map=device,
                dtype=dtype,
            )
            print("Voice clone model loaded!")

        elif model_type == "custom" and model_custom is None:
            print(f"Loading custom voice model on {device}...")
            model_custom = Qwen3TTSModel.from_pretrained(
                "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",
                device_map=device,
                dtype=dtype,
            )
            print("Custom voice model loaded!")

        elif model_type == "design" and model_design is None:
            print(f"Loading voice design model on {device}...")
            model_design = Qwen3TTSModel.from_pretrained(
                "Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign",
                device_map=device,
                dtype=dtype,
            )
            print("Voice design model loaded!")


class TTSHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"[Server] {args[0]}")

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == "/health":
            self.send_json({"status": "ok", "models_loaded": {
                "clone": model_clone is not None,
                "custom": model_custom is not None,
                "design": model_design is not None,
            }})

        elif parsed.path == "/speakers":
            speakers = [
                {"id": "Vivian", "lang": "Chinese", "desc": "Chinese female"},
                {"id": "Serena", "lang": "Chinese", "desc": "Chinese female"},
                {"id": "Uncle_Fu", "lang": "Chinese", "desc": "Chinese male elder"},
                {"id": "Dylan", "lang": "Chinese", "desc": "Chinese male"},
                {"id": "Eric", "lang": "Chinese", "desc": "Chinese male"},
                {"id": "Ryan", "lang": "English", "desc": "English male"},
                {"id": "Aiden", "lang": "English", "desc": "English male"},
                {"id": "Ono_Anna", "lang": "Japanese", "desc": "Japanese female"},
                {"id": "Sohee", "lang": "Korean", "desc": "Korean female"},
            ]
            self.send_json({"speakers": speakers})

        elif parsed.path == "/languages":
            languages = ["Chinese", "English", "Japanese", "Korean", "German",
                        "French", "Russian", "Portuguese", "Spanish", "Italian", "Auto"]
            self.send_json({"languages": languages})

        else:
            self.send_json({"error": "Not found"}, 404)

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body) if body else {}
        except json.JSONDecodeError:
            self.send_json({"error": "Invalid JSON"}, 400)
            return

        parsed = urlparse(self.path)

        if parsed.path == "/generate/custom":
            self._handle_custom_voice(data)

        elif parsed.path == "/generate/clone":
            self._handle_voice_clone(data)

        elif parsed.path == "/generate/design":
            self._handle_voice_design(data)

        elif parsed.path == "/load":
            model_type = data.get("model", "clone")
            try:
                load_models(model_type)
                self.send_json({"status": "loaded", "model": model_type})
            except Exception as e:
                self.send_json({"error": str(e)}, 500)

        else:
            self.send_json({"error": "Not found"}, 404)

    def _handle_custom_voice(self, data):
        """Generate speech using preset voices"""
        import soundfile as sf

        text = data.get("text", "")
        language = data.get("language", "English")
        speaker = data.get("speaker", "Ryan")
        instruct = data.get("instruct", "")

        if not text:
            self.send_json({"error": "Text is required"}, 400)
            return

        try:
            load_models("custom")

            wavs, sr = model_custom.generate_custom_voice(
                text=text,
                language=language,
                speaker=speaker,
                instruct=instruct,
            )

            output_path = OUTPUT_DIR / f"custom_{speaker}_{hash(text) % 10000}.wav"
            sf.write(str(output_path), wavs[0], sr)

            self.send_json({
                "status": "success",
                "output_path": str(output_path),
                "sample_rate": sr,
            })

        except Exception as e:
            self.send_json({"error": str(e)}, 500)

    def _handle_voice_clone(self, data):
        """Clone a voice from reference audio"""
        import soundfile as sf
        import numpy as np

        text = data.get("text", "")
        language = data.get("language", "English")
        ref_audio_path = data.get("ref_audio_path")
        ref_audio_base64 = data.get("ref_audio_base64")
        ref_text = data.get("ref_text", "")

        if not text:
            self.send_json({"error": "Text is required"}, 400)
            return

        if not ref_audio_path and not ref_audio_base64:
            self.send_json({"error": "Reference audio is required"}, 400)
            return

        try:
            load_models("clone")

            # Handle base64 audio
            if ref_audio_base64:
                audio_data = base64.b64decode(ref_audio_base64)
                with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
                    f.write(audio_data)
                    ref_audio_path = f.name

            wavs, sr = model_clone.generate_voice_clone(
                text=text,
                language=language,
                ref_audio=ref_audio_path,
                ref_text=ref_text,
            )

            output_path = OUTPUT_DIR / f"clone_{hash(text) % 10000}.wav"
            sf.write(str(output_path), wavs[0], sr)

            self.send_json({
                "status": "success",
                "output_path": str(output_path),
                "sample_rate": sr,
            })

        except Exception as e:
            self.send_json({"error": str(e)}, 500)

    def _handle_voice_design(self, data):
        """Generate speech with designed voice from description"""
        import soundfile as sf

        text = data.get("text", "")
        language = data.get("language", "English")
        instruct = data.get("instruct", "")

        if not text:
            self.send_json({"error": "Text is required"}, 400)
            return

        if not instruct:
            self.send_json({"error": "Voice description (instruct) is required"}, 400)
            return

        try:
            load_models("design")

            wavs, sr = model_design.generate_voice_design(
                text=text,
                language=language,
                instruct=instruct,
            )

            output_path = OUTPUT_DIR / f"design_{hash(instruct) % 10000}.wav"
            sf.write(str(output_path), wavs[0], sr)

            self.send_json({
                "status": "success",
                "output_path": str(output_path),
                "sample_rate": sr,
            })

        except Exception as e:
            self.send_json({"error": str(e)}, 500)


def main():
    port = int(os.environ.get("PORT", 8765))
    host = os.environ.get("HOST", "0.0.0.0")
    server = HTTPServer((host, port), TTSHandler)
    print(f"Qwen3-TTS Server running on http://{host}:{port}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("\nEndpoints:")
    print("  GET  /health     - Check server status")
    print("  GET  /speakers   - List available preset speakers")
    print("  GET  /languages  - List supported languages")
    print("  POST /load       - Preload a model (clone, custom, design)")
    print("  POST /generate/custom - Generate with preset voice")
    print("  POST /generate/clone  - Clone voice from reference")
    print("  POST /generate/design - Generate with designed voice")
    print("\nWaiting for requests...")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down...")
        server.shutdown()


if __name__ == "__main__":
    main()
