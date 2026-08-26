import os

base = r'c:\Users\Vrkar\Downloads\Telegram Desktop\k'
files = [
    'index-1.htm',
    'about/index.htm',
    'contact/index.htm',
    'services/index.htm',
    'support/index.htm',
    'solar-panel-installation-in-varanasi/index-1.htm',
]

new_addr = '41, Shahpur, Sarain, Azamgarh'
old_addr_full = ', SH 2/8, Meerapur Basahi, Taktakpur, Ekta Nagar Colony, Varanasi, Uttar Pradesh 221002'
old_map_url = 'A%2C%20SH%202%2F8%2C%20Meerapur%20Basahi%2C%20Taktakpur%2C%20Ekta%20Nagar%20Colony%2C%20Varanasi%2C%20Uttar%20Pradesh%20221002'
new_map_url = '41%2C%20Shahpur%2C%20Sarain%2C%20Azamgarh'
old_map_title = 'A, SH 2/8, Meerapur Basahi, Taktakpur, Ekta Nagar Colony, Varanasi, Uttar Pradesh 221002'

old_phone_display = '+91 82992 64603'
new_phone_display = '+91 86086 92218 , +91 86086 92978'
old_phone_tel = 'tel:-%20+91-82992%2064603'
new_phone_tel = 'tel:+91-86086-92218'
old_phone_tel_attr = '&quot;tel:-%20+91-82992%2064603&quot;'
new_phone_tel_attr = '&quot;tel:+91-86086-92218&quot;'

for rel in files:
    fp = os.path.join(base, rel)
    with open(fp, 'r', encoding='utf-8-sig') as f:
        content = f.read()

    original = content

    # --- Company name replacements (careful: these are space-separated, hyphenated file names are preserved) ---
    replacements = [
        ('Kusaaa Solar Solutions,', 'HBX Solar'),
        ('Kusaaa Solar Solutions', 'HBX Solar'),
        ('Kusaaa Solar Solution,', 'HBX Solar'),
        ('Kusaaa Solar Solution', 'HBX Solar'),
        ('Kusaaa Solar ', 'HBX Solar '),
        ('Kusaaa Solar.', 'HBX Solar.'),
        ('Kusaaa Solar?', 'HBX Solar?'),
        ('Kusaaa Solar!', 'HBX Solar!'),
        ('kusaaa Solar ', 'HBX Solar '),
        ('kusaaa Solar Solutions', 'HBX Solar'),
        ('kusaaa Solar Solution', 'HBX Solar'),
        ('kusaaa solar', 'HBX Solar'),
    ]
    for old, new in replacements:
        content = content.replace(old, new)

    # --- Address replacements ---
    content = content.replace(old_addr_full, new_addr)
    content = content.replace(old_map_url, new_map_url)
    content = content.replace(old_map_title, new_addr)

    # --- Phone replacements ---
    content = content.replace(old_phone_display, new_phone_display)
    content = content.replace(old_phone_tel_attr, new_phone_tel_attr)
    content = content.replace(old_phone_tel, new_phone_tel)

    if content != original:
        with open(fp, 'w', encoding='utf-8-sig') as f:
            f.write(content)
        print('UPDATED: ' + rel)
    else:
        print('NOCHANGE: ' + rel)

print('Done.')
