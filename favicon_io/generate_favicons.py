"""
This module creates favicons in various sizes while preserving transparancy as well as
generating a manifest.

Usage: generate_favicons.py sourceImage.png [YourAppName] [manifest_ouput_path]

Author: phentos
"""

from PIL import Image
import json

def generateFavicon(sourceImage, app_name="None", manifest_path='site.webmanifest'):
    input_image = Image.open(sourceImage).convert('RGBA')
    sizes = [16, 32, 64, 128, 256]
    icons = []

    for size in sizes:
        output_image = input_image.resize((size, size), resample=Image.Resampling.LANCZOS)
        output_image.save(f'favicon-{size}.png', sizes=[(size, size)])
        
        # Add the size and filename to the manifest
        icons.append({'src': f'favicon-{size}.png', 'sizes': f'{size}x{size}', 'type': 'image/png'})

    # Generate the manifest
    manifest = {'name': app_name, 'icons': icons}
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f)

    print('All done.')


if __name__ == "__main__":
    import sys

    try:
        if len(sys.argv) < 2:
            print("correct use is 'generate_favicons.py sourceImage.png [YourAppName] [manifest_ouput_path]'")
        elif len(sys.argv) == 4:
            generateFavicon(sys.argv[1], sys.argv[2], sys.argv[3])
        else:
            generateFavicon(sys.argv[1], sys.argv[2])
    except Exception as oops:
        print(str(oops))
