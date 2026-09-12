import subprocess
import os

chrome_bin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
base_dir = "/Users/parasharranade/Lumeric"

figures = [
    {
        "svg": os.path.join(base_dir, "assets/figure1_bode_mag.svg"),
        "jpeg": os.path.join(base_dir, "assets/figure1_bode_mag.jpeg"),
        "width": 450,
        "height": 380
    },
    {
        "svg": os.path.join(base_dir, "assets/figure2_bode_phase.svg"),
        "jpeg": os.path.join(base_dir, "assets/figure2_bode_phase.jpeg"),
        "width": 450,
        "height": 380
    },
    {
        "svg": os.path.join(base_dir, "assets/sample_spectral.svg"),
        "jpeg": os.path.join(base_dir, "assets/sample_spectral.jpeg"),
        "width": 900,
        "height": 420
    }
]

for fig in figures:
    with open(fig["svg"], "r", encoding="utf-8") as f:
        svg_code = f.read()

    html_file = os.path.join(base_dir, "temp_render.html")
    png_file = os.path.join(base_dir, "temp_render.png")

    html_content = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ background: #ffffff; width: {fig['width']}px; height: {fig['height']}px; overflow: hidden; display: flex; align-items: center; justify-content: center; }}
</style>
</head>
<body>
{svg_code}
</body>
</html>"""

    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)

    # Capture screenshot using headless Google Chrome with high DPI (device-scale-factor=2)
    chrome_cmd = [
        chrome_bin,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--window-size={fig['width']},{fig['height']}",
        f"--force-device-scale-factor=2",
        f"--screenshot={png_file}",
        f"file://{html_file}"
    ]
    subprocess.run(chrome_cmd, check=True)

    # Convert to high-quality JPEG using macOS native sips
    sips_cmd = [
        "sips",
        "-s", "format", "jpeg",
        "-s", "formatOptions", "95",
        png_file,
        "--out", fig["jpeg"]
    ]
    subprocess.run(sips_cmd, check=True)

    if os.path.exists(html_file):
        os.remove(html_file)
    if os.path.exists(png_file):
        os.remove(png_file)

    print(f"✓ Successfully rendered light paper JPEG: {fig['jpeg']}")

print("All diagrams rendered to light/paper background JPEGs.")
