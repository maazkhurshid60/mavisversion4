import { Link } from "react-router-dom";
import { compassLogo, logos } from "@/mocks/home";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Meet the Team", to: "/about" },
      { label: "Our Community", to: "/our-community" },
      { label: "Neighborhoods", to: "/communities" },
      { label: "Testimonials", to: "/testimonials" },
    ],
  },
  {
    title: "Properties",
    links: [
      { label: "Featured Listings", to: "/properties/sale" },
      { label: "For Leases", to: "/properties/lease" },
      { label: "Sold Listings", to: "/properties/sold" },
      { label: "Leased Properties", to: "/properties/leased" },
      { label: "Home Valuation", to: "/home-valuation" },
    ],
  },
  {
    title: "Buyers & Sellers",
    links: [
      { label: "Buyer's Guide", to: "/buyers-guide" },
      { label: "Seller's Guide", to: "/sellers-guide" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/terms-and-conditions" },
    ],
  },
];

const socials = [
  { icon: "ri-facebook-fill", label: "Facebook", href: "https://www.facebook.com/karen.medved.1" },
  { icon: "ri-instagram-line", label: "Instagram", href: "https://www.instagram.com/team_medved/" },
  { icon: "ri-linkedin-fill", label: "LinkedIn", href: "https://www.linkedin.com/in/karen-medved-905ab15/" },
  { icon: "ri-compasses-2-line", label: "Compass", href: "https://www.compass.com/agents/team-medved/" },
];

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-foreground-950/15 bg-background-100 text-foreground-950">
      <div className="px-4 py-16 md:px-10 md:py-20">
        {/* Masthead: centred, like a printed colophon */}
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="inline-flex" aria-label="Team Medved home">
            <img
              src={logos.dark}
              alt="Team Medved, Los Angeles luxury real estate"
              className="h-9 w-auto max-w-[200px] object-contain md:h-11"
            />
          </Link>
          <p className="mt-7 max-w-lg font-heading text-[1.05rem] leading-[1.6] tracking-[-0.015em] text-foreground-800 md:text-[1.2rem]">
            Top producing agents across the hills, the valley, and everywhere in between.
          </p>

          <div className="mt-8 flex items-center gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center border border-foreground-950/20 text-foreground-700 transition-colors hover:border-foreground-950 hover:bg-foreground-950 hover:text-background-50"
              >
                <i className={`${social.icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

        <div className="rule mx-auto mt-14 max-w-[1500px]" aria-hidden="true" />

        <div className="mx-auto mt-14 grid max-w-[1500px] grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-label text-[9px] text-foreground-500">Office</p>
            <address className="mt-6 flex flex-col items-start gap-3 not-italic">
              <span className="font-body text-xs font-light leading-relaxed text-foreground-700">
                12001 Ventura Place, Ste 100
                <br />
                Studio City, CA 91604
              </span>
              <a
                href="tel:+13102664236"
                className="link-underline font-body text-xs text-foreground-700 transition-colors hover:text-foreground-950"
              >
                (310) 266-4236
              </a>
              <a
                href="mailto:teammedved@compass.com"
                className="link-underline font-body text-xs text-foreground-700 transition-colors hover:text-foreground-950"
              >
                teammedved@compass.com
              </a>
            </address>
            <p className="mt-8 max-w-xs font-body text-[11px] font-light leading-relaxed text-foreground-600">
              Lake Hollywood · Los Feliz · Silver Lake · Studio City · Valley Village · Sherman
              Oaks · Toluca Lake
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-label text-[9px] text-foreground-500">
                <span>{column.title}</span>
              </h4>
              <ul className="mt-6 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="link-underline font-body text-xs font-light text-foreground-700 transition-colors hover:text-foreground-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-[1500px] border-t border-foreground-950/12 pt-10 text-center">
          <img
            src={compassLogo}
            alt="Compass"
            className="mx-auto h-6 w-auto max-w-[150px] object-contain"
          />
          <p className="mt-7 font-body text-[11px] font-light leading-relaxed text-foreground-600">
            <strong className="font-normal text-foreground-900">
              Karen Medved | CA DRE# 01235215
            </strong>
            <br />
            <strong className="font-normal text-foreground-900">
              Compass California, Inc. | CA DRE# 01991628
            </strong>
          </p>
          <p className="mx-auto mt-4 max-w-4xl font-body text-[10px] font-light leading-relaxed text-foreground-500">
            Team Medved is a team of real estate agents affiliated with Compass. Compass is a
            licensed real estate broker licensed by the state of California and abides by equal
            housing opportunity laws. All material presented herein is intended for informational
            purposes only. Information is compiled from sources deemed reliable but is subject to
            errors, omissions, changes in price, condition, sale, or withdrawal without notice. No
            statement is made as to accuracy of any description. All measurements and square
            footages are approximate. This is not intended to solicit property already listed.
            Nothing herein shall be construed as legal, accounting or other professional advice
            outside the realm of real estate brokerage.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1500px] flex-col gap-3 border-t border-foreground-950/12 pt-6 font-label text-[9px] text-foreground-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Team Medved</p>
          <Link
            to="/terms-and-conditions"
            className="link-underline transition-colors hover:text-foreground-950"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}