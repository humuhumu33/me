import { useEffect, useRef } from "react";

type Props = {
  spacing?: number;
  radius?: number;
  color?: string;
  /** Scroll sensitivity: zoom cycles per wheel unit (higher = more responsive). */
  sensitivity?: number;
  /** Reverse direction: true = scroll-down zooms in, false = scroll-down zooms out. */
  zoomOut?: boolean;
  className?: string;
};

/**
 * Fractal triangular lattice (Buckminster Fuller's Isotropic Vector Matrix)
 * zoomed by mouse wheel.  The lattice is self-similar at every factor of 2,
 * so we render several octaves and cross-fade the innermost / outermost
 * layers; the user controls the zoom position by scrolling.
 */
export function GravityDots({
  spacing = 26,
  radius = 0.9,
  color = "rgba(255,255,255,0.22)",
  sensitivity = 0.003,
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

    const LAYERS = 4;
    const ZOOM_MIN = -2; // 2 octaves inward (zoom in limit)
    const ZOOM_MAX = 2;  // 2 octaves outward (zoom out limit)
    const LERP = 0.08;   // interpolation factor per frame (lower = smoother)

    let targetZoom = 0;
    let currentZoom = 0;

    const drawLattice = (s: number, alpha: number, cx: number, cy: number) => {
      if (alpha <= 0.001) return;
      const rowH = s * 0.8660254; // sqrt(3)/2
      const iMin = Math.floor((-cx) / s) - 2;
      const iMax = Math.ceil((width - cx) / s) + 2;
      const jMin = Math.floor((-cy) / rowH) - 2;
      const jMax = Math.ceil((height - cy) / rowH) + 2;

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

    const render = () => {
      // Ease currentZoom toward targetZoom
      if (Math.abs(currentZoom - targetZoom) > 0.0001) {
        currentZoom += (targetZoom - currentZoom) * LERP;
      } else {
        currentZoom = targetZoom;
      }

      let t = currentZoom % 1;
      if (t < 0) t += 1;
      if (zoomOut) t = 1 - t;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      for (let k = 0; k < LAYERS; k++) {
        const exp = k - 1 + t;
        const s = spacing * Math.pow(2, exp);

        let alpha: number;
        if (k === 0) {
          alpha = t * t * (3 - 2 * t);
        } else if (k === LAYERS - 1) {
          const u = 1 - t;
          alpha = u * u * (3 - 2 * u);
        } else {
          alpha = 1;
        }

        drawLattice(s, alpha, cx, cy);
      }

      raf = requestAnimationFrame(render);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom += e.deltaY * sensitivity;
      if (targetZoom < ZOOM_MIN) targetZoom = ZOOM_MIN;
      if (targetZoom > ZOOM_MAX) targetZoom = ZOOM_MAX;
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [spacing, radius, color, sensitivity, zoomOut]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
