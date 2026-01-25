# VoiceForge

[![Website](https://img.shields.io/badge/Website-voiceforge.onrender.com-blue)](https://voiceforge.onrender.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)
[![macOS](https://img.shields.io/badge/Platform-macOS%2012%2B-lightgrey)](https://www.apple.com/macos/)
[![Python](https://img.shields.io/badge/Python-3.11%2B-blue)](https://www.python.org/)

A powerful macOS app for local text-to-speech generation and voice cloning, powered by Qwen3-TTS.

**[View Website](https://voiceforge.onrender.com)** | **[GitHub Repo](https://github.com/dmhernandez2525/qwen-tts-app)** | **[Try Cloud Version](https://voiceforge.onrender.com/cloud)**

---

## Overview

VoiceForge brings state-of-the-art AI voice synthesis to your Mac. Clone any voice from just 3 seconds of audio, generate speech with preset voices, or design entirely new voices from natural language descriptions - all running 100% locally on your device.

### Key Features

| Feature | Description |
|---------|-------------|
| **3-Second Voice Cloning** | Clone any voice from a short audio sample - no training required |
| **Preset Voices** | 6 built-in voices with style instruction support |
| **Voice Design** | Create custom voices from text descriptions ("warm British female voice") |
| **10 Languages** | English, Chinese, Japanese, Korean, German, French, Russian, Portuguese, Spanish, Italian |
| **100% Local** | All processing on your Mac - your audio never leaves your device |
| **GPU Accelerated** | Optimized for Apple Silicon (M1/M2/M3/M4) via Metal |
| **Menu Bar App** | Quick access from status bar with system notifications |
| **REST API** | Full API for automation and integration |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              VoiceForge System                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        macOS Menu Bar App                             │   │
│  │                     (Swift / Cocoa / AppKit)                          │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   Preset    │  │   Voice     │  │   Voice     │  │   History   │  │   │
│  │  │   Voices    │  │   Clone     │  │   Design    │  │   Manager   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │              HTTP Client (URLSession)                         │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                              HTTP (port 8765)                                │
│                                    │                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                       Python TTS Server                               │   │
│  │                  (http.server / Qwen3-TTS SDK)                        │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │  /health    │  │  /generate/ │  │  /generate/ │  │  /generate/ │  │   │
│  │  │  /speakers  │  │   custom    │  │   clone     │  │   design    │  │   │
│  │  │  /languages │  │             │  │             │  │             │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │                    Model Manager                               │   │   │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │   │   │
│  │  │  │  Clone Model │  │ Custom Model │  │ Design Model │        │   │   │
│  │  │  │   (1.7B)     │  │   (1.7B)     │  │   (1.7B)     │        │   │   │
│  │  │  └──────────────┘  └──────────────┘  └──────────────┘        │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                              PyTorch / MPS                                   │
│                                    │                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                       Apple Silicon GPU                               │   │
│  │                  (Metal Performance Shaders)                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

                              Data Flow

┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│   User   │────▶│  Swift   │────▶│  Python  │────▶│  Qwen3   │
│  Input   │     │   App    │     │  Server  │     │   TTS    │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │                                  │
                      │           ┌──────────┐          │
                      └───────────│  Audio   │◀─────────┘
                                  │  Output  │
                                  └──────────┘
```

---

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **macOS** | 12.0 (Monterey) | 14.0+ (Sonoma) |
| **Processor** | Apple Silicon (M1) | M1 Pro/Max or newer |
| **RAM** | 8GB | 16GB+ |
| **Storage** | 15GB | 25GB (for all models) |
| **Python** | 3.11 | 3.11 or 3.12 |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/dmhernandez2525/qwen-tts-app.git
cd qwen-tts-app

# Install Python dependencies
./scripts/install.sh

# Build the macOS app
cd QwenTTS && ./build.sh && cd ..

# Launch everything
./start.sh
```

The app will appear in your menu bar and automatically start the TTS server.

---

## Detailed Installation

### Step 1: Prerequisites

Ensure you have the following installed:

```bash
# Check Python version (must be 3.11 or 3.12)
python3 --version

# If needed, install Python 3.11 via Homebrew
brew install python@3.11
```

### Step 2: Install Dependencies

```bash
# Make scripts executable
chmod +x scripts/install.sh

# Run the installer (creates venv, installs packages)
./scripts/install.sh
```

Or manually:

```bash
python3 -m venv venv
source venv/bin/activate
pip install qwen-tts torch soundfile numpy
```

### Step 3: Build the App

```bash
cd QwenTTS
chmod +x build.sh
./build.sh
```

This creates `VoiceForge.app` on your Desktop.

### Step 4: Launch

```bash
./start.sh
```

Or open `VoiceForge.app` directly from your Desktop.

---

## Usage Guide

### Mode 1: Preset Voices

Use built-in voices for quick text-to-speech without any audio samples.

| Speaker | Language | Description |
|---------|----------|-------------|
| Ryan | English | Male, professional |
| Aiden | English | Male, casual |
| Vivian | Chinese | Female, formal |
| Serena | Chinese | Female, warm |
| Lucas | English | Male, energetic |
| Ava | English | Female, friendly |

**Steps:**
1. Select the "Preset Voices" tab
2. Enter your text
3. Choose language and speaker
4. Add optional style instruction (e.g., "Speak with enthusiasm")
5. Click Generate

**Style Instructions Examples:**
- "Speak happily"
- "Whisper softly"
- "Read with dramatic emphasis"
- "Speak like a news anchor"

### Mode 2: Voice Cloning

Clone any voice from a 3-second audio sample.

**Steps:**
1. Select the "Voice Clone" tab
2. Click "Browse" to select reference audio (WAV, MP3)
3. Enter the exact transcript of the audio
4. Type the new text you want spoken
5. Select language
6. Click Generate

**Tips for Best Results:**
- Use clear audio without background noise
- 3-10 seconds of speech works best
- Accurate transcript dramatically improves quality
- Single speaker only (no multiple voices)

### Mode 3: Voice Design

Create custom voices from text descriptions.

**Steps:**
1. Select the "Voice Design" tab
2. Describe the voice you want
3. Enter text to speak
4. Click Generate

**Example Descriptions:**
- "A warm, friendly female voice with a slight British accent"
- "A deep male voice, speaking slowly and deliberately"
- "An energetic young voice with enthusiasm"
- "A calm, soothing voice suitable for meditation"

---

## API Reference

### Base URL
```
http://127.0.0.1:8765
```

### Endpoints

#### GET /health
Check server status and loaded models.

```bash
curl http://127.0.0.1:8765/health
```

**Response:**
```json
{
  "status": "ok",
  "models_loaded": {
    "clone": true,
    "custom": false,
    "design": false
  }
}
```

#### GET /speakers
List available preset speakers.

```bash
curl http://127.0.0.1:8765/speakers
```

#### GET /languages
List supported languages.

```bash
curl http://127.0.0.1:8765/languages
```

#### POST /load
Preload a model into memory.

```bash
curl -X POST http://127.0.0.1:8765/load \
  -H "Content-Type: application/json" \
  -d '{"model": "clone"}'
```

**Parameters:**
- `model`: One of "clone", "custom", or "design"

#### POST /generate/custom
Generate speech with a preset voice.

```bash
curl -X POST http://127.0.0.1:8765/generate/custom \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello world!",
    "speaker": "Ryan",
    "language": "English",
    "instruction": "Speak clearly"
  }'
```

#### POST /generate/clone
Clone voice from reference audio.

```bash
curl -X POST http://127.0.0.1:8765/generate/clone \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Text to speak in cloned voice",
    "reference_audio": "/path/to/audio.wav",
    "reference_text": "Transcript of the reference audio",
    "language": "English"
  }'
```

#### POST /generate/design
Generate with a designed voice.

```bash
curl -X POST http://127.0.0.1:8765/generate/design \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello world!",
    "voice_description": "A warm female voice with a British accent",
    "language": "English"
  }'
```

---

## Model Information

VoiceForge uses Qwen3-TTS models from Alibaba Cloud. Models download automatically on first use.

| Model | Size | Purpose |
|-------|------|---------|
| Qwen3-TTS-12Hz-1.7B-Base | ~3.5GB | Voice cloning |
| Qwen3-TTS-12Hz-1.7B-CustomVoice | ~3.5GB | Preset voices with instructions |
| Qwen3-TTS-12Hz-1.7B-VoiceDesign | ~3.5GB | Voice design from descriptions |

**Model Storage Location:**
```
~/.cache/huggingface/hub/
```

**Smaller Model Variants (0.6B):**
For systems with limited RAM, 0.6B variants are available with reduced quality.

---

## Output Files

Generated audio files are saved to:
```
~/Desktop/VoiceForge-Output/
```

**File Naming Convention:**
```
voiceforge_YYYYMMDD_HHMMSS.wav
```

**Audio Format:**
- Format: WAV
- Sample Rate: 24kHz
- Channels: Mono
- Bit Depth: 16-bit

---

## Troubleshooting

### Server Won't Start

1. **Check Python version:**
   ```bash
   python3 --version  # Must be 3.11 or 3.12, NOT 3.14
   ```

2. **Check if port is in use:**
   ```bash
   lsof -i :8765
   # If occupied, kill the process
   kill -9 <PID>
   ```

3. **Check package installation:**
   ```bash
   source venv/bin/activate
   pip show qwen-tts
   ```

### Generate Button Disabled

The Generate button is disabled when:
- Server is not running (check status indicator)
- Server is still starting up
- A previous generation is in progress

**Solution:** Wait for green status indicator, or click "Start Server"

### First Generation Is Slow

This is normal - models (~3GB each) download on first use. Check server log for progress.

### Out of Memory Errors

1. Close other applications
2. Use 0.6B model variants
3. Only one model loads at a time - switch modes to unload

### Audio Quality Issues

1. Use high-quality reference audio (voice cloning)
2. Ensure accurate transcript
3. Keep reference audio 3-10 seconds
4. Use WAV format for best quality

---

## Project Structure

```
qwen-tts-app/
├── QwenTTS/                    # Swift macOS app
│   ├── Sources/
│   │   ├── AppDelegate.swift   # App lifecycle & menu bar
│   │   ├── ServerManager.swift # Python server management
│   │   ├── TTSManager.swift    # TTS generation requests
│   │   ├── Utils.swift         # Helpers & HTTP client
│   │   ├── Windows/
│   │   │   └── MainWindow.swift # Main window UI
│   │   └── main.swift          # Entry point
│   └── build.sh                # Build script
│
├── python-backend/
│   ├── server.py               # REST API server
│   └── requirements.txt        # Python dependencies
│
├── website/                    # Marketing website
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── index.css          # Tailwind styles
│   │   └── main.jsx           # React entry
│   ├── vite.config.js         # Vite configuration
│   └── package.json           # Node dependencies
│
├── scripts/
│   └── install.sh             # Installation script
│
├── start.sh                   # One-click launcher
├── render.yaml                # Render deployment config
└── README.md                  # This file
```

---

## Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/dmhernandez2525/qwen-tts-app.git
cd qwen-tts-app

# Setup Python environment
python3.11 -m venv venv
source venv/bin/activate
pip install -r python-backend/requirements.txt

# Build Swift app
cd QwenTTS
./build.sh
```

### Running in Development

```bash
# Terminal 1: Start Python server
source venv/bin/activate
python python-backend/server.py

# Terminal 2: Run Swift app from Xcode or build output
./QwenTTS/build/QwenTTS
```

### Website Development

```bash
cd website
npm install
npm run dev  # Starts at localhost:5173
```

---

## Use Cases

### Content Creation
- YouTube video narration
- Podcast intros/outros
- Audiobook creation
- E-learning materials

### Accessibility
- Screen reader alternatives
- Document narration
- Multi-language content

### Creative Projects
- Game character voices
- Animation dubbing
- Interactive storytelling

### Business
- IVR/phone system voices
- Product demo narration
- Presentation voiceovers

---

## Privacy & Security

- **100% Local**: No data sent to external servers
- **No Telemetry**: No usage tracking or analytics
- **Your Audio**: Reference audio and outputs stay on your device
- **Open Source**: Full code transparency

---

## Credits

- **[Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS)** by Alibaba Cloud
- Built with Swift, Python, and React
- Licensed under Apache 2.0

---

## License

Apache License 2.0 - See [LICENSE](LICENSE) for details.
