#!/bin/zsh
# Build Qwen TTS menubar app

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="Qwen TTS"
APP_PATH="$HOME/Desktop/${APP_NAME}.app"
BUILD_DIR="$SCRIPT_DIR/build"
SOURCES_DIR="$SCRIPT_DIR/Sources"

echo "Building Qwen TTS..."

# Clean previous build
rm -rf "$BUILD_DIR"
rm -rf "$APP_PATH"
mkdir -p "$BUILD_DIR"

# Collect all Swift source files
SWIFT_FILES=(
    "$SOURCES_DIR/Utils.swift"
    "$SOURCES_DIR/ServerManager.swift"
    "$SOURCES_DIR/TTSManager.swift"
    "$SOURCES_DIR/Windows/MainWindow.swift"
    "$SOURCES_DIR/AppDelegate.swift"
    "$SOURCES_DIR/main.swift"
)

echo "Compiling ${#SWIFT_FILES[@]} source files..."

# Compile Swift
swiftc -o "$BUILD_DIR/QwenTTS" \
    -O \
    -target arm64-apple-macosx12.0 \
    -sdk $(xcrun --show-sdk-path) \
    -framework Cocoa \
    -framework AVFoundation \
    "${SWIFT_FILES[@]}"

echo "Creating app bundle..."

# Create app bundle structure
mkdir -p "$APP_PATH/Contents/MacOS"
mkdir -p "$APP_PATH/Contents/Resources"
mkdir -p "$APP_PATH/Contents/Resources/python-backend"

# Copy executable
cp "$BUILD_DIR/QwenTTS" "$APP_PATH/Contents/MacOS/"

# Copy Python backend
cp -r "$SCRIPT_DIR/../python-backend/"* "$APP_PATH/Contents/Resources/python-backend/"

# Create Info.plist
cat > "$APP_PATH/Contents/Info.plist" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>QwenTTS</string>
    <key>CFBundleIdentifier</key>
    <string>com.qwen-tts.app</string>
    <key>CFBundleName</key>
    <string>Qwen TTS</string>
    <key>CFBundleDisplayName</key>
    <string>Qwen TTS</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>LSMinimumSystemVersion</key>
    <string>12.0</string>
    <key>LSUIElement</key>
    <true/>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>LSApplicationCategoryType</key>
    <string>public.app-category.utilities</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Qwen TTS may use the microphone for recording voice samples.</string>
</dict>
</plist>
EOF

# Touch the app to refresh icon cache
touch "$APP_PATH"

echo ""
echo "Build successful!"
echo "   App created at: $APP_PATH"
echo ""
echo "To run: Open '$APP_NAME' from your Desktop"
echo ""
echo "NOTE: Make sure the Python backend is set up first:"
echo "  cd $SCRIPT_DIR/../python-backend"
echo "  pip install -r requirements.txt"
