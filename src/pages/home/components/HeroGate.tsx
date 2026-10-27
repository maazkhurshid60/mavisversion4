/**
 * The camera gate over the opening title card.
 *
 * Not a decorative box — the markings a camera operator actually uses: a
 * four-sided gate that draws itself open on entry, doubled corner brackets,
 * a focus scale running down both edges, and small registration crosses at
 * the centre of each side. Every mark is built from 1px spans so it stays
 * crisp at any size, and the whole gate contracts a fraction as the scroll
 * takes over — an aperture easing closed, not a border that vanishes.
 */

const EDGE_TICKS = Array.from({ length: 19 }, (_, index) => index);

const CORNERS = ["tl", "tr", "bl", "br"] as const;
const REGISTRATIONS = ["t", "r", "b", "l"] as const;

export default function HeroGate() {
  return (
    <div
      className="hero-gate scene-chrome pointer-events-none absolute left-3 right-3 top-[76px] bottom-[88px] z-10 hidden lg:block"
      aria-hidden="true"
    >
      {/* Gate — four hairlines, each drawn from its own corner outward */}
      <span className="hero-gate__edge hero-gate__edge--top" />
      <span className="hero-gate__edge hero-gate__edge--right" />
      <span className="hero-gate__edge hero-gate__edge--bottom" />
      <span className="hero-gate__edge hero-gate__edge--left" />

      {/* Corner brackets, doubled in bronze — the viewfinder's signature */}
      {CORNERS.map((corner) => (
        <span key={`bracket-${corner}`}>
          <span className={`hero-gate__corner hero-gate__corner--${corner}`} />
          <span className={`hero-gate__corner-inner hero-gate__corner-inner--${corner}`} />
        </span>
      ))}

      {/* Focus scale — long marks every fifth tick */}
      <div className="hero-gate__ticks hero-gate__ticks--left">
        {EDGE_TICKS.map((tick) => (
          <span
            key={`l-${tick}`}
            className={tick % 5 === 0 ? "hero-gate__tick is-major" : "hero-gate__tick"}
          />
        ))}
      </div>
      <div className="hero-gate__ticks hero-gate__ticks--right">
        {EDGE_TICKS.map((tick) => (
          <span
            key={`r-${tick}`}
            className={tick % 5 === 0 ? "hero-gate__tick is-major" : "hero-gate__tick"}
          />
        ))}
      </div>

      {/* Registration crosses — the centre point of each side */}
      {REGISTRATIONS.map((mark) => (
        <span key={`reg-${mark}`} className={`hero-gate__reg hero-gate__reg--${mark}`} />
      ))}

      {/* Frame counter, bottom right of the gate */}
      <span className="hero-gate__counter font-label">01 / 12</span>
    </div>
  );
}