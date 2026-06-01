import { useEffect, useRef } from "react";

type Props = {
  spacing?: number;
  radius?: number;
  color?: string;
  className?: string;
};

export function GravityDots({
  spacing = 26,
  radius = 1.4,
  color = "rgba(255,255,255,0.50)",
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      const rowH = spacing * 0.8660254; // sqrt(3)/2 → equilateral triangular grid
      const cols = Math.ceil(width / spacing) + 3;
      const rows = Math.ceil(height / rowH) + 3;
      const offX = ((width % spacing) / 2) - spacing;
      const offY = ((height % rowH) / 2) - rowH;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = offX + i * spacing + (j % 2 ? spacing / 2 : 0);
          const y = offY + j * rowH;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [spacing, radius, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
