import os
import re

base = r'c:\Users\Vrkar\Downloads\Telegram Desktop\k'

html_files_info = [
    ('index-1.htm', False),
    ('feed/index-1.htm', False),
    ('wp-json/index-1.htm', False),
    ('about/index.htm', True),
    ('contact/index.htm', True),
    ('services/index.htm', True),
    ('support/index.htm', True),
    ('solar-panel-installation-in-varanasi/index-1.htm', True),
    ('comments/feed/index-1.htm', False),
    ('wp-json/wp/v2/pages/3513', False),
    ('wp-json/wp/v2/pages/4222', False),
    ('wp-json/wp/v2/pages/6739-1', False),
]

LOGO_FILENAME = 'cropped-Kusaaa-solar-logo.png'
OLD_LOGO_FILENAME = 'Green-and-White-Modern-Solar-Energy-Instagram-Post-final.png'

LOGO_PATH_REL = 'wp-content/uploads/2026/01/' + LOGO_FILENAME
LOGO_PATH_REL_PARENT = '../wp-content/uploads/2026/01/' + LOGO_FILENAME
LOGO_PATH_ABS = 'https://kusaaasolar.com/wp-content/uploads/2026/01/' + LOGO_FILENAME

OLD_LOGO_PATH_REL = 'wp-content/uploads/2026/01/' + OLD_LOGO_FILENAME
OLD_LOGO_PATH_REL_PARENT = '../wp-content/uploads/2026/01/' + OLD_LOGO_FILENAME
OLD_LOGO_PATH_ABS = 'https://kusaaasolar.com/wp-content/uploads/2026/01/' + OLD_LOGO_FILENAME

def is_logo_context(tag):
    tag_lower = tag.lower()
    return ('rel="icon"' in tag_lower or
            'rel="apple-touch-icon"' in tag_lower or
            'msapplication-tileimage' in tag_lower or
            'xpro-site-logo' in tag_lower or
            'wp-image-5701' in tag_lower or
            '<link ' in tag_lower or
            '<meta ' in tag_lower or
            '<url>' in tag_lower or
            'wp_popup_profile' in tag_lower)

def replace_in_content(content, is_subdir):
    patterns_old_new = [
        (OLD_LOGO_PATH_REL_PARENT, LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL),
        (OLD_LOGO_PATH_REL, LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL),
        (OLD_LOGO_PATH_ABS, LOGO_PATH_ABS),
    ]

    def img_repl(m):
        tag = m.group(0)
        if OLD_LOGO_FILENAME not in tag:
            return tag
        if is_logo_context(tag):
            new_tag = tag
            for old, new in patterns_old_new:
                new_tag = new_tag.replace(old, new)
            srcset_match = re.search(r'\bsrcset="([^"]*)"', new_tag)
            if srcset_match:
                correct_srcset = LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL
                new_tag = new_tag[:srcset_match.start(1)] + correct_srcset + new_tag[srcset_match.end(1):]
            return new_tag
        return tag

    content = re.sub(r'<(link|meta)\b[^>]*>', lambda m: m.group(0).replace(OLD_LOGO_PATH_REL_PARENT, LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL).replace(OLD_LOGO_PATH_REL, LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL).replace(OLD_LOGO_PATH_ABS, LOGO_PATH_ABS), content, flags=re.IGNORECASE)

    content = re.sub(r'<img\b[^>]*>', img_repl, content, flags=re.IGNORECASE | re.DOTALL)

    content = content.replace('>' + OLD_LOGO_PATH_ABS + '<', '>' + LOGO_PATH_ABS + '<')
    content = content.replace('>' + OLD_LOGO_PATH_REL + '<', '>' + (LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL) + '<')
    content = content.replace('>' + OLD_LOGO_PATH_REL_PARENT + '<', '>' + (LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL) + '<')

    content = content.replace('"' + OLD_LOGO_PATH_ABS + '"', '"' + LOGO_PATH_ABS + '"')
    content = content.replace('"' + OLD_LOGO_PATH_REL + '"', '"' + (LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL) + '"')
    content = content.replace('"' + OLD_LOGO_PATH_REL_PARENT + '"', '"' + (LOGO_PATH_REL_PARENT if is_subdir else LOGO_PATH_REL) + '"')

    return content

for rel, is_subdir in html_files_info:
    fp = os.path.join(base, rel)
    if not os.path.exists(fp):
        print('SKIP (not found): ' + rel)
        continue
    with open(fp, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    original = content
    content = replace_in_content(content, is_subdir)
    if content != original:
        with open(fp, 'w', encoding='utf-8-sig') as f:
            f.write(content)
        print('UPDATED: ' + rel)
    else:
        print('NOCHANGE: ' + rel)

print('Done.')
