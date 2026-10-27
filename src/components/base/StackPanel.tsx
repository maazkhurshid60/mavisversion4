import type { ReactNode } from "react";
import { useStackProgress } from "@/hooks/useStackProgress";

interface StackPanelProps {
  children: ReactNode;
  /** Order inside the stack — later panels paint over earlier ones. */
  order: number;
  className?: string;
  label?: string;
  /** Anchor id — also what the chapter rail observes. */
  id?: string;
}

/**
 * One panel of a pinned scroll stack.
 *
 * Desktop: the panel is sticky at the top of the viewport, so as you scroll the
 * following panel rides up and covers it while this one eases back slightly and
 * dims. Phone: behaves as a normal section.
 */
export default function StackPanel({ children, order, className = "", label, id }: StackPanelProps) {
  const ref = useStackProgress<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      style={{ zIndex: order }}
      className={`stack-panel ${className}`}
    >
      {children}
      <span className="stack-panel-veil" aria-hidden="true" />
    </section>
  );
}