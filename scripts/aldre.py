import sys, random
from PIL import Image, ImageFilter, ImageOps, ImageDraw, ImageChops
import numpy as np

def aldre(inn, ut, boks=None, seed=1, bredde=1280, varme=0.0):
    rnd = np.random.default_rng(seed)
    im = Image.open(inn).convert("L")
    if boks:
        w, h = im.size
        im = im.crop((int(boks[0]*w), int(boks[1]*h), int(boks[2]*w), int(boks[3]*h)))
    if im.width > bredde:
        im = im.resize((bredde, round(im.height * bredde / im.width)), Image.LANCZOS)
    im = ImageOps.autocontrast(im, cutoff=0.5)
    im = im.filter(ImageFilter.GaussianBlur(0.6))
    a = np.asarray(im).astype(np.float32) / 255.0
    # Litt falmet: løft svart, demp hvitt
    a = 0.06 + a * 0.86
    # Korn
    korn = rnd.normal(0, 0.055, a.shape).astype(np.float32)
    korn = np.asarray(Image.fromarray(((korn + 0.5) * 255).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5))).astype(np.float32) / 255.0 - 0.5
    a = a + korn * 0.9
    # Vignett
    h, w = a.shape
    y, x = np.ogrid[:h, :w]
    r = np.sqrt(((x - w / 2) / (w / 2)) ** 2 + ((y - h / 2) / (h / 2)) ** 2)
    a = a * (1 - 0.32 * np.clip(r - 0.55, 0, 1) ** 1.4)
    # Ujevn eksponering
    flekk = rnd.normal(0, 1, (6, 8)).astype(np.float32)
    flekk = np.asarray(Image.fromarray(((flekk * 0.15 + 0.5) * 255).clip(0, 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)).astype(np.float32) / 255.0 - 0.5
    a = a + flekk * 0.08
    out = Image.fromarray((a.clip(0, 1) * 255).astype(np.uint8))
    d = ImageDraw.Draw(out)
    # Støv og riper
    for _ in range(int(w * h / 9000)):
        cx, cy = rnd.integers(0, w), rnd.integers(0, h)
        rr = rnd.uniform(0.4, 1.6)
        d.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), fill=int(rnd.choice([20, 235])))
    for _ in range(3):
        x0 = rnd.integers(0, w)
        d.line((x0, 0, x0 + rnd.integers(-30, 30), h), fill=int(rnd.choice([40, 225])), width=1)
    rgb = Image.merge("RGB", (out, out, out))
    if varme:
        r_, g_, b_ = [np.asarray(c).astype(np.float32) for c in rgb.split()]
        rgb = Image.merge("RGB", [Image.fromarray(np.clip(c, 0, 255).astype(np.uint8)) for c in (r_ * (1 + varme), g_, b_ * (1 - varme))])
    rgb.save(ut, "JPEG", quality=78, optimize=True, progressive=True)
    print(ut, rgb.size)

if __name__ == "__main__":
    # python3 scripts/aldre.py inn.jpg ut.jpg [x0 y0 x1 y1] — beskjæring i andeler av bildet
    boks = tuple(float(v) for v in sys.argv[3:7]) if len(sys.argv) >= 7 else None
    aldre(sys.argv[1], sys.argv[2], boks=boks)
