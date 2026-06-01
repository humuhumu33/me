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
 * with Google Earth-style controls:
 *  - Mouse wheel zooms toward the cursor (anchor point stays put)
 *  - Click & drag pans the lattice
 *  - Infinite zoom (no min/max) — self-similar octaves cross-fade seamlessly
 *  - Eased motion for smooth, weighty feel
 */
export function GravityDots({
  spacing = 26,
  radius = 0.9,
  color = "rgba(255,255,255,0.22)",
  sensitivity = 0.0015,
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
    const LERP_ZOOM = 0.12;
    const LERP_PAN = 0.18;

    // Continuous zoom (no bounds — infinite both ways)
    let targetZoom = 0;
    let currentZoom = 0;
    // Pan offset (in screen pixels at currentZoom = 0 frame, but applied directly)
    let targetPanX = 0;
    let targetPanY = 0;
    let currentPanX = 0;
    let currentPanY = 0;

    const drawLattice = (s: number, alpha: number, cx: number, cy: number) => {
      if (alpha <= 0.001) return;
      const rowH = s * 0.8660254; // sqrt(3)/2
      const iMin = Math.floor(-cx / s) - 2;
      const iMax = Math.ceil((width - cx) / s) + 2;
      const jMin = Math.floor(-cy / rowH) - 2;
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
      // Ease toward targets
      currentZoom += (targetZoom - currentZoom) * LERP_ZOOM;
      currentPanX += (targetPanX - currentPanX) * LERP_PAN;
      currentPanY += (targetPanY - currentPanY) * LERP_PAN;

      let t = currentZoom % 1;
      if (t < 0) t += 1;
      if (zoomOut) t = 1 - t;

      ctx.clearRect(0, 0, width, height);
      // Origin: viewport center + pan offset
      const cx = width / 2 + currentPanX;
      const cy = height / 2 + currentPanY;

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

    // ----- Zoom toward cursor (Google Earth style) -----
    const onWheel = (e: WheelEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Mouse position relative to viewport center + current pan
      const mx = e.clientX - rect.left - width / 2 - targetPanX;
      const my = e.clientY - rect.top - height / 2 - targetPanY;

      const dz = e.deltaY * sensitivity * (zoomOut ? -1 : 1);
      // After zoom, scale factor is 2^(-dz) (zooming "in" means lattice expands)
      const scale = Math.pow(2, -dz);

      // Keep the point under the cursor fixed:
      // new_pan = mouse_screen - mouse_world * scale  → adjust pan by mouse * (scale - 1)
      targetPanX -= mx * (scale - 1);
      targetPanY -= my * (scale - 1);

      targetZoom += dz;
    };

    // ----- Click & drag to pan -----
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Only left button / primary pointer
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      targetPanX += dx;
      targetPanY += dy;
      // Snap current so drag feels 1:1 instead of lagging
      currentPanX += dx;
      currentPanY += dy;
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      canvas.style.cursor = "grab";
    };

    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    window.addEventListener("wheel", onWheel, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
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
