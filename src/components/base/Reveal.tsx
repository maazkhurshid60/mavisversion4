import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Base delay in milliseconds applied before the animation starts. */
  delay?: number;
  /** Position of this item within a group; used to auto-stagger siblings. */
  index?: number;
  /** Milliseconds added per `index`, enabling a cascading reveal. */
  step?: number;
  /** Vertical travel distance in pixels before settling into place. */
  y?: number;
  /** Horizontal travel distance in pixels (negative slides in from the left). */
  x?: number;
  /** Starting scale, for a subtle zoom-in effect. */
  scale?: number;
  /** Transition duration in milliseconds. */
  duration?: number;
}

/**
 * Scroll reveal.
 * Long, soft and unhurried — every element drifts up a short distance and
 * settles, mirroring the slow fade-in-up rhythm of the reference site.
 * Nothing overshoots, nothing bounces.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  index = 0,
  step = 0,
  y = 30,
  x = 0,
  scale = 1,
  duration = 1100,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: `${delay + index * step}ms`,
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translate3d(0, 0, 0) scale(1)"
      : `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
  };

  return (
    <div ref={ref} style={style} className={`transition will-change-transform ${className}`}>
      {children}
    </div>
  );
}