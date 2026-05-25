import os
import shutil
import json

src_dir = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\background sound"
dest_dir = r"c:\Users\Heavietnam\Desktop\cuối cấp 3\T1K23_Farewell_Web\assets\bgm"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

mp3_files = []
for file in os.listdir(src_dir):
    if file.endswith(".mp3"):
        src_file = os.path.join(src_dir, file)
        dest_file = os.path.join(dest_dir, file)
        shutil.copy2(src_file, dest_file)
        mp3_files.append(f"assets/bgm/{file}")

print("Copied files:")
print(json.dumps(mp3_files))
