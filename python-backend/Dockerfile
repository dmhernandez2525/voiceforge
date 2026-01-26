# VoiceForge - Qwen3-TTS Server
# Voice cloning and TTS generation
#
# Build: docker build -t voiceforge-backend .
# Run:   docker run -p 8765:8765 voiceforge-backend
#
# Note: Requires significant memory for model loading (~8GB)
# GPU acceleration recommended

FROM python:3.11-slim

LABEL maintainer="Daniel Hernandez"
LABEL description="VoiceForge Qwen3-TTS Server"

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libsndfile1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first for layer caching
COPY requirements.txt .

# Install PyTorch (CPU version for compatibility)
# For GPU: pip install torch --index-url https://download.pytorch.org/whl/cu121
RUN pip install --no-cache-dir torch

# Install other dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy server code
COPY server.py .

# Create non-root user and output directory
RUN useradd -m voiceforge && \
    mkdir -p /app/output && \
    chown -R voiceforge:voiceforge /app

USER voiceforge

# Create directory for TTS output
RUN mkdir -p /home/voiceforge/output

# Expose server port
EXPOSE 8765

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV DEVICE=cpu
ENV OUTPUT_DIR=/app/output

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8765/health || exit 1

# Start the server
CMD ["python", "server.py"]
