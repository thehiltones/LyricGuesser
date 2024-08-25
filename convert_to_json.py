import os
import json

folder = 'lyrics/hymns/'

for fname in os.listdir(folder):
    if fname.endswith('json'):
        continue
    with open(f'{folder}{fname}', 'r') as f:
        lines = [l.strip() for l in f.readlines()]
    title = lines[0]
    link = lines[1]
    lyrics = lines[2:]
    with open(f"{folder}{fname.split('.')[0]+'.json'}", 'w', encoding='utf-8') as f:
        json.dump({'title': title, 'link': link, 'lyrics': lyrics}, f, indent=4)