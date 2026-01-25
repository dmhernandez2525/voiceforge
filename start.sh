#!/bin/bash
# Start Qwen TTS - launches server and app

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VENV_DIR="$SCRIPT_DIR/venv"
APP_PATH="$HOME/Desktop/Qwen TTS.app"

echo "Starting Qwen TTS..."

# Check if venv exists
if [ ! -d "$VENV_DIR" ]; then
    echo "Error: Virtual environment not found at $VENV_DIR"
    echo "Run ./scripts/install.sh first"
    exit 1
fi

# Check if server is already running
if curl -s http://127.0.0.1:8765/health > /dev/null 2>&1; then
    echo "Server is already running"
else
    echo "Starting Python server..."
    source "$VENV_DIR/bin/activate"
    python "$SCRIPT_DIR/python-backend/server.py" &

    # Wait for server to start
    for i in {1..10}; do
        if curl -s http://127.0.0.1:8765/health > /dev/null 2>&1; then
            echo "Server started successfully"
            break
        fi
        sleep 1
    done
fi

# Launch the app
if [ -d "$APP_PATH" ]; then
    echo "Launching Qwen TTS app..."
    open "$APP_PATH"
else
    echo "App not found at $APP_PATH"
    echo "Build with: cd QwenTTS && ./build.sh"
fi

echo ""
echo "Qwen TTS is running!"
echo "Server: http://127.0.0.1:8765"
echo "Output: ~/Desktop/Qwen-TTS-Output/"
echo ""
echo "To stop: pkill -f 'python.*server.py'"
