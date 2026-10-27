import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/base/Reveal";
import Eyebrow from "@/components/base/Eyebrow";
import { useScrollScene } from "@/hooks/useScrollScene";
import { heroMedia } from "@/mocks/home";

/**
 * Prologue: the city chapter.
 *
 * A pinned stage. The footage begins as a narrow letterbox slit and, as you
 * scroll, the mask opens to full bleed while the camera eases its push-in back
 * out. The section is deliberately the only place on the page where the whole
 * frame is footage: it separates the house from the records that follow, and it
 * gives the scroll one long, quiet breath before the detail starts.
 */
export default function CityFilm() {
  const sceneRef = useScrollScene<HTMLElement>("pin");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Decode only while the chapter is actually on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sceneRef}
      id="film"
      aria-label="Prologue: Los Angeles at golden hour"
      className="relative h-[220vh] bg-foreground-950 md:h-[300vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The slit → full bleed frame */}
        <div className="film-mask absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={videoRef}
              className="film-video h-full w-full object-cover object-center"
              poster={heroMedia.poster}
              playsInline
              loop
              muted
              autoPlay
              preload="metadata"
              aria-label="Aerial footage of the Los Angeles skyline at sunset"
            >
              <source src={heroMedia.webm} type="video/webm" />
              <source src={heroMedia.mp4} type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 bg-foreground-950/25" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-foreground-950 via-foreground-950/10 to-foreground-950/45"
            aria-hidden="true"
          />
          <div className="film-frame pointer-events-none absolute inset-0 border border-background-50/25" aria-hidden="true" />
        </div>

        {/* Camera gate: corner marks pinned to the stage */}
        <div className="pointer-events-none absolute inset-5 z-10 hidden md:block" aria-hidden="true">
          <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-background-50/25" />
          <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-background-50/25" />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-background-50/25" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-background-50/25" />
        </div>

        <div
          className="film-scrim pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[62%] bg-gradient-to-t from-foreground-950 via-foreground-950/60 to-transparent"
          aria-hidden="true"
        />

        {/* Copy: sits on the stage, never inside the mask, so it reads at
            every point of the open. */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="relative mx-auto max-w-[1500px] px-4 pb-10 pt-28 md:px-10 md:pb-14">
            <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="max-w-2xl">
                <Reveal y={14}>
                  <Eyebrow tone="light">Prologue</Eyebrow>
                </Reveal>

                <Reveal y={26} delay={90}>
                  <h2 className="mt-5 font-heading text-[1.95rem] leading-[1.06] tracking-[-0.03em] text-background-50 sm:text-[2.45rem] md:text-[3.1rem]">
                    Seven o&apos;clock, and the whole basin turns to brass.
                  </h2>
                </Reveal>

                <Reveal y={20} delay={170}>
                  <p className="mt-6 max-w-lg font-body text-[0.82rem] font-light leading-relaxed text-background-50/70 md:text-sm">
                    Before the listings, the landscape: the canyons, the boulevards, and the light
                    that makes a house worth living in.
                  </p>
                </Reveal>
              </div>

              <Reveal y={20} delay={240} className="lg:shrink-0 lg:pb-1">
                <div className="max-w-xs border-t border-background-50/20 pt-5">
                  <p className="font-label text-[8px] text-background-50/55">Serving</p>
                  <p className="mt-3 font-body text-[0.88rem] font-light leading-[1.7] text-background-50/90">
                    Hollywood Hills · Los Feliz · Silver Lake · Studio City · Sherman Oaks · Toluca
                    Lake
                  </p>
                  <Link
                    to="/communities"
                    className="mt-5 inline-flex cursor-pointer items-center gap-2.5 font-label text-[8px] text-background-50/70 transition-colors hover:text-background-50"
                  >
                    Explore the neighborhoods
                    <i className="ri-arrow-right-line text-[10px]" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Frame progress: the only numeric cue in the chapter */}
        <div className="absolute inset-x-0 bottom-0 z-30 h-px bg-background-50/15" aria-hidden="true">
          <div className="chapter-progress h-full w-full bg-accent-300/80" />
        </div>
      </div>
    </section>
  );
}