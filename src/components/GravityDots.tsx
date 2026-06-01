import { useEffect, useRef } from "react";

type Props = {
  spacing?: number;
  radius?: number;
  color?: string;
  /** Seconds for the lattice to double in scale (one fractal octave). */
  zoomPeriod?: number;
  /** Reverse direction: true = zoom out (lattice shrinks), false = zoom in. */
  zoomOut?: boolean;
  className?: string;
};

/**
 * Infinite-zoom fractal lattice inspired by Buckminster Fuller's
 * Isotropic Vector Matrix — the 2D projection of close-packed spheres
 * is an equilateral triangular grid (the same grid that underlies the
 * vector equilibrium / cuboctahedron). Because the triangular lattice is
 * self-similar at every factor of 2, we render several octaves at once,
 * continuously scaling them, and cross-fade the innermost/outermost
 * layers so the zoom never visibly resets.
 */
export function GravityDots({
  spacing = 26,
  radius = 0.9,
  color = "rgba(255,255,255,0.22)",
  zoomPeriod = 16,
  zoomOut = false,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Parse base color → rgba with adjustable alpha
    const rgbaMatch = color.match(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/,
    );
    const r0 = rgbaMatch ? Number(rgbaMatch[1]) : 255;
    const g0 = rgbaMatch ? Number(rgbaMatch[2]) : 255;
    const b0 = rgbaMatch ? Number(rgbaMatch[3]) : 255;
    const a0 = rgbaMatch && rgbaMatch[4] ? Number(rgbaMatch[4]) : 1;

    // Number of octaves drawn simultaneously. 4 keeps the screen filled
    // at all phases (one emerging, two mid, one fading).
    const LAYERS = 4;
    const periodMs = Math.max(1000, zoomPeriod * 1000);

    const drawLattice = (s: number, alpha: number, cx: number, cy: number) => {
      if (alpha <= 0.001) return;
      const rowH = s * 0.8660254; // sqrt(3)/2
      // Bounds in lattice index space, centered at (cx, cy)
      const iMin = Math.floor((-cx) / s) - 2;
      const iMax = Math.ceil((width - cx) / s) + 2;
      const jMin = Math.floor((-cy) / rowH) - 2;
      const jMax = Math.ceil((height - cy) / rowH) + 2;

      // Dot radius grows with scale so it reads as a true zoom,
      // but is clamped so coarse layers don't bloat.
      const rScale = Math.min(s / spacing, 3);
      const r = radius * rScale;

      ctx.fillStyle = `rgba(${r0},${g0},${b0},${a0 * alpha})`;
      for (let j = jMin; j <= jMax; j++) {
        const y = cy + j * rowH;
        if (y < -r || y > height + r) continue;
        const xOff = j & 1 ? s / 2 : 0;
        for (let i = iMin; i <= iMax; i++) {
          const x = cx + i * s + xOff;
          if (x < -r || x > width + r) continue;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      // t cycles 0 → 1. When t hits 1, every layer has scaled up by 2,
      // so layer k seamlessly takes the place of layer k-1 → infinite zoom.
      let t = ((now - start) % periodMs) / periodMs;
      if (zoomOut) t = 1 - t;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      for (let k = 0; k < LAYERS; k++) {
        // Layer k has scale = spacing * 2^(k - 1 + t).
        // k=0 emerges from sub-pixel, k=LAYERS-1 fades out as it gets huge.
        const exp = k - 1 + t;
        const s = spacing * Math.pow(2, exp);

        // Smooth cross-fade envelope across all layers.
        // Fade in over first layer (k=0), full middle, fade out at last.
        let alpha: number;
        if (k === 0) {
          alpha = t * t * (3 - 2 * t); // smoothstep in
        } else if (k === LAYERS - 1) {
          const u = 1 - t;
          alpha = u * u * (3 - 2 * u); // smoothstep out
        } else {
          alpha = 1;
        }

        drawLattice(s, alpha, cx, cy);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [spacing, radius, color, zoomPeriod, zoomOut]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
