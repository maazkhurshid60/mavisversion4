/**
 * Ambient page backdrop. A fixed, non-interactive layer behind all content.
 * A flat sheet of warm ivory paper with one barely-there wash of stone at the
 * very top — the matte print feel of the reference, with no colour fields.
 */
export default function BackdropMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background-50" />
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-secondary-100/70 via-background-50/0 to-transparent" />
    </div>
  );
}