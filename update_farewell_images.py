import os
import glob
from pillow_heif import register_heif_opener
from PIL import Image
import shutil
import re

register_heif_opener()

src_dir = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\bái bai khôi"
dest_dir = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\T1K23_Farewell_Web\assets\farewell"
farewell_js_path = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\T1K23_Farewell_Web\js\farewell.js"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

valid_exts = [".jpg", ".jpeg", ".png", ".heic", ".webp", ".gif", ".avif"]

final_urls = []

for file in os.listdir(src_dir):
    src_file = os.path.join(src_dir, file)
    if os.path.isfile(src_file):
        ext = os.path.splitext(file)[1].lower()
        if ext in valid_exts:
            if ext == ".heic":
                try:
                    img = Image.open(src_file)
                    new_filename = os.path.splitext(file)[0] + ".JPG"
                    dest_file = os.path.join(dest_dir, new_filename)
                    img.save(dest_file, "JPEG")
                    final_urls.append(f'"assets/farewell/{new_filename}"')
                    print(f"Converted {file} to JPG")
                except Exception as e:
                    print(f"Failed to convert {file}: {e}")
            else:
                dest_file = os.path.join(dest_dir, file)
                shutil.copy2(src_file, dest_file)
                final_urls.append(f'"assets/farewell/{file}"')
                print(f"Copied {file}")

print(f"Processed {len(final_urls)} images.")

if len(final_urls) > 0:
    with open(farewell_js_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    urls_str = ", ".join(final_urls)
    new_gallery = f"this.gallery = [{urls_str}]; // Sử dụng bộ ảnh riêng biệt bái bai Khôi"
    
    # Check if the exact string is there, or if we have already replaced it before
    if "this.gallery = [khoiData.mainImg, ...khoiData.subImgs];" in content:
        content = content.replace("this.gallery = [khoiData.mainImg, ...khoiData.subImgs];", new_gallery)
    else:
        # Fallback to regex
        content = re.sub(r"this\.gallery\s*=\s*\[.*?\];\s*//\s*Sử dụng bộ ảnh riêng biệt bái bai Khôi", new_gallery, content)
        content = re.sub(r"this\.gallery\s*=\s*\[.*?\];", new_gallery, content, count=1)
        
    with open(farewell_js_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated farewell.js")
else:
    print("No valid images found.")
