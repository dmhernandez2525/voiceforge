# Qwen3-TTS Voice Generator

A macOS app for local text-to-speech generation and voice cloning using Qwen3-TTS.

## Features

- **Preset Voices**: Use built-in voices (Ryan, Aiden, Vivian, etc.) with style instructions
- **Voice Cloning**: Clone any voice from a 3+ second audio sample
- **Voice Design**: Create custom voices from natural language descriptions
- **10 Languages**: English, Chinese, Japanese, Korean, German, French, Russian, Portuguese, Spanish, Italian
- **Fully Local**: All processing runs on your Mac - no cloud required
- **Menu Bar App**: Quick access from the status bar

## Requirements

- macOS 12.0 or later (Apple Silicon recommended)
- Python 3.12
- ~10-15GB disk space for models

## Installation

### 1. Install Python dependencies

```bash
cd ~/Desktop/Projects/PersonalProjects/qwen-tts-app
chmod +x scripts/install.sh
./scripts/install.sh
```

Or manually:

```bash
# With conda (recommended)
conda create -n qwen3-tts python=3.12 -y
conda activate qwen3-tts
pip install qwen-tts torch soundfile numpy

# Or with pip globally
pip3 install qwen-tts torch soundfile numpy
```

### 2. Build the Swift app

```bash
cd QwenTTS
chmod +x build.sh
./build.sh
```

This creates `Qwen TTS.app` on your Desktop.

### 3. Start the server

```bash
# If using conda:
conda activate qwen3-tts

# Start server
python3 python-backend/server.py
```

### 4. Run the app

Double-click `Qwen TTS.app` on your Desktop, or use the menu bar icon.

## Usage

### Preset Voices

1. Select the "Preset Voices" tab
2. Enter text to speak
3. Choose a language and speaker
4. Optionally add a style instruction (e.g., "Speak happily")
5. Click Generate

### Voice Cloning

1. Select the "Voice Clone" tab
2. Click "Browse" to select a reference audio file (3+ seconds)
3. Enter the transcript of the reference audio
4. Enter new text to speak in the cloned voice
5. Click Generate

### Voice Design

1. Select the "Voice Design" tab
2. Describe the voice you want in natural language
3. Enter text to speak
4. Click Generate

## API Endpoints

The Python server exposes these endpoints on `http://127.0.0.1:8765`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Check server status |
| `/speakers` | GET | List available preset speakers |
| `/languages` | GET | List supported languages |
| `/load` | POST | Preload a model |
| `/generate/custom` | POST | Generate with preset voice |
| `/generate/clone` | POST | Clone voice from reference |
| `/generate/design` | POST | Generate with designed voice |

## Model Information

Qwen3-TTS models are downloaded automatically on first use:

- **Qwen3-TTS-12Hz-1.7B-Base**: Voice cloning model
- **Qwen3-TTS-12Hz-1.7B-CustomVoice**: Preset voices with instructions
- **Qwen3-TTS-12Hz-1.7B-VoiceDesign**: Natural language voice design

Models are cached in `~/.cache/huggingface/`.

## Mac Optimization

- Runs on MPS (Metal Performance Shaders) for Apple Silicon
- Uses float32 for voice cloning (required for MPS stability)
- FlashAttention not available on Mac (warning can be ignored)

## Output

Generated audio files are saved to:
```
~/Desktop/Qwen-TTS-Output/
```

## Troubleshooting

### Server won't start

1. Check Python is installed: `python3 --version`
2. Check qwen-tts is installed: `pip3 show qwen-tts`
3. Check port 8765 is available: `lsof -i :8765`

### Generation fails

1. Ensure server is running (green status icon)
2. Check server logs in the app (click "Show Server Log")
3. First generation may take time to download models

### Out of memory

- Close other apps to free RAM
- Models require 8-16GB RAM depending on which are loaded
- Use the 0.6B models for lower memory usage

## Credits

- [Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS) by Alibaba Cloud
- Apache 2.0 License
