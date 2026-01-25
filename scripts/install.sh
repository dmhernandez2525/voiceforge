#!/bin/bash
# Install Qwen3-TTS dependencies and set up environment

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "========================================"
echo "  Qwen3-TTS Installation Script"
echo "========================================"
echo ""

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not found."
    echo "Install with: brew install python@3.12"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
echo "Found Python: $PYTHON_VERSION"

# Check for pip
if ! command -v pip3 &> /dev/null; then
    echo "Error: pip3 is required but not found."
    exit 1
fi

# Check if conda is available (recommended)
USE_CONDA=false
if command -v conda &> /dev/null; then
    echo "Found conda. Using conda environment (recommended)."
    USE_CONDA=true
fi

echo ""
echo "Setting up Python environment..."

if [ "$USE_CONDA" = true ]; then
    # Create conda environment
    if ! conda env list | grep -q "qwen3-tts"; then
        echo "Creating conda environment: qwen3-tts"
        conda create -n qwen3-tts python=3.12 -y
    else
        echo "Conda environment qwen3-tts already exists"
    fi

    echo ""
    echo "Activating environment and installing packages..."
    eval "$(conda shell.bash hook)"
    conda activate qwen3-tts

    pip install -U qwen-tts torch soundfile numpy
else
    echo "Installing packages globally (consider using conda for isolation)..."
    pip3 install -U qwen-tts torch soundfile numpy
fi

echo ""
echo "========================================"
echo "  Installation Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Build the Swift app:"
echo "   cd $PROJECT_DIR/QwenTTS"
echo "   chmod +x build.sh"
echo "   ./build.sh"
echo ""
echo "2. Start the Python server (first time will download models):"
if [ "$USE_CONDA" = true ]; then
    echo "   conda activate qwen3-tts"
fi
echo "   python3 $PROJECT_DIR/python-backend/server.py"
echo ""
echo "3. Run the app from your Desktop: 'Qwen TTS.app'"
echo ""
echo "Models will be downloaded automatically on first use."
echo "Model sizes:"
echo "  - Voice Clone (1.7B):  ~3-4 GB"
echo "  - Custom Voice (1.7B): ~3-4 GB"
echo "  - Voice Design (1.7B): ~3-4 GB"
echo ""
echo "For Mac with Apple Silicon:"
echo "  - Models run on MPS (Metal) for GPU acceleration"
echo "  - First generation may be slow due to model loading"
echo ""
