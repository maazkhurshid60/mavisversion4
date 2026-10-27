import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  /** Chapter folio, e.g. "01". Rendered as a small bronze numeral. */
  index?: string;
  className?: string;
  tone?: "primary" | "secondary" | "light";
  /** Centre the folio pair (used on dark chapter bands). */
  centered?: boolean;
}

const labelTone: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  primary: "text-foreground-700",
  secondary: "text-foreground-600",
  light: "text-background-50/95",
};

const markTone: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  primary: "text-accent-600",
  secondary: "text-accent-700",
  light: "text-accent-300",
};

/**
 * Section folio.
 *
 * A small bronze numeral and a light phrase, set the way a printed
 * monograph opens a chapter, with no hairline rule and no tracked uppercase
 * capsule.
 * The tracking and uppercase live on buttons instead, so the two voices stay
 * distinct instead of both shouting in the same register.
 */
export default function Eyebrow({
  children,
  index,
  className = "",
  tone = "primary",
  centered = false,
}: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-2.5 ${
        centered ? "justify-center" : ""
      } ${className}`}
    >
      {index ? (
        <span
          className={`font-body text-[0.62rem] font-medium leading-none tracking-[0.16em] ${markTone[tone]}`}
        >
          {index}
        </span>
      ) : null}
      <span
        className={`font-body text-[0.92rem] font-normal leading-[1.3] tracking-[0.015em] md:text-[1.03rem] ${labelTone[tone]}`}
      >
        {children}
      </span>
    </span>
  );
}