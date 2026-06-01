import { useEffect, useRef } from "react";

type Props = {
  spacing?: number;
  radius?: number;
  color?: string;
  sensitivity?: number;
  zoomOut?: boolean;
  className?: string;
};

/**
 * Dot-grid torus with Google Earth-style controls:
 *  - Drag to rotate (panning wraps seamlessly — it's a torus, no edges)
 *  - Wheel zooms (eased, anchored to camera)
 *  - Back-facing dots fade with depth for 3D readability
 *
 * Dots are placed on a triangular lattice over the (u, v) surface of the
 * torus, then projected with a simple perspective camera.
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

    // Parse base color
    const m = color.match(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/,
    );
    const r0 = m ? Number(m[1]) : 255;
    const g0 = m ? Number(m[2]) : 255;
    const b0 = m ? Number(m[3]) : 255;
    const a0 = m && m[4] ? Number(m[4]) : 1;

    // ----- Torus geometry (world units) -----
    const R = 1.0; // major radius (ring center to tube center)
    const r = 0.4; // minor radius (tube)
    // Lattice density around the two loops
    const N_U = 96; // around the big ring
    const N_V = 36; // around the tube
    const dU = (Math.PI * 2) / N_U;
    const dV = (Math.PI * 2) / N_V;

    // ----- Camera / view state -----
    const LERP_ROT = 0.18;
    const LERP_ZOOM = 0.12;
    const LERP_PAN = 0.22;

    // Rotation (radians) — drag rotates these
    let targetRotX = -0.55; // tilt forward so we see the donut hole
    let targetRotY = 0.0;
    let currentRotX = targetRotX;
    let currentRotY = targetRotY;

    // World translation in camera space (X/Y in screen plane, Z along view axis)
    let targetPanX = 0;
    let targetPanY = 0;
    let targetPanZ = 0;
    let currentPanX = 0;
    let currentPanY = 0;
    let currentPanZ = 0;

    // Zoom in log-space (0 = base scale)
    let targetZoom = 0;
    let currentZoom = 0;

    let raf = 0;

    const render = () => {
      currentRotX += (targetRotX - currentRotX) * LERP_ROT;
      currentRotY += (targetRotY - currentRotY) * LERP_ROT;
      currentZoom += (targetZoom - currentZoom) * LERP_ZOOM;
      currentPanX += (targetPanX - currentPanX) * LERP_PAN;
      currentPanY += (targetPanY - currentPanY) * LERP_PAN;
      currentPanZ += (targetPanZ - currentPanZ) * LERP_PAN;

      ctx.clearRect(0, 0, width, height);

      // Base screen scale: fit torus into viewport
      const baseScale = Math.min(width, height) * 0.32;
      const scale = baseScale * Math.pow(2, zoomOut ? -currentZoom : currentZoom);
      const cx = width / 2;
      const cy = height / 2;

      // Camera distance for perspective (pan Z pushes torus toward / away)
      const camZ = 3.2;
      const focal = 2.4;

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      // Dot pixel radius scales with zoom
      const dotR = Math.max(0.5, radius * Math.min(scale / baseScale, 3));

      type P = { x: number; y: number; depth: number; alpha: number };
      const pts: P[] = [];

      for (let j = 0; j < N_V; j++) {
        const v = j * dV;
        // Triangular lattice: offset alternate rings around the tube
        const uOff = j & 1 ? dU * 0.5 : 0;
        const cosV = Math.cos(v);
        const sinV = Math.sin(v);
        const ringR = R + r * cosV;
        const z0 = r * sinV;

        for (let i = 0; i < N_U; i++) {
          const u = i * dU + uOff;
          const cosU = Math.cos(u);
          const sinU = Math.sin(u);

          // Torus surface point in world space
          const wx = ringR * cosU;
          const wy = ringR * sinU;
          const wz = z0;

          // Rotate around Y (drag X), then X (drag Y)
          const x1 = wx * cosY + wz * sinY;
          const z1 = -wx * sinY + wz * cosY;
          const y2 = wy * cosX - z1 * sinX;
          const z2 = wy * sinX + z1 * cosX;

          // Apply camera-space translation (pan)
          const xC = x1 + currentPanX;
          const yC = y2 + currentPanY;
          const zC = z2 + currentPanZ;

          // Outward surface normal, rotated the same way (translation doesn't affect direction)
          const nx0 = cosV * cosU;
          const ny0 = cosV * sinU;
          const nz0 = sinV;
          const nx1 = nx0 * cosY + nz0 * sinY;
          const nz1 = -nx0 * sinY + nz0 * cosY;
          const ny2 = ny0 * cosX - nz1 * sinX;
          const nz2 = ny0 * sinX + nz1 * cosX;

          // Perspective projection
          const denom = camZ - zC;
          if (denom <= 0.05) continue;
          const px = cx + (xC * focal * scale) / denom;
          const py = cy + (yC * focal * scale) / denom;

          // Facing factor: how much the surface normal points toward camera (+z)
          const facing = nz2;
          const facingAlpha =
            facing > 0 ? 0.4 + 0.6 * facing : 0.08 * Math.max(0, 1 + facing);

          pts.push({ x: px, y: py, depth: zC, alpha: facingAlpha });
        }
      }


      // Sort back-to-front so front dots overlap back ones cleanly
      pts.sort((a, b) => a.depth - b.depth);

      for (const p of pts) {
        if (p.x < -dotR || p.x > width + dotR) continue;
        if (p.y < -dotR || p.y > height + dotR) continue;
        ctx.fillStyle = `rgba(${r0},${g0},${b0},${a0 * p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    // ----- Wheel zoom -----
    const onWheel = (e: WheelEvent) => {
      targetZoom += -e.deltaY * sensitivity;
      // Soft clamp so it can't go absurdly far
      if (targetZoom < -3) targetZoom = -3;
      if (targetZoom > 5) targetZoom = 5;
    };

    // ----- Drag: left = orbit, right / shift = pan in 3D -----
    let dragging = false;
    let panMode = false;
    let lastX = 0;
    let lastY = 0;
    const ROT_SENS = 0.005;
    const PAN_SENS = 0.004;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      // Right button (2) or middle (1) or shift = pan; otherwise orbit
      panMode = e.button === 2 || e.button === 1 || e.shiftKey;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = panMode ? "move" : "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      if (panMode) {
        targetPanX += dx * PAN_SENS;
        targetPanY += dy * PAN_SENS;
      } else {
        targetRotY += dx * ROT_SENS;
        targetRotX += dy * ROT_SENS;
        if (targetRotX < -Math.PI / 2 + 0.05) targetRotX = -Math.PI / 2 + 0.05;
        if (targetRotX > Math.PI / 2 - 0.05) targetRotX = Math.PI / 2 - 0.05;
      }
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
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    window.addEventListener("wheel", onWheel, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("contextmenu", onContextMenu);

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("contextmenu", onContextMenu);
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
