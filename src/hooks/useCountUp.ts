import { useEffect, useRef, useState } from "react";

interface UseCountUpResult {
  ref: React.RefObject<HTMLSpanElement | null>;
  value: number;
}

/**
 * Counts a number up from 0 to `target` once the attached element scrolls into
 * view. Eased with an ease-out cubic so it settles gracefully. Users who prefer
 * reduced motion jump straight to the final value.
 */
export function useCountUp(target: number, duration = 1600): UseCountUpResult {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let rafId = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        setValue(Math.round(target * eased));
        if (elapsed < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            run();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return { ref, value };
}