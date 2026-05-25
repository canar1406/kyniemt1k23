import re

md_path = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\chúc đỗ khôi.md"
data_js_path = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\T1K23_Farewell_Web\js\data.js"

with open(md_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

wishes = []
for line in lines:
    line = line.strip()
    match = re.search(r'^\d+\.\s+"(.*)"', line)
    if match:
        wish = match.group(1).replace('"', '\\"')
        wishes.append(f'    "{wish}"')

if not wishes:
    print("No wishes found!")
    exit(1)

wishes_str = ",\n".join(wishes)
new_khoi_wishes = f"const KHOI_WISHES = [\n{wishes_str}\n];"

with open(data_js_path, "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(r'const KHOI_WISHES = \[.*?\];', new_khoi_wishes, content, flags=re.DOTALL)

with open(data_js_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Updated {len(wishes)} wishes in data.js.")
