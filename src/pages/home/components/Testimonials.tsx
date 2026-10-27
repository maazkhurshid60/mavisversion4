import { useState } from "react";
import Reveal from "@/components/base/Reveal";
import StackPanel from "@/components/base/StackPanel";
import SectionBackdrop from "@/components/base/SectionBackdrop";
import Eyebrow from "@/components/base/Eyebrow";
import { sectionBackdrops, testimonials } from "@/mocks/home";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const current = testimonials[active];

  const go = (direction: 1 | -1) => setActive((prev) => (prev + direction + total) % total);

  return (
    <StackPanel
      id="testimonials"
      order={3}
      label="Client stories"
      className="flex items-center border-t border-background-50/15 px-4 py-20 md:min-h-[100svh] md:overflow-hidden md:px-10 md:py-16"
    >
      {/* The photograph stays genuinely visible — contrast comes from an ink
          scrim that thickens only behind the type, never from a paper blanket. */}
      <SectionBackdrop
        image={sectionBackdrops.testimonials}
        wash="bg-foreground-950/35"
        scrim="bg-gradient-to-r from-foreground-950/85 via-foreground-950/60 to-foreground-950/30"
        tint="bg-gradient-to-t from-foreground-950/65 via-transparent to-foreground-950/25"
        speed={0.05}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-12 lg:grid-cols-[0.62fr_1.4fr] lg:gap-24">
        <div>
          <Reveal y={16}>
            <Eyebrow index="06" tone="light">
              Client Stories
            </Eyebrow>
          </Reveal>

          <Reveal y={24} delay={90}>
            <h2 className="mt-6 font-heading text-[2.2rem] leading-[1.02] tracking-[-0.03em] text-background-50 md:text-[3.05rem]">
              Testimonials
            </h2>
          </Reveal>

          <Reveal y={20} delay={160}>
            <p className="mt-6 max-w-sm font-body text-sm font-light leading-relaxed text-background-50/70">
              A few words from the families, buyers, and investors we&apos;ve helped move across
              Los Angeles.
            </p>
          </Reveal>

          <Reveal y={20} delay={220}>
            <div className="mt-10 flex items-center gap-5">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="text-arrows cursor-pointer text-background-50/60 transition-colors hover:text-background-50"
                >
                  <i className="ri-arrow-left-line text-xs" />
                  Previous
                </button>
                <span
                  className="h-[0.7rem] w-px bg-background-50/30"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="text-arrows cursor-pointer text-background-50/60 transition-colors hover:text-background-50"
                >
                  Next
                  <i className="ri-arrow-right-line text-xs" />
                </button>
              </div>
              <span className="font-body text-[11px] tabular-nums text-background-50/40">
                {String(active + 1).padStart(2, "0")}
                <span className="mx-1.5">/</span>
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal y={28} delay={120}>
          <figure className="lg:pt-2">
            <blockquote
              key={`quote-${active}`}
              className="animate-fade-up font-heading text-[1.45rem] leading-[1.45] tracking-[-0.02em] text-background-50 md:text-[1.85rem]"
            >
              <span className="mr-2 align-top font-heading text-2xl text-background-50/45 md:text-3xl">
                &ldquo;
              </span>
              {current.quote}
            </blockquote>

            <figcaption key={`meta-${active}`} className="mt-9 animate-fade-up">
              <span
                className="mr-2 inline-block h-px w-8 translate-y-[-3px] bg-background-50/35"
                aria-hidden="true"
              />
              <span className="font-body text-xs text-background-50/90">{current.name}</span>
              <span className="mt-2 block font-label text-[9px] text-background-50/55">
                {current.role} · {current.location}
              </span>
            </figcaption>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-background-50/20 pt-6">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`cursor-pointer font-label text-[9px] transition-colors ${
                    index === active
                      ? "text-background-50"
                      : "text-background-50/35 hover:text-background-50/75"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </figure>
        </Reveal>
      </div>
    </StackPanel>
  );
}