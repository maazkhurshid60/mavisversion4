import { Link } from "react-router-dom";
import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import { quickJumpCards } from "@/mocks/home";

export default function QuickJump() {
  return (
    <section id="start-here" className="px-4 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading
          index="02"
          label="Start Here"
          title="Where would you like to begin?"
          align="left"
          className="max-w-3xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {quickJumpCards.map((card, index) => (
            <Reveal key={card.title} index={index} step={150} y={34} className="h-full">
              <Link to={card.to} className="group flex h-full cursor-pointer flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={`${card.title}, Team Medved Los Angeles real estate`}
                    title={`${card.title}, Team Medved`}
                    className="img-push h-full w-full object-cover object-top"
                  />
                  <span className="veil" aria-hidden="true" />
                  <span className="veil-content absolute inset-0 flex items-center justify-center">
                    <span className="btn btn-outline-light inline-flex items-center gap-2 px-6 py-3 btn-label">
                      {card.cta}
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="font-heading text-[1.35rem] leading-[1.2] tracking-[-0.025em] text-foreground-950">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 font-body text-xs font-light leading-relaxed text-foreground-600 md:text-sm">
                    {card.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-body text-[0.85rem] font-light text-foreground-700 transition-colors group-hover:text-accent-700">
                    {card.cta}
                    <i className="ri-arrow-right-line text-[11px] transition-transform duration-500 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}