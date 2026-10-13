"""Prepare a seamless, restrained earth texture from the supplied reference.

Development only: python -m pip install numpy pillow
Run from any directory: python scripts/generate-background.py
Only the generated WebP is served by the website; processing is not done at runtime.
"""

from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "assets" / "earth-reference.png"
OUTPUT = ROOT / "public" / "textures" / "earth-grain.webp"


def periodic_texture(image):
    """Remove the boundary discontinuity without mirroring or blurring the grain.

    Periodic-plus-smooth decomposition puts only the edge mismatch in a smooth
    correction field, preserving the reference's irregular granular detail.
    """
    height, width = image.shape
    boundary = np.zeros_like(image)
    boundary[0, :] = image[-1, :] - image[0, :]
    boundary[-1, :] = -boundary[0, :]
    boundary[:, 0] += image[:, -1] - image[:, 0]
    boundary[:, -1] += image[:, 0] - image[:, -1]

    x = np.arange(width) * 2 * np.pi / width
    y = np.arange(height) * 2 * np.pi / height
    denominator = 2 * np.cos(x)[None, :] + 2 * np.cos(y)[:, None] - 4
    denominator[0, 0] = 1
    spectrum = np.fft.fft2(boundary) / denominator
    spectrum[0, 0] = 0
    return image - np.fft.ifft2(spectrum).real


def minimum_seam(error):
    """Find a low-error cut through the overlap, keeping the grain sharp."""
    rows, columns = error.shape
    costs = error.copy()
    predecessors = np.zeros(error.shape, dtype=np.int32)
    indices = np.arange(columns)
    for row in range(1, rows):
        previous = costs[row - 1]
        options = np.stack((
            np.pad(previous[:-1], (1, 0), constant_values=np.inf),
            previous,
            np.pad(previous[1:], (0, 1), constant_values=np.inf),
        ))
        predecessors[row] = indices + np.argmin(options, axis=0) - 1
        costs[row] += options.min(axis=0)
    seam = np.zeros(rows, dtype=np.int32)
    seam[-1] = np.argmin(costs[-1])
    for row in range(rows - 2, -1, -1):
        seam[row] = predecessors[row + 1, seam[row + 1]]
    return seam


def quilt_texture(source, width=1024, height=768):
    """Randomise overlapping source patches instead of visibly repeating the photo."""
    rng = np.random.default_rng(2005)
    size, overlap = 96, 32
    step = size - overlap
    output = np.zeros((height, width), dtype=np.float64)
    for y in range(0, height, step):
        for x in range(0, width, step):
            rows, columns = min(size, height - y), min(size, width - x)
            existing = output[y:y + rows, x:x + columns]
            best_patch, best_error = None, np.inf
            for _ in range(12):
                sy = rng.integers(0, source.shape[0] - size + 1)
                sx = rng.integers(0, source.shape[1] - size + 1)
                patch = source[sy:sy + size, sx:sx + size]
                patch = np.rot90(patch, rng.integers(0, 4))
                if rng.random() < 0.5:
                    patch = np.fliplr(patch)
                patch = patch[:rows, :columns]
                error = 0.0
                if x:
                    error += np.mean((existing[:, :overlap] - patch[:, :overlap]) ** 2)
                if y:
                    error += np.mean((existing[:overlap, :] - patch[:overlap, :]) ** 2)
                if error < best_error:
                    best_patch, best_error = patch, error

            mask = np.ones((rows, columns), dtype=bool)
            if x:
                seam = minimum_seam((existing[:, :overlap] - best_patch[:, :overlap]) ** 2)
                mask[:, :overlap] &= np.arange(overlap)[None, :] > seam[:, None]
            if y:
                seam = minimum_seam(((existing[:overlap, :] - best_patch[:overlap, :]) ** 2).T)
                mask[:overlap, :] &= np.arange(overlap)[:, None] > seam[None, :]
            existing[mask] = best_patch[mask]
    return output


def generate():
    pixels = np.asarray(Image.open(SOURCE).convert("RGB"), dtype=np.float64)
    luminance = pixels @ np.array([0.2126, 0.7152, 0.0722])
    texture = periodic_texture(quilt_texture(luminance))

    # Softly limit highlights rather than clipping them: tactile, not sparkling.
    detail = 30 * np.tanh((texture - np.median(texture)) / 40)
    base = np.array([49, 40, 33])
    warmth = np.array([1.06, 1.0, 0.90])
    image = base + detail[..., None] * warmth
    image = Image.fromarray(np.clip(np.rint(image), 0, 255).astype(np.uint8))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT, "WEBP", quality=77, method=6)
    print(f"{OUTPUT.name}: {OUTPUT.stat().st_size / 1024:.1f} KiB")


if __name__ == "__main__":
    generate()
