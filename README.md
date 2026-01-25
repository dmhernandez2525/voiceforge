# Qwen3-TTS Voice Generator

[![Website](https://img.shields.io/badge/Website-qwen--tts--website.onrender.com-blue)](https://qwen-tts-website.onrender.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)
[![macOS](https://img.shields.io/badge/Platform-macOS%2012%2B-lightgrey)](https://www.apple.com/macos/)

A macOS app for local text-to-speech generation and voice cloning using Qwen3-TTS.

**[View Website](https://qwen-tts-website.onrender.com)** | **[GitHub Repo](https://github.com/dmhernandez2525/qwen-tts-app)**

## Features

- **3-Second Voice Cloning**: Clone any voice from a short audio sample
- **Preset Voices**: Use built-in voices (Ryan, Aiden, Vivian, etc.) with style instructions
- **Voice Design**: Create custom voices from natural language descriptions
- **10 Languages**: English, Chinese, Japanese, Korean, German, French, Russian, Portuguese, Spanish, Italian
- **100% Local**: All processing runs on your Mac - no cloud required
- **GPU Accelerated**: Runs on Metal (MPS) for Apple Silicon
- **Menu Bar App**: Quick access from the status bar

## Requirements

- macOS 12.0 or later (Apple Silicon recommended)
- Python 3.11 or 3.12
- 8GB+ RAM
- ~10-15GB disk space for models

## Quick Start

```bash
# Clone the repo
git clone https://github.com/dmhernandez2525/qwen-tts-app.git
cd qwen-tts-app

# Install dependencies
./scripts/install.sh

# Build the Swift app
cd QwenTTS && ./build.sh && cd ..

# Run everything
./start.sh
```

## Installation

### 1. Install Python dependencies

```bash
chmod +x scripts/install.sh
./scripts/install.sh
```

Or manually with a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
pip install qwen-tts torch soundfile numpy
```

### 2. Build the Swift app

```bash
cd QwenTTS
chmod +x build.sh
./build.sh
```

This creates `Qwen TTS.app` on your Desktop.

### 3. Run the app

```bash
./start.sh
```

This starts the Python server and launches the app.

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

- **Qwen3-TTS-12Hz-1.7B-Base**: Voice cloning model (~3-4GB)
- **Qwen3-TTS-12Hz-1.7B-CustomVoice**: Preset voices with instructions (~3-4GB)
- **Qwen3-TTS-12Hz-1.7B-VoiceDesign**: Natural language voice design (~3-4GB)

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
2. Check qwen-tts is installed: `pip show qwen-tts`
3. Check port 8765 is available: `lsof -i :8765`

### Generation fails

1. Ensure server is running (green status icon)
2. Check server logs in the app (click "Show Server Log")
3. First generation may be slow - models download automatically

### Out of memory

- Close other apps to free RAM
- Models require 8-16GB RAM depending on which are loaded
- Use the 0.6B models for lower memory usage

## Project Structure

```
qwen-tts-app/
├── QwenTTS/               # Swift macOS app
│   ├── Sources/           # Swift source files
│   └── build.sh           # Build script
├── python-backend/        # Python TTS server
│   ├── server.py          # REST API server
│   └── requirements.txt   # Python dependencies
├── website/               # Marketing website
│   └── src/               # React + Vite + Tailwind
├── scripts/
│   └── install.sh         # Installation script
├── start.sh               # One-click launcher
├── render.yaml            # Render deployment config
└── README.md
```

## Credits

- [Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS) by Alibaba Cloud
- Apache 2.0 License
