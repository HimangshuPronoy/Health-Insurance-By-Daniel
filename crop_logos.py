import sys
import os
from PIL import Image

def crop_to_content(input_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        
        # Get bounding box of non-transparent areas
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            img.save(input_path, "PNG")
            print(f"Cropped {input_path}")
        else:
            print(f"Skipped {input_path} - no content found")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    files = [
        "public/logos/kaiser.png",
        "public/logos/molina.png",
        "public/logos/bluecross.png",
        "public/logos/aetna.png",
        "public/logos/cigna.png",
        "public/logos/united.png",
    ]
    for f in files:
        if os.path.exists(f):
            crop_to_content(f)
        else:
            print(f"File not found: {f}")
