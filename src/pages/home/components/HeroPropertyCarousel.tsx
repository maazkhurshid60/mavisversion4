import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { featuredProperties } from "@/mocks/home";
import ButtonLabel from "@/components/base/ButtonLabel";

const AUTOPLAY_MS = 7000;
const TOTAL = featuredProperties.length;

/**
 * Now showing.
 *
 * The first paper beat after the film: one listing at a time, portrait plate on
 * the left and the record set large on the right, with a tick strip beneath so
 * you can see how many are in the reel. Autoplay pauses on hover and on focus.
 */
export default function HeroPropertyCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setIndex(((next % TOTAL) + TOTAL) % TOTAL);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % TOTAL);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = featuredProperties[index];

  return (
    <section
      aria-label="Featured listings"
      className="border-b border-foreground-950/12 bg-background-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-10 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground-950/12 pb-5">
          <div className="flex items-baseline gap-4">
            <span className="font-label text-[9px] text-foreground-700">Now Showing</span>
            <span className="font-body text-[11px] tabular-nums text-foreground-500">
              {String(index + 1).padStart(2, "0")}
              <span className="mx-1.5 opacity-50">/</span>
              {String(TOTAL).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Show previous featured listing"
              className="text-arrows cursor-pointer text-foreground-600 transition-colors hover:text-foreground-950"
            >
              <i className="ri-arrow-left-line text-xs" />
              Previous
            </button>
            <span className="text-arrows__sep" aria-hidden="true" />
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Show next featured listing"
              className="text-arrows cursor-pointer text-foreground-600 transition-colors hover:text-foreground-950"
            >
              Next
              <i className="ri-arrow-right-line text-xs" />
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {featuredProperties.map((property) => {
              const isActive = current.id === property.id;
              return (
                <Link
                  key={property.id}
                  to={`/properties/${property.id}`}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  className="group grid w-full shrink-0 cursor-pointer grid-cols-1 items-center gap-7 md:grid-cols-[280px_1fr] md:gap-9 lg:grid-cols-[400px_1fr] lg:gap-12"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[4/5] md:h-[340px] lg:h-[400px]">
                    <img
                      src={property.image}
                      alt={`${property.name}, ${property.address}. Luxury home listed by Team Medved`}
                      title={`${property.name}, ${property.address}`}
                      className="img-push h-full w-full object-cover object-top"
                    />
                    <span className="absolute left-0 top-0 bg-foreground-950 px-3 py-1.5 font-label text-[9px] text-background-50">
                      {property.tag}
                    </span>
                    <span className="veil" aria-hidden="true" />
                    <span className="veil-content absolute inset-0 flex items-center justify-center">
                      <span className="btn btn-outline-light inline-flex items-center gap-2 px-5 py-3 btn-label">
                        View Property
                        <i className="ri-arrow-right-line text-[11px]" />
                      </span>
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-col justify-center">
                    <span className="font-body text-[0.64rem] font-medium tracking-[0.16em] text-accent-700">
                      {String(index + 1).padStart(2, "0")} / Featured
                    </span>
                    <h3 className="mt-4 max-w-xl font-heading text-[1.55rem] leading-[1.12] tracking-[-0.03em] text-foreground-950 md:text-[1.8rem] lg:text-[2.45rem]">
                      {property.name}
                    </h3>
                    <p className="mt-4 font-body text-xs font-light leading-relaxed text-foreground-600 md:text-sm">
                      {property.address}
                      {property.meta ? ` · ${property.meta}` : ""}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-foreground-950/12 pt-6">
                      <span className="font-heading text-[1.1rem] font-medium tracking-[-0.015em] text-foreground-950 md:text-[1.3rem]">
                        {property.price}
                      </span>
                      <span className="inline-flex items-center gap-2.5 btn-label text-foreground-700 transition-colors group-hover:text-accent-700">
                        <ButtonLabel>View Property</ButtonLabel>
                        <i className="ri-arrow-right-line btn-arrow text-[11px]" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Reel ticks */}
        <div className="mt-8 flex items-center gap-2" aria-hidden="true">
          {featuredProperties.map((property, i) => (
            <span
              key={property.id}
              className={`h-px transition-all duration-700 ${
                i === index
                  ? "w-12 bg-foreground-950"
                  : "w-6 bg-foreground-950/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}