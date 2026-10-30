import { Link } from "react-router-dom";
import Reveal from "@/components/base/Reveal";
import StackPanel from "@/components/base/StackPanel";
import SectionBackdrop from "@/components/base/SectionBackdrop";
import SectionHeading from "@/components/base/SectionHeading";
import ButtonLabel from "@/components/base/ButtonLabel";
import { aboutImage, sectionBackdrops } from "@/mocks/home";

interface AboutUsProps {
  onOpenContact: () => void;
}

export default function AboutUs({ onOpenContact }: AboutUsProps) {
  return (
    <StackPanel
      id="about"
      order={2}
      label="About us"
      className="flex items-center px-4 py-20 md:min-h-[100svh] md:overflow-hidden md:px-10 md:py-16"
    >
      {/*
        The section keeps its original two-column shape: portrait plate on the
        left, copy on the right. What is new is the layer behind it: a full-bleed
        photograph with a slow ken-burns push plus parallax drift, washed back to
        paper so the ink type stays fully readable.
      */}
      <SectionBackdrop
        image={sectionBackdrops.about}
        motion
        wash="bg-background-50/55"
        scrim="bg-gradient-to-r from-background-50/35 via-background-50/75 to-background-50/88"
        tint="bg-gradient-to-b from-background-50/60 via-transparent to-background-50/70"
        speed={0.045}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Imagery: the same square-cut plate, with its small ink caption */}
          <Reveal x={-30} y={0} delay={60}>
            <div className="relative">
              <div className="h-[400px] w-full overflow-hidden sm:h-[520px] md:h-[min(62svh,600px)]">
                <img
                  src={aboutImage}
                  alt="Karen Medved, Los Angeles luxury real estate agent with Team Medved"
                  title="About Team Medved, Los Angeles luxury real estate"
                  className="portrait-push h-full w-full object-cover object-top"
                />
              </div>

              <div className="absolute -bottom-6 right-0 hidden max-w-[260px] bg-foreground-950 px-7 py-6 md:block">
                <p className="font-heading text-[1.4rem] leading-[1.2] tracking-[-0.025em] text-background-50">
                  Twenty-Plus
                </p>
                <p className="mt-2 font-body text-[0.85rem] font-light leading-[1.6] text-background-50/70">
                  Years In Los Angeles Real Estate
                </p>
              </div>
            </div>
          </Reveal>

          {/* Copy: held to a reading measure so the photograph keeps a lane of
              its own down the right-hand edge of the section */}
          <div className="max-w-xl">
            <SectionHeading index="04" label="About Us" title="Team Medved" />

            <Reveal y={24} delay={120}>
              <p className="mt-8 font-body text-sm font-light leading-[1.85] text-foreground-800 md:text-[0.95rem]">
                Best known as well respected, top producing agents in the Lake Hollywood, Los
                Feliz, Silver Lake, Studio City, Valley Village, Sherman Oaks, Toluca Lake, and
                surrounding areas, Team Medved has closed hundreds of transactions for loyal
                clients all across Los Angeles from the hills to the beach and everywhere in
                between.
              </p>
            </Reveal>

            <Reveal y={24} delay={180}>
              <p className="mt-6 font-body text-sm font-light leading-[1.85] text-foreground-800 md:text-[0.95rem]">
                Armed with a broad array of skills and experience cultivated over twenty-plus years
                of closing hundreds of transactions, they pride themselves on approaching every
                transaction as if it were their own in order to achieve the highest and best
                outcome for their clients. This tenacious commitment to achieving results is
                appreciated by clients and colleagues alike.
              </p>
            </Reveal>

            <Reveal y={22} delay={220}>
              <p className="mt-9 font-body text-[0.9rem] font-light leading-[1.75] text-foreground-600">
                Karen Medved
                <span className="mx-2 text-foreground-950/30" aria-hidden="true">
                  /
                </span>
                CA DRE# 01235215
              </p>
            </Reveal>

            <Reveal y={22} delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link
                  to="/about"
                  className="btn btn-fill inline-flex cursor-pointer items-center gap-3 bg-primary-500 px-8 py-4 btn-label text-background-50"
                >
                  <ButtonLabel>Learn More</ButtonLabel>
                  <i className="ri-arrow-right-line btn-arrow text-[11px]" />
                </Link>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="link-underline cursor-pointer btn-label text-foreground-800 transition-colors hover:text-accent-700"
                >
                  Contact Us
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </StackPanel>
  );
}