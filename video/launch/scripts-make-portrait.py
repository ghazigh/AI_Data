"""Derives portrait.html (1080x1920) from index.html: same scenes, same script,
stacked geometry. Re-run after editing index.html."""
import re
s = open('index.html').read()
s = s.replace('data-resolution="landscape"', 'data-resolution="portrait"')
s = s.replace('width=1920, height=1080', 'width=1080, height=1920')
s = s.replace('html, body { width: 1920px; height: 1080px; }', 'html, body { width: 1080px; height: 1920px; }')
s = s.replace('#root { width: 1920px; height: 1080px; }', '#root { width: 1080px; height: 1920px; }')
s = s.replace('data-width="1920" data-height="1080"', 'data-width="1080" data-height="1920"')
s = s.replace('<body>', '<body class="portrait">')
s = s.replace('<title>Datalith — launch</title>', '<title>Datalith — launch (portrait)</title>')

STYLE = {
  's0-read': 'left:80px; top:80px; font-size:20px',
  's1-ghost': 'left:-40px; top:980px',
  's1-eyebrow': 'position:absolute; left:80px; top:120px',
  's1-rule': 'left:80px; top:172px; width:920px',
  's1-stat1': 'left:72px; top:420px',
  's1-stat2': 'left:72px; top:420px',
  's1-src': 'left:80px; top:1720px',
  's2-logo': 'left:50%; top:50%; transform:translate(-50%,-50%); margin-top:-180px',
  's2-tag': 'left:50%; top:50%; transform:translate(-50%,0); margin-top:170px',
  's3-eyebrow': 'position:absolute; left:80px; top:120px',
  's3-h': 'position:absolute; left:80px; top:176px; max-width:920px',
  's3-lead': 'position:absolute; left:80px; top:470px; max-width:900px',
  's3-plate': 'left:60px; top:760px; width:960px; height:540px; transform-origin:50% 50%',
  's3-c1': 'left:40px; top:840px', 's3-c2': 'left:40px; top:1000px', 's3-c3': 'left:40px; top:1160px',
  's4-eyebrow': 'position:absolute; left:80px; top:120px',
  's4-h': 'position:absolute; left:80px; top:176px; max-width:920px',
  's4-lead': 'position:absolute; left:80px; top:470px; max-width:900px',
  's4-grid': 'position:absolute; left:80px; top:640px; width:920px; height:210px; display:flex; flex-wrap:wrap; align-content:flex-start; gap:10px',
  's4-mods': 'left:80px; top:880px; display:flex; gap:16px; font-size:16px',
  's4-frame': 'left:60px; top:1000px; width:960px; height:540px; transform-origin:50% 50%',
  's4-c1': 'left:40px; top:1480px',
  's5-eyebrow': 'position:absolute; left:80px; top:120px',
  's5-h': 'position:absolute; left:80px; top:176px; max-width:920px',
  's5-ring': 'left:80px; top:500px; width:360px; height:360px',
  's5-bars': 'left:500px; top:470px; width:500px',
  's5-flags-k': 'position:absolute; left:80px; top:960px',
  's5-flags': 'left:80px; top:1000px; width:920px',
  's6-eyebrow': 'position:absolute; left:80px; top:120px',
  's6-h': 'position:absolute; left:80px; top:176px; max-width:920px',
  's6-bullets': 'left:80px; top:480px; width:920px',
  's6-frame': 'left:60px; top:900px; width:960px; height:540px; transform-origin:50% 50%',
  's6-c1': 'left:40px; top:1390px',
  's7-frame': 'left:60px; top:230px; width:960px; height:540px; transform-origin:50% 50%',
  's7-eyebrow': 'position:absolute; left:80px; top:120px',
  's7-h': 'position:absolute; left:80px; top:840px; max-width:920px',
  's7-n1': 'left:80px; top:1140px', 's7-n2': 'left:80px; top:1360px', 's7-n3': 'left:80px; top:1580px',
  's8-eyebrow': 'position:absolute; left:80px; top:120px',
  's8-h': 'position:absolute; left:80px; top:176px; max-width:920px',
  's8-lead': 'position:absolute; left:80px; top:470px; max-width:900px',
  's8-frame': 'left:60px; top:760px; width:960px; height:540px; transform-origin:50% 50%',
  's8-c1': 'left:40px; top:1250px',
  's9-eyebrow': 'position:absolute; left:80px; top:120px',
  's9-h': 'position:absolute; left:80px; top:176px; max-width:920px',
  's9-map': 'left:80px; top:470px',
  's9-legend': 'left:80px; top:1060px; width:920px',
  's9-hero': 'left:80px; top:1250px',
  's9-blocked': 'position:absolute; left:80px; top:1470px; max-width:900px; font-size:24px',
  's10-eyebrow': 'position:absolute; left:80px; top:120px',
  's10-h': 'position:absolute; left:80px; top:176px; max-width:920px',
  's10-log': 'left:80px; top:520px; width:920px',
  's10-tiles': 'left:80px; top:1000px; width:920px',
  's10-note': 'left:80px; top:1290px; font-size:17px',
  's11-l1': 'position:absolute; left:0; right:0; top:20px; font-size:60px',
  's11-l2': 'position:absolute; left:0; right:0; top:230px; font-size:60px; color:#7A8FFF',
  's11-logo': 'left:50%; top:50%; transform:translate(-50%,-50%); margin-top:-300px',
  's11-cta': 'left:50%; top:50%; transform:translate(-50%,-50%); margin-top:90px; width:920px',
  's11-site': 'left:50%; top:50%; transform:translate(-50%,0); margin-top:300px',
}
for id_, style in STYLE.items():
    pat = re.compile(r'(<[a-z0-9]+ [^>]*?id="%s"[^>]*?style=")[^"]*(")' % re.escape(id_))
    s, n = pat.subn(lambda m: m.group(1) + style + m.group(2), s)
    assert n == 1, (id_, n)
# scene-specific inner blocks
s = s.replace('<div style="position:relative; text-align:center; width:1400px; height:240px">', '<div style="position:relative; text-align:center; width:920px; height:420px">')
s = s.replace('<div style="position:relative; width:1680px; height:420px; text-align:center">', '<div style="position:relative; width:920px; height:520px; text-align:center">')
s = s.replace('<svg id="s9-svg" width="1120" height="600" viewBox="0 0 1120 600" data-w="1120" data-h="600"', '<svg id="s9-svg" width="920" height="520" viewBox="0 0 920 520" data-w="920" data-h="520"')
s = s.replace('<svg width="420" height="300" viewBox="0 0 28 20"', '<svg width="300" height="214" viewBox="0 0 28 20"')
s = s.replace('<div id="s2-word" class="wordmark">', '<div id="s2-word" class="wordmark" style="font-size:130px">')
s = s.replace('<div class="wordmark" style="font-size:120px"><span>datalith</span></div>', '<div class="wordmark" style="font-size:96px"><span>datalith</span></div>')
s = s.replace('<svg width="196" height="140" viewBox="0 0 28 20"', '<svg width="150" height="107" viewBox="0 0 28 20"')
s = s.replace('.pad { position: absolute; inset: 0; padding: 96px 120px; }', '')
open('../launch-portrait/index.html', 'w').write(s)
print('../launch-portrait/index.html written')
