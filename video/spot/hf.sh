#!/usr/bin/env bash
# Runs the pinned HyperFrames CLI. Needs FFmpeg on PATH (or FFMPEG_DIR pointing at a folder holding
# ffmpeg + ffprobe) and a Chromium; HYPERFRAMES_BROWSER_PATH defaults to Playwright's headless shell.
# Usage: ./hf.sh check | ./hf.sh render --quality high --workers 1 --output renders/spot-16x9.mp4
set -e
[ -n "$FFMPEG_DIR" ] && export PATH="$FFMPEG_DIR:$PATH"
if [ -z "$HYPERFRAMES_BROWSER_PATH" ]; then
  for b in /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell; do [ -x "$b" ] && export HYPERFRAMES_BROWSER_PATH="$b"; done
fi
export HYPERFRAMES_NO_TELEMETRY=1
exec npx --yes hyperframes@0.8.78 "$@"
