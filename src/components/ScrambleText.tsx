import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

export function ScrambleText({
  text,
  trigger,
  duration = 600,
  className,
}: {
  text: string;
  trigger: boolean;
  duration?: number;
  className?: string;
}) {
  const [output, setOutput] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    setOutput(text);
  }, [text]);

  useEffect(() => {
    if (!trigger) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setOutput(text);
      return;
    }

    startRef.current = performance.now();
    const len = text.length;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // each character "settles" at its own threshold based on index
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          const settleAt = (i + 1) / len;
          if (progress >= settleAt) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setOutput(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, text, duration]);

  return <span className={className}>{output}</span>;
}
