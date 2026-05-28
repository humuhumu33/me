import { useEffect, useRef } from "react";

type Props = {
  spacing?: number;
  radius?: number;
  color?: string;
  pullRadius?: number;
  pullStrength?: number;
  className?: string;
};

export function GravityDots({
  spacing = 26,
  radius = 1.1,
  color = "rgba(255,255,255,0.35)",
  pullRadius = 180,
  pullStrength = 18,
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
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    // Mouse target (where cursor is) and smoothed mouse (eased follow)
    const target = { x: -9999, y: -9999, active: false };
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.active = true;
    };
    const onLeave = () => {
      target.active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", resize);

    const pullR2 = pullRadius * pullRadius;

    const draw = () => {
      // Ease the smoothed mouse toward target for buttery motion
      if (target.active) {
        mouse.x += (target.x - mouse.x) * 0.18;
        mouse.y += (target.y - mouse.y) * 0.18;
      } else {
        // Drift smoothed cursor off-screen so dots return
        mouse.x += (-9999 - mouse.x) * 0.05;
        mouse.y += (-9999 - mouse.y) * 0.05;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const offX = ((width % spacing) / 2) - spacing;
      const offY = ((height % spacing) / 2) - spacing;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = offX + i * spacing;
          const by = offY + j * spacing;

          let x = bx;
          let y = by;

          const dx = mouse.x - bx;
          const dy = mouse.y - by;
          const d2 = dx * dx + dy * dy;

          if (d2 < pullR2) {
            const d = Math.sqrt(d2) || 0.0001;
            // Falloff: strongest near cursor, fades to 0 at pullRadius
            const t = 1 - d / pullRadius;
            const force = pullStrength * t * t;
            x += (dx / d) * force;
            y += (dy / d) * force;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [spacing, radius, color, pullRadius, pullStrength]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
