import { useEffect, useRef } from "react";

type SceneMode = "cover" | "pin";

/**
 * Scroll scene driver.
 *
 * Writes a single unitless custom property — `--p` (0 → 1) — onto the element
 * and lets CSS interpolate every camera move from it. No React re-renders, no
 * layout thrash: one rAF-throttled read per frame, then pure compositor work.
 *
 *   cover — progress of the element leaving the viewport. Used by the hero,
 *           where the frame is exactly one screen tall.
 *   pin   — progress through the scroll travel of a tall pinned section
 *           (height minus one viewport). Used by the film chapter.
 */
export function useScrollScene<T extends HTMLElement = HTMLElement>(mode: SceneMode = "pin") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "0");
      return undefined;
    }

    let frame = 0;

    const paint = () => {
      const rect = el.getBoundingClientRect();
      const travel = mode === "cover" ? rect.height || 1 : Math.max(1, rect.height - window.innerHeight);
      const raw = -rect.top / travel;
      const progress = Math.min(1, Math.max(0, raw));
      el.style.setProperty("--p", progress.toFixed(4));
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [mode]);

  return ref;
}