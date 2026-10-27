import { pressNames } from "@/mocks/home";

const marqueeItems = [...pressNames, ...pressNames];

/**
 * Press ticker — a solid ink band with a centred serif title and the names
 * running continuously behind hairline dividers. Pauses on hover.
 */
export default function PressMarquee() {
  return (
    <section className="overflow-hidden bg-foreground-950 py-14 md:py-20">
      <div className="mx-auto mb-10 flex max-w-[1500px] items-baseline justify-between gap-6 px-4 md:mb-14 md:px-10">
        <h2 className="font-heading text-[1.35rem] tracking-[0.05em] text-background-50 md:text-[1.7rem]">
          As Seen In
        </h2>
        <span className="font-label text-[8px] text-background-50/45">Press &amp; Editorial</span>
      </div>

      <div className="group relative flex overflow-hidden">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {marqueeItems.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="flex items-center whitespace-nowrap"
            >
              <span className="mx-8 font-heading text-[0.95rem] font-medium tracking-[0.01em] text-background-50/70 transition-colors duration-500 hover:text-background-50 md:mx-14 md:text-[1.2rem]">
                {name}
              </span>
              <span className="h-5 w-px bg-background-50/25" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}