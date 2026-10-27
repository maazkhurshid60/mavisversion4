import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  /** "light" = paper panel; "dark" = smoked panel over imagery. */
  tone?: "light" | "soft" | "strong" | "dark" | "darkStrong";
  /** Kept for call-site compatibility; edges are near-square now. */
  rounded?: "2xl" | "3xl" | "full";
}

const toneMap: Record<NonNullable<GlassPanelProps["tone"]>, string> = {
  light: "glass",
  soft: "glass",
  strong: "glass-strong",
  dark: "glass-dark",
  darkStrong: "glass-dark-strong",
};

const radiusMap: Record<NonNullable<GlassPanelProps["rounded"]>, string> = {
  "2xl": "rounded-[2px]",
  "3xl": "rounded-[2px]",
  full: "rounded-[2px]",
};

export default function GlassPanel({
  children,
  className = "",
  tone = "light",
  rounded = "3xl",
}: GlassPanelProps) {
  return <div className={`${toneMap[tone]} ${radiusMap[rounded]} ${className}`}>{children}</div>;
}