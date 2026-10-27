import Reveal from "@/components/base/Reveal";
import StackPanel from "@/components/base/StackPanel";
import SectionBackdrop from "@/components/base/SectionBackdrop";
import Eyebrow from "@/components/base/Eyebrow";
import { useCountUp } from "@/hooks/useCountUp";
import { homeStats, sectionBackdrops } from "@/mocks/home";

interface ParsedStat {
  prefix: string;
  number: number;
  suffix: string;
}

function parseStat(raw: string): ParsedStat {
  const match = raw.match(/^(\D*)([\d.,]+)(\D*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw };
  return {
    prefix: match[1] ?? "",
    number: Number(match[2].replace(/[,]/g, "")) || 0,
    suffix: match[3] ?? "",
  };
}

function StatCard({ raw, label, index }: { raw: string; label: string; index: number }) {
  const parsed = parseStat(raw);
  const { ref, value } = useCountUp(parsed.number);

  return (
    <Reveal index={index} step={140} y={26} className="h-full">
      <div
        className={`flex h-full flex-col justify-between py-8 md:py-2 ${
          index === 0 ? "md:pl-0 md:pr-12" : index === 1 ? "md:px-12" : "md:pl-12 md:pr-0"
        }`}
      >
        <span
          ref={ref}
          className="font-heading text-[2.9rem] leading-none tracking-[-0.03em] text-foreground-950 md:text-[3.7rem]"
        >
          {parsed.prefix}
          {value}
          {parsed.suffix}
        </span>
        <p className="mt-5 font-label text-[9px] text-foreground-600">{label}</p>
      </div>
    </Reveal>
  );
}

export default function StatsBand() {
  return (
    <StackPanel
      id="track-record"
      order={1}
      label="Track record"
      className="flex items-center px-4 py-20 md:min-h-[100svh] md:overflow-hidden md:px-10 md:py-16"
    >
      {/* Full-bleed photograph for the pinned chapter. The panel locks to the
          viewport, then the following sections ride up over it. */}
      <SectionBackdrop
        image={sectionBackdrops.stats}
        wash="bg-background-50/20"
        scrim="bg-gradient-to-r from-background-50/45 via-transparent to-background-50/45"
        speed={0.045}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="border border-foreground-950/12 bg-background-50 px-6 py-9 shadow-2xl shadow-foreground-950/25 md:px-12 md:py-14">
          <Reveal y={16}>
            <Eyebrow index="01">Track Record</Eyebrow>
          </Reveal>

          <div className="mt-4 grid grid-cols-1 divide-y divide-foreground-950/12 md:grid-cols-3 md:divide-x md:divide-y-0">
            {homeStats.map((stat, index) => (
              <StatCard key={stat.label} raw={stat.value} label={stat.label} index={index} />
            ))}
          </div>
        </div>
      </div>
    </StackPanel>
  );
}