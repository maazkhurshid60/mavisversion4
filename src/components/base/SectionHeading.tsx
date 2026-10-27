import type { ReactNode } from "react";
import Reveal from "@/components/base/Reveal";
import Eyebrow from "@/components/base/Eyebrow";

interface SectionHeadingProps {
  /** Chapter folio numeral, e.g. "01". */
  index?: string;
  /** Small phrase sitting above the title. */
  label: string;
  title: ReactNode;
  description?: ReactNode;
  /** "dark" = ink text on paper; "light" = paper text over imagery. */
  tone?: "dark" | "light";
  /** Left-aligned editorial column, or centred like the reference's chapter titles. */
  align?: "left" | "center";
  /** Optional element pinned to the end of the header row (e.g. a "View all" link). */
  actions?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  index,
  label,
  title,
  description,
  tone = "dark",
  align = "left",
  actions,
  className = "",
}: SectionHeadingProps) {
  const isLight = tone === "light";
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "flex flex-col items-center text-center" : ""} ${className}`}>
      <Reveal y={16}>
        <div
          className={`flex flex-wrap items-baseline gap-5 ${
            isCenter ? "justify-center" : "w-full justify-between"
          }`}
        >
          <Eyebrow index={index} tone={isLight ? "light" : "primary"}>
            {label}
          </Eyebrow>
          {actions}
        </div>
      </Reveal>

      <Reveal y={24} delay={90}>
        <h2
          className={`mt-6 font-heading text-[2.2rem] leading-[1.04] tracking-[-0.028em] md:text-[3.05rem] ${
            isCenter ? "mx-auto max-w-3xl" : "max-w-4xl"
          } ${isLight ? "text-background-50" : "text-foreground-950"}`}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal y={20} delay={160}>
          <p
            className={`mt-5 font-body text-[0.95rem] font-light leading-[1.7] ${
              isCenter ? "mx-auto max-w-xl" : "max-w-xl"
            } ${isLight ? "text-background-50/80" : "text-foreground-700"}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}