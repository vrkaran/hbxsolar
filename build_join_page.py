from pathlib import Path
import re, shutil
from html import escape

root=Path(__file__).parent
out=root/'join-hbx-solar';out.mkdir(exist_ok=True)
source=(root/'index.html').read_text(encoding='utf-8-sig')
header=re.search(r'<header class="hbx-header".*?</header>',source,re.S).group()
header=re.sub(r' (href|src)="(?!https?:|tel:|/|#)([^"]+)"',r' \1="/\2"',header)
header=header.replace(' aria-current="page"','').replace('</div>\n<a class="hbx-header__call"','<a href="/join-hbx-solar/" aria-current="page">Join HBX Solar</a></div>\n<a class="hbx-header__call"')
shutil.copyfile(root/'wp-content/uploads/2026/01/cropped-Kusaaa-solar-logo.png',out/'hbx-solar-logo.png')
header=header.replace('/wp-content/uploads/2026/01/cropped-Kusaaa-solar-logo.png','/join-hbx-solar/hbx-solar-logo.png')
footer=re.search(r'<footer\b.*?</footer>',source,re.S).group()
footer=re.sub(r' (href|src)="(?!https?:|tel:|/|#)([^"]+)"',r' \1="/\2"',footer)
footer=re.sub(r'https?://(?:www\.)?kusaaasolar.com', '',footer,flags=re.I)
footer=re.sub('kusaaa', 'hbx',footer,flags=re.I)
footer=footer.replace('/../','/').replace('/&quot;','').replace('&quot;"','"')
footer=footer.replace('animate-in','').replace('pix-opacity-0','')

def items(xs):return '<ul>'+''.join('<li>'+escape(x)+'</li>' for x in xs)+'</ul>'
def cards(xs):return '<div class="cards">'+''.join(f'<article class="card"><span class="number">{i:02}</span><h3>{a}</h3><p>{b}</p></article>' for i,(a,b) in enumerate(xs,1))+'</div>'
def section(id,kicker,title,body,cls=''):
 return f'<section id="{id}" class="section {cls}"><div class="wrap"><div class="section-head"><span class="eyebrow">{kicker}</span><h2>{title}</h2></div>{body}</div></section>'

from join_content import build
parts=build()
styles=['/wp-content/plugins/elementor/assets/css/frontend.min-1.css','/wp-content/uploads/elementor/css/post-6988-1.css']
html='''<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Join HBX Solar | Careers &amp; Work From Home Solar Opportunities</title><meta name="description" content="Explore career opportunities with HBX Solar. Join our solar sales and business development program with structured training, work-from-home flexibility and performance-based career growth."><link rel="icon" href="/join-hbx-solar/hbx-solar-logo.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;family=Poppins:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">'''+''.join(f'<link rel="stylesheet" href="{s}">' for s in styles)+'''<link rel="stylesheet" href="/join-hbx-solar/careers.css"><link rel="stylesheet" href="/join-hbx-solar/opportunity.css"><script src="/join-hbx-solar/config.js" defer></script><script src="/join-hbx-solar/careers.js" defer></script></head><body class="hbx-careers"><a class="skip-link" href="#main">Skip to content</a>'''+header+'<noscript><style>#career-form button[type=submit]{display:none}</style><p class=wrap>JavaScript is required to prepare your application email. Email careers@hbxsolar.in or call +91 86086 92978 for assistance.</p></noscript>'+''.join(parts)+footer+'</body></html>'
(out/'index.html').write_text(html,encoding='utf-8')
print('Created join-hbx-solar/index.html')
