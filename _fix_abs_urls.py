import os

base = r'c:\Users\Vrkar\Downloads\Telegram Desktop\k'

html_files = [
    'index-1.htm',
    'about/index.htm',
    'contact/index.htm',
    'services/index.htm',
    'support/index.htm',
    'solar-panel-installation-in-varanasi/index-1.htm',
    'feed/index-1.htm',
    'wp-json/index-1.htm',
    'comments/feed/index-1.htm',
    'wp-json/wp/v2/pages/3513',
    'wp-json/wp/v2/pages/4222',
    'wp-json/wp/v2/pages/6739-1',
]

WRONG = 'https://kusaaasolar.com/../wp-content/uploads/2026/01/cropped-Kusaaa-solar-logo.png'
RIGHT = 'https://kusaaasolar.com/wp-content/uploads/2026/01/cropped-Kusaaa-solar-logo.png'

for rel in html_files:
    fp = os.path.join(base, rel)
    if not os.path.exists(fp):
        print('SKIP (not found): ' + rel)
        continue
    with open(fp, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    original = content
    content = content.replace(WRONG, RIGHT)
    if content != original:
        with open(fp, 'w', encoding='utf-8-sig') as f:
            f.write(content)
        print('FIXED: ' + rel)
    else:
        print('OK: ' + rel)
print('Done.')
