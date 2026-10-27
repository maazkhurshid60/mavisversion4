import { useParallax } from "@/hooks/useParallax";

interface SectionBackdropProps {
  image: string;
  /** Parallax travel — smaller means quieter. */
  speed?: number;
  /**
   * Object-position utility for the photograph, e.g. "object-top" for a
   * portrait crop. The image is always `object-cover`, never stretched.
   */
  position?: string;
  /**
   * Base veil. Keep the alpha low (0.15 – 0.35) so the photograph stays a real
   * photograph instead of turning into pale paper.
   */
  wash?: string;
  /**
   * Directional scrim placed only where the type sits. This — not a flat white
   * wash — is what guarantees legibility.
   */
  scrim?: string;
  /** Optional final tint (warm ink or paper) painted above the scrim. */
  tint?: string;
  /**
   * Adds a very slow ken-burns push to the photograph itself. The parallax
   * translate stays on the wrapper, so the two never fight each other.
   */
  motion?: boolean;
}

/**
 * Full-bleed photographic backdrop with a slow parallax drift.
 *
 * Layers, bottom to top:
 *   1. the photograph, in an over-sized frame so the translate never shows an edge
 *   2. a light base wash — this sets the overall tone without killing the image
 *   3. a directional scrim — concentrated contrast under the type
 *   4. an optional tint
 */
export default function SectionBackdrop({
  image,
  speed = 0.06,
  wash = "bg-background-50/25",
  scrim = "",
  tint = "",
  position = "",
  motion = false,
}: SectionBackdropProps) {
  const layerRef = useParallax<HTMLDivElement>(speed);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        ref={layerRef}
        className="absolute inset-x-0 -top-[14%] -bottom-[14%] will-change-transform"
      >
        <img
          src={image}
          alt=""
          className={`h-full w-full object-cover object-center ${position} ${
            motion ? "animate-ken-burns" : ""
          }`}
        />
      </div>
      <div className={`absolute inset-0 ${wash}`} />
      {scrim ? <div className={`absolute inset-0 ${scrim}`} /> : null}
      {tint ? <div className={`absolute inset-0 ${tint}`} /> : null}
    </div>
  );
}