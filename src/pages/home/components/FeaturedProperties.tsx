import { Link } from "react-router-dom";
import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import ButtonLabel from "@/components/base/ButtonLabel";
import { featuredProperties } from "@/mocks/home";

/**
 * Portfolio.
 *
 * The chapter heading holds still in its own column while the plates scroll
 * past it: the one section on the page where the camera stops moving and you
 * simply look at the houses. Portrait crops, index numerals and a hairline
 * record under each plate keep it closer to a monograph than a listings grid.
 */
export default function FeaturedProperties() {
  return (
    <section id="portfolio" className="px-4 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[120px]">
              <SectionHeading
                index="03"
                label="Portfolio"
                title="Featured Properties"
                align="left"
                description="A rotating selection of the homes we are representing right now, from canyon contemporaries to valley estates."
              />

              <Reveal y={18} delay={220}>
                <div className="mt-9 hidden items-end gap-4 lg:flex">
                  <span className="font-heading text-[2.15rem] leading-none tracking-[-0.03em] text-foreground-950">
                    {String(featuredProperties.length).padStart(2, "0")}
                  </span>
                  <span className="pb-1.5 font-body text-[0.78rem] font-light text-foreground-500">
                    residences in the current reel
                  </span>
                </div>
              </Reveal>

              <Reveal y={18} delay={260}>
                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Link
                    to="/properties/sale"
                    className="btn btn-outline inline-flex cursor-pointer items-center gap-3 px-8 py-4 btn-label"
                  >
                    <ButtonLabel>View All Properties</ButtonLabel>
                    <i className="ri-arrow-right-line btn-arrow text-[11px]" />
                  </Link>
                  <Link
                    to="/properties/lease"
                    className="link-underline cursor-pointer whitespace-nowrap font-body text-[0.8rem] font-light text-foreground-700 transition-colors hover:text-foreground-950"
                  >
                    For lease
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div data-product-shop className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-x-8">
              {featuredProperties.map((property, index) => (
                <Reveal
                  key={property.id}
                  index={index}
                  step={120}
                  y={34}
                  className={index % 2 === 1 ? "sm:mt-14" : ""}
                >
                  <Link to={`/properties/${property.id}`} className="group block cursor-pointer">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary-200">
                      <img
                        src={property.image}
                        alt={`${property.name}, ${property.address}. Luxury home listed by Team Medved`}
                        title={`${property.name}, ${property.address}`}
                        className="img-push h-full w-full object-cover object-center"
                      />
                      <span className="absolute left-0 top-0 bg-foreground-950 px-3 py-1.5 font-label text-[9px] text-background-50">
                        {property.tag}
                      </span>
                      <span className="absolute right-0 top-0 bg-background-50/[0.92] px-3 py-1.5 text-[0.62rem] font-medium tracking-[0.16em] text-foreground-800">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="veil" aria-hidden="true" />
                      <span className="veil-content absolute inset-0 flex items-center justify-center">
                        <span className="btn btn-outline-light inline-flex items-center gap-2 px-5 py-3 btn-label">
                          View Property
                          <i className="ri-arrow-right-up-line text-[11px]" />
                        </span>
                      </span>
                    </div>

                    <div className="pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-heading text-[1.35rem] leading-snug text-foreground-950 md:text-[1.5rem]">
                          {property.name}
                        </h3>
                        <i className="ri-arrow-right-up-line mt-1 shrink-0 text-foreground-500 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-700" />
                      </div>

                      <p className="mt-2 font-body text-[11px] font-light leading-relaxed text-foreground-600 md:text-xs">
                        {property.address}
                        {property.meta ? ` · ${property.meta}` : ""}
                      </p>

                      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-foreground-950/12 pt-3">
                        <span className="font-heading text-[0.98rem] font-medium tracking-[-0.01em] text-foreground-950">
                          {property.price}
                        </span>
                        <span className="font-label text-[8px] text-foreground-500">
                          Los Angeles
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}