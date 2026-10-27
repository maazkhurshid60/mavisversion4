import { useEffect } from "react";

/**
 * Feeds the pointer position into every button under the cursor so the
 * spotlight layer in `.btn::before` can track it. One document-level
 * listener for the whole page — no per-button refs.
 */
export default function useButtonSpotlight() {
  useEffect(() => {
    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      pending = null;
    };

    const handleMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest?.(".btn") as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pending = {
        el,
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top),
      };
      if (!frame) frame = window.requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", handleMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}