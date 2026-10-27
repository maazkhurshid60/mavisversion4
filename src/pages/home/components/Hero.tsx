import { Link } from "react-router-dom";
import { heroShowcase } from "@/mocks/home";
import Reveal from "@/components/base/Reveal";
import Eyebrow from "@/components/base/Eyebrow";
import ButtonLabel from "@/components/base/ButtonLabel";
import { useScrollScene } from "@/hooks/useScrollScene";
import HeroGate from "@/pages/home/components/HeroGate";

/**
 * Opening title card.
 *
 * One photograph, one name, and the camera doing the work. As you scroll the
 * plate pushes in and drifts down while the type lifts and releases, a slow
 * dolly-out rather than a page transition. Corner slate, frame hairlines and a
 * bottom ledger give it the grammar of a film title sequence without ever
 * obscuring the architecture.
 */
export default function Hero() {
  const sceneRef = useScrollScene<HTMLElement>("cover");

  return (
    <section
      ref={sceneRef}
      id="opening"
      aria-label="Opening"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-foreground-950"
    >
      {/* Plate: the photograph is the scene, the scroll is the camera */}
      <div className="scene-media absolute inset-0 -z-20">
        <img
          src={heroShowcase.background}
          alt="Modern minimalist Los Angeles hillside villa at cool dusk, white concrete and charcoal steel forms above a still infinity pool with soft neutral light glowing through floor-to-ceiling glass, Team Medved real estate"
          title="Team Medved, modern Los Angeles architecture at dusk"
          className="h-full w-full animate-ken-burns object-cover object-center"
        />
      </div>

      {/* Ink: deep enough for the type, light enough to keep the architecture */}
      <div className="absolute inset-0 -z-10 bg-foreground-950/46" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground-950 via-foreground-950/18 to-foreground-950/62"
        aria-hidden="true"
      />

      {/* The camera gate: brackets, focus scale, registration marks */}
      <HeroGate />

      {/* Slate: top corners, like the head of a reel */}
      <div className="scene-chrome pointer-events-none absolute inset-x-0 top-[92px] z-10 hidden md:block">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-10 font-label text-[8px] text-background-50/55">
          <span>Reel 01 · Los Angeles</span>
          <span className="hidden lg:inline">34.0983° N / 118.3267° W</span>
        </div>
      </div>

      <div className="scene-copy relative z-10 flex flex-1 items-center pt-[84px] md:pt-[104px]">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-12 text-center md:px-10 md:py-16">
          <Reveal y={16}>
            <Eyebrow tone="light" centered>
              Los Angeles Luxury Real Estate
            </Eyebrow>
          </Reveal>

          <Reveal y={30} delay={120}>
            <h1
              className="mx-auto mt-7 font-heading text-[3rem] leading-[0.94] tracking-[-0.04em] text-background-50 sm:text-[4.4rem] md:text-[6rem] lg:text-[7.4rem] xl:text-[8.1rem]"
              spellCheck={false}
            >
              Team Medved
            </h1>
          </Reveal>

          <Reveal y={22} delay={220}>
            <p className="mx-auto mt-7 max-w-xl font-body text-[0.98rem] font-normal leading-[1.55] tracking-[0.012em] text-background-50/80 md:text-[1.14rem]">
              The hills, the valley, and the water in between.
            </p>
          </Reveal>

          <Reveal y={24} delay={300}>
            <p className="mx-auto mt-6 max-w-xl font-body text-[0.85rem] font-normal leading-[1.75] text-background-50/70 md:max-w-2xl md:text-[0.9rem]">
              Top producing agents representing homes across Lake Hollywood, Los Feliz, Silver
              Lake, Studio City, Valley Village, Sherman Oaks and Toluca Lake.
            </p>
          </Reveal>

          <Reveal y={24} delay={380}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/properties/sale"
                className="btn btn-paper inline-flex w-full cursor-pointer items-center justify-center gap-3 whitespace-nowrap bg-background-50 px-9 py-4 btn-label text-foreground-950 sm:w-auto"
              >
                <ButtonLabel>Browse Properties</ButtonLabel>
                <i className="ri-arrow-right-line btn-arrow text-sm" />
              </Link>
              <Link
                to="/home-valuation"
                className="btn btn-outline-light inline-flex w-full cursor-pointer items-center justify-center gap-3 whitespace-nowrap px-9 py-4 btn-label sm:w-auto"
              >
                <ButtonLabel>Home Valuation</ButtonLabel>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Ledger: the bottom edge of the frame */}
      <div className="hero-ledger scene-copy relative z-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between md:px-10 md:py-7">
          <div className="flex items-center gap-3">
            <span className="relative flex h-8 w-px overflow-hidden bg-background-50/20" aria-hidden="true">
              <span className="scroll-cue block h-full w-full bg-accent-300" />
            </span>
            <span className="font-label text-[8px] text-background-50/60">Scroll to enter</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-baseline gap-2.5">
              <span className="font-heading text-[0.95rem] font-medium tracking-[-0.01em] text-background-50">500+</span>
              <span className="font-body text-[0.78rem] font-normal text-background-50/60">
                Homes Sold
              </span>
            </div>
            <span className="hidden h-4 w-px bg-background-50/25 sm:block" aria-hidden="true" />
            <div className="flex items-baseline gap-2.5">
              <span className="font-heading text-[0.95rem] font-medium tracking-[-0.01em] text-background-50">2004</span>
              <span className="font-body text-[0.78rem] font-normal text-background-50/60">
                Established
              </span>
            </div>
            <span className="hidden h-4 w-px bg-background-50/25 sm:block" aria-hidden="true" />
            <a
              href="tel:+13102664236"
              className="link-underline font-label text-[8px] text-background-50/70 transition-colors hover:text-background-50"
            >
              (310) 266-4236
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}