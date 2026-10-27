import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logos } from "@/mocks/home";
import ButtonLabel from "@/components/base/ButtonLabel";

interface NavbarProps {
  onOpenContact: () => void;
}

interface NavItem {
  label: string;
  to: string;
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Properties",
    items: [
      { label: "Featured Listings", to: "/properties/sale" },
      { label: "For Leases", to: "/properties/lease" },
      { label: "Sold Listings", to: "/properties/sold" },
      { label: "Leased Properties", to: "/properties/leased" },
    ],
  },
  {
    label: "Buyers & Sellers",
    items: [
      { label: "Buyer's Guide", to: "/buyers-guide" },
      { label: "Seller's Guide", to: "/sellers-guide" },
    ],
  },
];

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleContact = () => {
    setMenuOpen(false);
    onOpenContact();
  };

  const linkBase =
    "link-underline font-body text-[13px] font-normal tracking-[0.01em] transition-colors";

  // Over the opening title card the header is part of the film: no plate, no
  // border, light type. The moment you scroll into the reel it becomes paper.
  const overHero = location.pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-700 ${
          overHero
            ? "border-background-50/15 bg-transparent"
            : "border-foreground-950/12 bg-background-50/95 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between gap-6 px-4 md:h-[84px] md:px-10">
          <Link to="/" className="flex items-center" aria-label="Team Medved home">
            <img
              src={overHero ? logos.light : logos.dark}
              alt="Team Medved, Los Angeles luxury real estate"
              className="h-7 w-auto max-w-[170px] object-contain transition-opacity duration-500 md:h-8"
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            <Link
              to="/about"
              className={`${linkBase} ${
                overHero
                  ? "text-background-50/80 hover:text-background-50"
                  : "text-foreground-800 hover:text-foreground-950"
              }`}
            >
              Meet the Team
            </Link>
            <Link
              to="/properties/sale"
              className={`${linkBase} ${
                overHero
                  ? "text-background-50/80 hover:text-background-50"
                  : "text-foreground-800 hover:text-foreground-950"
              }`}
            >
              Featured Listings
            </Link>
            <Link
              to="/communities"
              className={`${linkBase} ${
                overHero
                  ? "text-background-50/80 hover:text-background-50"
                  : "text-foreground-800 hover:text-foreground-950"
              }`}
            >
              Neighborhoods
            </Link>
            <a
              href="tel:+13102664236"
              className={`${linkBase} ${
                overHero
                  ? "text-background-50/80 hover:text-background-50"
                  : "text-foreground-800 hover:text-foreground-950"
              }`}
            >
              (310) 266-4236
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleContact}
              className={`btn hidden cursor-pointer items-center justify-center px-6 py-3 btn-label md:inline-flex ${
                overHero
                  ? "btn-outline-light"
                  : "btn-fill bg-primary-500 text-background-50"
              }`}
            >
              <ButtonLabel>Contact Us</ButtonLabel>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`flex h-10 w-10 cursor-pointer items-center justify-center border transition-colors ${
                overHero
                  ? "border-background-50/45 text-background-50 hover:bg-background-50 hover:text-foreground-950"
                  : "border-foreground-950/25 text-foreground-900 hover:border-foreground-950 hover:bg-foreground-950 hover:text-background-50"
              }`}
            >
              <i className="ri-menu-line text-base" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out navigation */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 h-full w-full cursor-pointer bg-foreground-950/55"
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-foreground-950/15 bg-background-50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-foreground-950/12 px-6 py-5">
            <img
              src={logos.dark}
              alt="Team Medved"
              className="h-7 w-auto max-w-[160px] object-contain"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 cursor-pointer items-center justify-center border border-foreground-950/25 text-foreground-900 transition-colors hover:bg-foreground-950 hover:text-background-50"
            >
              <i className="ri-close-line text-lg" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar" aria-label="Sidebar">
            <span className="font-label text-[9px] text-foreground-500">Navigation</span>
            <ul className="mt-6 flex flex-col">
              {[
                { label: "Home", to: "/" },
                { label: "Meet the Team", to: "/about" },
                { label: "Our Community", to: "/our-community" },
              ].map((item) => (
                <li key={item.to} className="border-b border-foreground-950/10">
                  <Link
                    to={item.to}
                    className="block py-3.5 font-heading text-[1.4rem] tracking-[-0.025em] text-foreground-950 transition-colors hover:text-accent-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {navGroups.map((group) => {
                const isOpen = openGroup === group.label;
                return (
                  <li key={group.label} className="border-b border-foreground-950/10">
                    <button
                      type="button"
                      onClick={() => setOpenGroup(isOpen ? null : group.label)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between py-3.5 font-heading text-[1.4rem] tracking-[-0.025em] text-foreground-950 transition-colors hover:text-accent-700"
                    >
                      {group.label}
                      <i
                        className={`ri-add-line text-lg transition-transform duration-500 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-500 ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <ul className="min-h-0 pb-4">
                        {group.items.map((item) => (
                          <li key={item.to}>
                            <Link
                              to={item.to}
                              className="block py-1.5 pl-4 font-label text-[10px] text-foreground-600 transition-colors hover:text-foreground-950"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}

              {[
                { label: "Neighborhoods", to: "/communities" },
                { label: "Home Valuation", to: "/home-valuation" },
                { label: "Testimonials", to: "/testimonials" },
              ].map((item) => (
                <li key={item.to} className="border-b border-foreground-950/10">
                  <Link
                    to={item.to}
                    className="block py-3.5 font-heading text-[1.4rem] tracking-[-0.025em] text-foreground-950 transition-colors hover:text-accent-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-foreground-950/12 px-6 py-6">
            <button
              type="button"
              onClick={handleContact}
              className="btn btn-fill flex w-full cursor-pointer items-center justify-center bg-primary-500 px-6 py-4 btn-label text-background-50"
            >
              <ButtonLabel>Contact Us</ButtonLabel>
            </button>
            <a
              href="tel:+13102664236"
              className="mt-4 block text-center font-label text-[9px] text-foreground-600 transition-colors hover:text-foreground-950"
            >
              (310) 266-4236
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}