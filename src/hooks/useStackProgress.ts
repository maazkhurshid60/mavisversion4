import { useEffect, useRef } from "react";

/**
 * Scroll-stack progress.
 *
 * Writes a single custom property — `--stack-progress` (0 → 1) — onto the
 * element. 0 means the panel is fully visible; 1 means the following panel
 * has travelled all the way up and completely covers it.
 *
 * The CSS then uses that value to ease the panel back a few percent and dim
 * it, which produces the layered "next chapter slides over the last one"
 * feeling without any layout thrash. Only active from the md breakpoint up,
 * where the panels are pinned; on phones everything stays in normal flow.
 */
export function useStackProgress<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const query = window.matchMedia("(min-width: 768px)");
    let frame = 0;

    const paint = () => {
      if (!query.matches) {
        el.style.removeProperty("--stack-progress");
        return;
      }

      const rect = el.getBoundingClientRect();
      const height = rect.height || 1;
      const next = el.nextElementSibling as HTMLElement | null;
      const nextTop = next ? next.getBoundingClientRect().top : rect.top + height;
      const raw = 1 - (nextTop - rect.top) / height;
      const progress = Math.min(1, Math.max(0, raw));
      el.style.setProperty("--stack-progress", progress.toFixed(3));
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    query.addEventListener("change", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      query.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}