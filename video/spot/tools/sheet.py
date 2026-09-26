#!/usr/bin/env python3
"""Contact sheet: tile images into a labelled grid.
usage: sheet.py OUT.png COLS WIDTH img1[:label] img2[:label] ...
"""
import sys
from PIL import Image, ImageDraw, ImageFont

out, cols, tw = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
items = []
for a in sys.argv[4:]:
    path, _, label = a.partition('::')
    items.append((path, label))
ims = [Image.open(p).convert('RGB') for p, _ in items]
w0, h0 = ims[0].size
th = round(tw * h0 / w0)
rows = (len(ims) + cols - 1) // cols
gap = 6
sheet = Image.new('RGB', (cols * tw + (cols + 1) * gap, rows * th + (rows + 1) * gap), (40, 40, 44))
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', max(14, tw // 22))
except Exception:
    font = ImageFont.load_default()
d = ImageDraw.Draw(sheet)
for k, (im, (_, label)) in enumerate(zip(ims, items)):
    x = gap + (k % cols) * (tw + gap)
    y = gap + (k // cols) * (th + gap)
    sheet.paste(im.resize((tw, th), Image.LANCZOS), (x, y))
    if label:
        bb = d.textbbox((0, 0), label, font=font)
        d.rectangle([x + 6, y + 6, x + 14 + bb[2] - bb[0], y + 12 + bb[3] - bb[1]], fill=(0, 0, 0))
        d.text((x + 10, y + 7), label, fill=(255, 255, 255), font=font)
sheet.save(out)
print('sheet ->', out)
