import type { ReactNode } from "react";

interface ButtonLabelProps {
  children: ReactNode;
}

/**
 * Button label.
 * Held still on purpose — the motion lives on the plate underneath it (a
 * cursor-tracking spotlight, a single sheen pass, and a short lift), never
 * in the words.
 */
export default function ButtonLabel({ children }: ButtonLabelProps) {
  return <span className="btn-label-text">{children}</span>;
}