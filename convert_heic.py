import os
import glob
from pillow_heif import register_heif_opener
from PIL import Image

register_heif_opener()

assets_dir = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\T1K23_Farewell_Web\assets\members"
data_js_path = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\T1K23_Farewell_Web\js\data.js"

heic_files = glob.glob(os.path.join(assets_dir, "**", "*.HEIC"), recursive=True)
heic_files.extend(glob.glob(os.path.join(assets_dir, "**", "*.heic"), recursive=True))
heic_files = list(set(heic_files))

converted_count = 0
for heic_path in heic_files:
    try:
        img = Image.open(heic_path)
        jpg_path = os.path.splitext(heic_path)[0] + ".JPG"
        img.save(jpg_path, "JPEG")
        os.remove(heic_path)
        print(f"Converted {os.path.basename(heic_path)} to JPG")
        converted_count += 1
    except Exception as e:
        print(f"Failed to convert {heic_path}: {e}")

if converted_count > 0:
    with open(data_js_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = content.replace(".HEIC", ".JPG").replace(".heic", ".JPG")
    
    with open(data_js_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Updated data.js with {converted_count} conversions.")
else:
    print("No HEIC files needed conversion.")
