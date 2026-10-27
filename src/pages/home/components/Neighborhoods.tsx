import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import { neighborhoods } from "@/mocks/home";

export default function Neighborhoods() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 20 : 360;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const travel = track.scrollWidth - track.clientWidth;
    setProgress(travel > 0 ? track.scrollLeft / travel : 0);
  };

  return (
    <section id="neighborhoods" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 md:px-10">
        <SectionHeading
          index="05"
          label="Where We Live"
          title="Neighborhoods"
          description="From the hills above Hollywood to the tree-lined streets of the valley, explore the communities Team Medved knows by heart."
          actions={
            <div className="hidden items-center gap-7 md:flex">
              <Link
                to="/communities"
                className="link-underline cursor-pointer whitespace-nowrap font-body text-[0.85rem] font-light text-foreground-800 transition-colors hover:text-foreground-950"
              >
                View All
              </Link>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Previous neighborhoods"
                  onClick={() => scrollByCard(-1)}
                  className="text-arrows cursor-pointer text-foreground-600 transition-colors hover:text-foreground-950"
                >
                  <i className="ri-arrow-left-line text-xs" />
                  Previous
                </button>
                <span className="text-arrows__sep" aria-hidden="true" />
                <button
                  type="button"
                  aria-label="Next neighborhoods"
                  onClick={() => scrollByCard(1)}
                  className="text-arrows cursor-pointer text-foreground-600 transition-colors hover:text-foreground-950"
                >
                  Next
                  <i className="ri-arrow-right-line text-xs" />
                </button>
              </div>
            </div>
          }
        />
      </div>

      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        className="no-scrollbar mt-12 flex snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 md:px-10"
        style={{ scrollbarWidth: "none" }}
      >
        {neighborhoods.map((hood, index) => (
          <Reveal
            key={hood.slug}
            index={index}
            step={100}
            y={26}
            className="w-[260px] shrink-0 snap-start md:w-[330px]"
          >
            <Link to={`/neighborhoods/${hood.slug}`} className="group block cursor-pointer">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src={hood.image}
                  alt={`${hood.name} neighborhood guide. Team Medved Los Angeles real estate`}
                  title={`${hood.name}, Team Medved`}
                  className="img-push h-full w-full object-cover object-top"
                />
                <span className="veil" aria-hidden="true" />
                <span className="veil-content absolute inset-0 flex items-center justify-center">
                  <span className="btn btn-outline-light inline-flex items-center gap-2 px-5 py-3 btn-label">
                    Explore
                    <i className="ri-arrow-right-up-line text-xs" />
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4">
                <h3 className="font-heading text-[1.15rem] leading-[1.2] tracking-[-0.02em] text-foreground-950">
                  {hood.name}
                </h3>
                <i className="ri-arrow-right-up-line text-foreground-500 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-700" />
              </div>
              <span
                className="mt-3 block h-px w-full origin-left scale-x-100 bg-foreground-950/12 transition-colors duration-500 group-hover:bg-foreground-950/40"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-3 max-w-[1500px] px-4 md:px-10">
        <div className="h-px w-full bg-foreground-950/12" aria-hidden="true">
          <div
            className="h-full bg-accent-600 transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(6, progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[1500px] items-center gap-4 px-4 md:hidden md:px-10">
        <Link
          to="/communities"
          className="link-underline cursor-pointer whitespace-nowrap font-body text-[0.85rem] font-light text-foreground-800"
        >
          View All
        </Link>
        <button
          type="button"
          aria-label="Previous neighborhoods"
          onClick={() => scrollByCard(-1)}
          className="text-arrows cursor-pointer text-foreground-600"
        >
          <i className="ri-arrow-left-line text-xs" />
        </button>
        <span className="text-arrows__sep" aria-hidden="true" />
        <button
          type="button"
          aria-label="Next neighborhoods"
          onClick={() => scrollByCard(1)}
          className="text-arrows cursor-pointer text-foreground-600"
        >
          <i className="ri-arrow-right-line text-xs" />
        </button>
      </div>
    </section>
  );
}