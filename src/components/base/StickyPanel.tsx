import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface StickyPanelProps {
  children: ReactNode;
  /** Paint order within the stack; higher sits on top of earlier panels. */
  index?: number;
  /** Background class for the panel, so it fully covers the one behind it. */
  bgClass?: string;
  /** Extra classes for the inner panel. */
  className?: string;
  /** How much the panel shrinks as the next section slides over it. */
  scaleAmount?: number;
  /** How much the panel recedes (upwards) as it is covered, in px. */
  driftAmount?: number;
  /** How dark the panel becomes as it is covered (0–1). */
  dimAmount?: number;
}

/**
 * A single pinned "stage" for a scroll-overlap moment. On desktop the panel
 * pins to the top of the viewport while the following sibling section slides
 * up and over it as a rounded card; the stage smoothly shrinks, drifts and
 * dims as it gets covered — a layered, premium card-stacking feel.
 *
 * Note: the stage deliberately does NOT clip its own overflow, so tall content
 * is never hidden. The effect is skipped on small screens and for
 * reduced-motion users (the panel then degrades to normal flow).
 */
export default function StickyPanel({
  children,
  index = 0,
  bgClass = "bg-background-100",
  className = "",
  scaleAmount = 0.07,
  driftAmount = 40,
  dimAmount = 0.55,
}: StickyPanelProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const panel = panelRef.current;
    if (!outer || !panel) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    let rafId = 0;

    const reset = () => {
      panel.style.transform = "";
      if (shadeRef.current) shadeRef.current.style.opacity = "0";
    };

    const update = () => {
      const isDesktop =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(min-width: 768px)").matches;

      if (!isDesktop) {
        reset();
        return;
      }

      const next = outer.nextElementSibling as HTMLElement | null;
      const viewport = window.innerHeight || 1;

      let progress = 0;
      if (next) {
        const rect = next.getBoundingClientRect();
        progress = Math.min(Math.max((viewport - rect.top) / viewport, 0), 1);
      }

      const scale = 1 - progress * scaleAmount;
      const drift = -progress * driftAmount;
      panel.style.transform = `translate3d(0, ${drift.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;

      if (shadeRef.current) {
        shadeRef.current.style.opacity = (progress * dimAmount).toFixed(3);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [scaleAmount, driftAmount, dimAmount]);

  return (
    <div ref={outerRef} className="relative md:sticky md:top-0" style={{ zIndex: 10 + index }}>
      <div
        ref={panelRef}
        className={`relative flex items-center will-change-transform md:min-h-screen ${bgClass} ${className}`}
        style={{ transformOrigin: "top center" }}
      >
        <div className="w-full">{children}</div>
        <div
          ref={shadeRef}
          className="pointer-events-none absolute inset-0 bg-foreground-950 opacity-0"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}