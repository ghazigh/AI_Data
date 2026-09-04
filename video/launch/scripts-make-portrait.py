"""Derives ../launch-portrait/index.html (1080x1920) from index.html: same scenes,
same script, same world, stacked geometry. Re-run after editing index.html."""
import re
s = open('index.html').read()
s = s.replace('data-resolution="landscape"', 'data-resolution="portrait"')
s = s.replace('width=1920, height=1080', 'width=1080, height=1920')
s = s.replace('html, body { width: 1920px; height: 1080px; }', 'html, body { width: 1080px; height: 1920px; }')
s = s.replace('#root { width: 1920px; height: 1080px; }', '#root { width: 1080px; height: 1920px; }')
s = s.replace('data-width="1920" data-height="1080"', 'data-width="1080" data-height="1920"')
s = s.replace('<body>', '<body class="portrait">')
s = s.replace('<title>Datalith — launch</title>', '<title>Datalith — launch (portrait)</title>')

# Portrait grid: copy in the top band (120..~800), the world hub in the middle band,
# UI panels in the bottom band (1180..1760). HUD labels hug the corners.
STYLE = {
  'hud-phase': 'left:56px; top:44px',
  'hud-track': 'left:56px; right:56px; bottom:84px',
  's0-read': 'left:56px; top:100px; font-size:18px',
  's1-eyebrow': 'position:absolute; left:80px; top:130px',
  's1-rule': 'left:80px; top:184px; width:920px',
  's1-stat': 'left:72px; top:330px',
  's1-src': 'left:80px; top:1740px',
  's3-eyebrow': 'position:absolute; left:80px; top:130px',
  's3-h': 'position:absolute; left:80px; top:186px; max-width:920px',
  's3-lead': 'position:absolute; left:80px; top:480px; max-width:900px',
  's3-grid': 'position:absolute; left:80px; top:650px; width:920px; height:210px; display:flex; flex-wrap:wrap; align-content:flex-start; gap:10px',
  's3-c1': 'left:80px; top:1640px',
  's4-eyebrow': 'position:absolute; left:80px; top:130px',
  's4-h': 'position:absolute; left:80px; top:186px; max-width:920px',
  's4-ring': 'left:80px; top:500px; width:360px; height:360px',
  's4-bars': 'left:500px; top:470px; width:500px',
  's4-note': 'left:80px; top:1740px; font-size:17px',
  's5-eyebrow': 'position:absolute; left:80px; top:130px',
  's5-h': 'position:absolute; left:80px; top:186px; max-width:920px',
  's5-flags': 'left:80px; top:1420px; width:920px',
  's5-frame': 'left:60px; top:800px; width:960px; height:540px; transform-origin:50% 50%',
  's5-c1': 'left:40px; top:1300px',
  's6-eyebrow': 'position:absolute; left:80px; top:130px',
  's6-h': 'position:absolute; left:80px; top:186px; max-width:920px',
  's6-n1': 'left:80px; top:1250px', 's6-n2': 'left:80px; top:1440px', 's6-n3': 'left:80px; top:1630px',
  's6-domains': 'right:80px; top:1250px',
  's7-eyebrow': 'position:absolute; left:80px; top:130px',
  's7-h': 'position:absolute; left:80px; top:186px; max-width:920px',
  's7-lead': 'position:absolute; left:80px; top:480px; max-width:900px',
  's7-frame': 'left:60px; top:1060px; width:960px; height:540px; transform-origin:50% 50%',
  's7-c1': 'left:40px; top:1560px',
  's8-eyebrow': 'position:absolute; left:80px; top:130px',
  's8-h': 'position:absolute; left:80px; top:186px; max-width:920px',
  's8-hero': 'left:80px; top:470px',
  's8-legend': 'left:80px; top:760px; width:920px',
  's8-panel': 'left:60px; top:1040px; width:960px; height:660px; transform-origin:50% 50%',
  's9-eyebrow': 'position:absolute; left:80px; top:130px',
  's9-h': 'position:absolute; left:80px; top:186px; max-width:920px',
  's9-tiles': 'left:80px; top:480px; width:920px',
  's9-note': 'left:80px; top:700px; font-size:17px',
  's9-panel': 'left:60px; top:1160px; width:960px; height:560px; transform-origin:50% 50%',
  's9-log': 'left:24px; top:70px; width:912px',
  's10-l1': 'position:absolute; left:0; right:0; top:0; font-size:46px',
  's10-l2': 'position:absolute; left:0; right:0; top:150px; font-size:46px; color:#7A8FFF',
  's10-cta': 'width:920px',
}
for id_, style in STYLE.items():
    pat = re.compile(r'(<[a-z0-9]+ [^>]*?id="%s"[^>]*?style=")[^"]*(")' % re.escape(id_))
    s, n = pat.subn(lambda m: m.group(1) + style + m.group(2), s)
    assert n == 1, (id_, n)

# scene-specific inner blocks
s = s.replace('<div style="position:relative; text-align:center; width:1500px; height:240px">', '<div style="position:relative; text-align:center; width:920px; height:420px">')
s = s.replace('<div class="center" style="top:300px">', '<div class="center" style="top:560px">')
s = s.replace('<div class="center" style="top:690px">', '<div class="center" style="top:1180px">')
s = s.replace('<svg width="420" height="300" viewBox="0 0 28 20"', '<svg width="300" height="214" viewBox="0 0 28 20"')
s = s.replace('<svg id="s8-svg" width="880" height="560" viewBox="0 0 880 560" data-w="880" data-h="560"', '<svg id="s8-svg" width="900" height="600" viewBox="0 0 900 600" data-w="900" data-h="600"')
s = s.replace('<div class="center" style="top:600px"><div id="s10-word" class="wordmark" style="font-size:120px">', '<div class="center" style="top:820px"><div id="s10-word" class="wordmark" style="font-size:104px">')
s = s.replace('<div style="position:absolute; left:0; right:0; top:770px; height:200px; text-align:center">', '<div style="position:absolute; left:0; right:0; top:1010px; height:300px; text-align:center">')
s = s.replace('<div class="center" style="top:770px">', '<div class="center" style="top:1010px">')
s = s.replace('<div class="center" style="top:935px">', '<div class="center" style="top:1290px">')
s = s.replace('<p class="hud-l" style="right:64px; top:44px">', '<p class="hud-l" style="right:56px; top:44px">')
s = s.replace('<p class="hud-l" style="left:64px; bottom:44px">', '<p class="hud-l" style="left:56px; bottom:44px">')
s = s.replace('<p class="hud-l" style="right:64px; bottom:44px">', '<p class="hud-l" style="right:56px; bottom:44px">')
s = s.replace('.pad { position: absolute; inset: 0; padding: 96px 120px; }', '')
open('../launch-portrait/index.html', 'w').write(s)
print('../launch-portrait/index.html written')
