#!/usr/bin/env bash
# Runs the pinned HyperFrames CLI with this machine's static FFmpeg/FFprobe and the
# preinstalled headless Chromium, since neither can be downloaded through the proxy.
# Usage: ./hf.sh check | ./hf.sh render --quality high --output renders/launch-16x9.mp4
S=/tmp/claude-0/-home-user-AI-Data/bdb20754-979e-5738-8a11-c25394d5a374/scratchpad/hf-check
export PATH="$S/bin:$PATH"
export HYPERFRAMES_BROWSER_PATH="${HYPERFRAMES_BROWSER_PATH:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}"
exec npx --yes hyperframes@0.8.27 "$@"
