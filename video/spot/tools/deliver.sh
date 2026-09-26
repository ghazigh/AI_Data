#!/usr/bin/env bash
# Turns the HyperFrames master into the deliverables:
#   ../masters/datalith-spot-16x9.mp4        web encode (H.264 High + AAC, faststart, < 25 MB)
#   ../masters/datalith-spot-poster.jpg      poster frame
#   ../masters/datalith-spot-shotgrid.jpg    one frame per scene and transition
# usage: tools/deliver.sh [renders/spot-16x9.mp4] [tag]      (tag defaults to 16x9)
set -euo pipefail
cd "$(dirname "$0")/.."
SRC="${1:-renders/spot-16x9.mp4}"
TAG="${2:-16x9}"
FF="${FFMPEG:-ffmpeg}"
OUT=../masters
mkdir -p "$OUT" renders/grid
WEB="$OUT/datalith-spot-$TAG.mp4"

# 1 · web encode: CRF with a bitrate ceiling so 20 s stays under ~25 MB. The picture comes from the
#     render; the sound comes straight from the mastered WAV, so the delivered loudness is exactly -14 LUFS.
"$FF" -hide_banner -loglevel error -y -i "$SRC" -i assets/audio/spot-mix.wav -map 0:v:0 -map 1:a:0 \
  -c:v libx264 -preset slow -crf 19 -maxrate 9M -bufsize 18M -profile:v high -level 4.1 -pix_fmt yuv420p \
  -tune film -x264-params "aq-mode=3:deblock=-1,-1" \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$WEB"
ls -la "$WEB"

# 2 · poster: the fibre logo, the frame the whole film builds to
POSTER_T="${POSTER_T:-13.35}"
[ "$TAG" = "16x9" ] || POSTER_T="${POSTER_T_V:-13.35}"
"$FF" -hide_banner -loglevel error -y -ss "$POSTER_T" -i "$SRC" -frames:v 1 -q:v 2 "$OUT/datalith-spot-$TAG-poster.jpg"

# 3 · shot grid: every scene and every transition, straight from the rendered file
TIMES="0.35 1.10 1.95 2.70 3.55 4.45 5.05 5.75 6.05 6.30 7.20 7.85 8.15 9.20 10.20 11.30 12.45 13.35 13.85 14.25 15.20 16.60 18.20 19.90"
ARGS=()
for t in $TIMES; do
  f="renders/grid/g-$t.png"
  "$FF" -hide_banner -loglevel error -y -ss "$t" -i "$SRC" -frames:v 1 "$f"
  ARGS+=("$f::${t}s")
done
python3 tools/sheet.py renders/grid/shotgrid.png 4 480 "${ARGS[@]}"
"$FF" -hide_banner -loglevel error -y -i renders/grid/shotgrid.png -q:v 2 "$OUT/datalith-spot-$TAG-shotgrid.jpg"

# 4 · report
python3 audio/analyze.py "$WEB" > "renders/grid/audio-$TAG.txt"; head -3 "renders/grid/audio-$TAG.txt"
ls -la "$OUT"/datalith-spot-"$TAG"*
