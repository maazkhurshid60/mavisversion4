# Team Medved — Website Redesign Plan

## 1. Project Description
Redesign of the Team Medved website (teammedved.net) — a Los Angeles luxury real estate
team led by Karen Medved, affiliated with Compass California, Inc.

- **Positioning:** Boutique, relationship-driven luxury real estate team.
- **Target users:** LA buyers and sellers (Hollywood Hills, Lake Hollywood, Studio City,
  Valley Village, Sherman Oaks, Toluca Lake and surrounding areas), plus relocation and
  investment clients.
- **Core value:** Local expertise, a curated listing portfolio, a strong neighborhood
  guide system, and a clear path to a free home valuation.

**Source of truth:** existing sections, existing content, existing imagery and existing
brand colors from the current website. The redesign elevates presentation, hierarchy, UX
and visual quality while keeping the brand identity intact.

## 1.1 Brand & Design System
- **Palette (Version 3 revision — client feedback):** the client reported that the cool
  white + teal reading felt clinical ("like a medical office") and asked for a warmer,
  hospitality-driven direction based on the brockandlori.com reference. Current palette:
  **warm ivory paper** (`background`), **deep warm espresso ink** as the primary for
  filled buttons and dark chapter bands (`primary`), a **muted bronze** accent
  (`accent`, for rules, hovers and small marks), a **warm stone / greige** secondary
  (`secondary`) and a warm near-black ink (`foreground`). Zero teal. All colors are
  StyleSystem OKLCH scale tokens consumed via `oklch(var(--token))`.
- **Typography:** *Bodoni Moda* for headings (high-contrast Didone, the reference voice),
  paired with *Jost* for body, navigation, buttons and labels. Small labels are uppercase
  with wide tracking.
- **Assets:** real brand assets from the live site — the LA skyline sunset **video**,
  the Team Medved **logo** (light + dark variants), real property photography, real
  neighborhood imagery, the team group photo and the Compass mark.
- **Layout direction (Version 3 — "warm editorial"):** matte ivory paper with hairline
  rules instead of frosted glass. No pills, no large radii: photographic plates are
  square-cut, buttons are 4px. Centred serif chapter titles, black label tabs on listing
  cards, and a solid ink press ticker. Version 4 adds the pinned chapter stack and
  photographic section backdrops on top of that same editorial language.
- **Motion:** long, soft scroll reveals (~1.1s, 30px rise, cubic-bezier(0.16,1,0.3,1)),
  hover veils on every photograph that hand over to one hairline button, slow 1.6s image
  push, upward-sweeping deeper-ink button fills, rolling button labels, thin
  "previous | next" text arrows, a continuous press ticker, ken-burns and parallax on
  the dark footage chapter.
- **Scroll stack (Version 4):** the closing chapters — Testimonials → Newsletter →
  Work With Us — are pinned full-viewport panels. Each one sticks at the top and the
  next rides up over it, while the covered panel eases back 4.5% and dims via a
  scroll-linked veil (`--stack-progress`). Desktop only; phones keep normal flow.
- **Image-backed sections (Version 4):** the record band, the testimonials band and the
  newsletter band carry full-bleed photographic backdrops under a heavy paper wash,
  drifting on a slow parallax — the reference's layered-chapter feel without losing
  legibility.
- **Media placement:** the LA skyline **video lives in the "Work With Us" chapter**
  (full-bleed, parallax, ken-burns); the hero uses a full-bleed architectural photograph
  with a warm ink scrim and centred type, followed by a paper featured-listing strip.

### 1.2 Version 5 — the cinematic reel
The home page is now cut like a short film rather than a stack of sections.
- **Reel grammar:** the page is divided into twelve numbered chapters; a fixed chapter
  rail down the right margin tracks the position, flips between ink and paper depending
  on the tone of the chapter beneath it, and travels on click.
- **Opening title card:** the header opens transparent over the hero and only becomes
  paper once you scroll. The hero is a full-bleed plate with a slate, frame hairlines and
  a bottom ledger. Scroll drives a single unitless variable (`--p`) that pushes the plate
  in and down while the type lifts and releases — a dolly-out, not a fade.
- **Prologue film chapter:** a pinned stage where the skyline footage starts as a narrow
  letterbox slit and the mask opens to full bleed as the camera eases back out of its
  push-in. Copy sits on the stage (not inside the mask) so it reads at every point.
- **Now Showing:** the featured-listing band becomes the first paper beat after the film —
  portrait plate, oversized record, and a tick strip showing the position in the reel.
- **Portfolio:** a sticky chapter column beside portrait plates on an offset two-column
  grid, so the heading holds still while the houses travel past it.
- **Section rhythm:** pinned stack panels (record, about, testimonials, newsletter, work
  with us) are unchanged in mechanics but now sit inside the numbered reel.
- **Accessibility:** every scroll scene is a pure compositor transform derived from one
  variable, disabled entirely under `prefers-reduced-motion`; the film chapter loses its
  mask and plays full frame instead.

## 2. Page Structure
- `/` - Home
- `/about` - Meet the Team
- `/our-community` - Our Community
- `/properties/sale` - Featured Listings
- `/properties/lease` - For Leases
- `/properties/sold` - Sold Listings
- `/properties/leased` - Leased Properties
- `/properties/:slug` - Property Detail
- `/buyers-guide` - Buyer's Guide
- `/sellers-guide` - Seller's Guide
- `/communities` - Neighborhoods
- `/neighborhoods/:slug` - Neighborhood Detail
- `/home-valuation` - Home Valuation
- `/testimonials` - Testimonials
- `/contact` - Contact Us
- `/terms-and-conditions` - Privacy Policy

## 3. Core Features
- [x] Global header nav with slide-out sidebar menu
- [x] Global contact modal
- [x] Home page (hero, stats, quick-jump, featured listings, about, buy/sell, neighborhoods,
      newsletter, work-with-us, instagram, footer)
- [ ] Listings index + property detail
- [ ] Neighborhood directory + neighborhood detail
- [ ] Buyer's & Seller's guides
- [ ] Home valuation tool
- [ ] Testimonials + Contact page
- [ ] Our Community page

## 4. Data Model Design
No Supabase database required. This is a marketing/brochure site.
- Contact inquiries and newsletter signups are handled by the built-in Form service.
- Listings and neighborhood content are static content managed in front-end data files.

## 5. Backend / Third-party Integration Plan
- Database: not required — static content + built-in Form service.
- Shopify: not needed.
- Stripe / Toss / PayPal: not needed.
- Form: used for the header Contact Us modal and the home page Newsletter signup.
- Others: none.

## 6. Development Phase Plan

### Phase 1: Home Page
- Goal: Rebuild the full Team Medved home page with the elevated champagne brand design system.
- Deliverable: Design tokens (warm sand/champagne palette + Cormorant/Onest typography),
  global header (real logo) / footer / contact modal, a real-video hero, and all home page
  sections in the exact existing order using the real brand imagery.

### Phase 2: Meet the Team + Our Community
- Goal: Team credibility pages.
- Deliverable: About page with Karen's bio and past-sales carousel; Community page.

### Phase 3: Properties
- Goal: Listing discovery.
- Deliverable: Sale / Lease / Sold / Leased index pages and the property detail template.

### Phase 4: Buyers & Sellers Guides
- Goal: Educational lead-capture content.
- Deliverable: Buyer's Guide and Seller's Guide pages.

### Phase 5: Neighborhoods
- Goal: Local SEO depth.
- Deliverable: Neighborhood directory and the neighborhood detail template.

### Phase 6: Conversion Pages
- Goal: Valuation, social proof and contact.
- Deliverable: Home Valuation, Testimonials and Contact pages.