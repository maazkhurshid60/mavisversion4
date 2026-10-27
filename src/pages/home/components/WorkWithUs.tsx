import Reveal from "@/components/base/Reveal";
import StackPanel from "@/components/base/StackPanel";
import { useParallax } from "@/hooks/useParallax";
import { heroMedia } from "@/mocks/home";
import ButtonLabel from "@/components/base/ButtonLabel";
import Eyebrow from "@/components/base/Eyebrow";

interface WorkWithUsProps {
  onOpenContact: () => void;
}

/**
 * Closing chapter band.
 * Full-bleed footage under a heavy ink wash, with the statement set centred in
 * Display type and one hairline outline button, the reference's dark divider moment.
 * It is the final panel of the scroll stack, so it rises up and settles over
 * the newsletter band before the feed scrolls past it.
 */
export default function WorkWithUs({ onOpenContact }: WorkWithUsProps) {
  const parallaxRef = useParallax<HTMLDivElement>(0.12);

  return (
    <StackPanel
      id="contact"
      order={5}
      label="Work with us"
      className="flex min-h-[560px] items-center overflow-hidden md:min-h-[100svh]"
    >
      <div
        ref={parallaxRef}
        className="absolute inset-x-0 -top-[15%] -bottom-[15%] will-change-transform"
      >
        <video
          className="h-full w-full animate-ken-burns object-cover object-center"
          poster={heroMedia.poster}
          playsInline
          loop
          muted
          autoPlay
          preload="auto"
          aria-label="Aerial footage of the Los Angeles skyline at sunset, Team Medved luxury real estate"
        >
          <source src={heroMedia.webm} type="video/webm" />
          <source src={heroMedia.mp4} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-foreground-950/72" aria-hidden="true" />

      <Reveal
        y={34}
        className="relative z-20 mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 py-24 text-center md:px-10 md:py-32"
      >
        <Eyebrow index="08" tone="light" centered>
          Work With Us
        </Eyebrow>

        <h2 className="mt-8 font-heading text-[1.95rem] leading-[1.1] tracking-[-0.03em] text-background-50 md:text-[3.3rem]">
          Exceptional service for the world&apos;s most discerning clientele.
        </h2>

        <p className="mx-auto mt-7 max-w-2xl font-body text-sm font-light leading-relaxed text-background-50/75 md:text-[0.95rem]">
          Karen and Julie&apos;s expertise in developing and executing systems to achieve
          exceptional client satisfaction for some of the world&apos;s most discriminating
          clientele was an ideal foundation for a career in Los Angeles real estate.
        </p>

        <button
          type="button"
          onClick={onOpenContact}
          className="btn btn-outline-light mt-10 inline-flex cursor-pointer items-center gap-3 px-9 py-4 btn-label"
        >
          <ButtonLabel>Contact Us</ButtonLabel>
          <i className="ri-arrow-right-line btn-arrow text-[11px]" />
        </button>
      </Reveal>
    </StackPanel>
  );
}