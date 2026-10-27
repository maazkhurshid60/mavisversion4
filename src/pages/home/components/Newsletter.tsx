import Reveal from "@/components/base/Reveal";
import StackPanel from "@/components/base/StackPanel";
import SectionBackdrop from "@/components/base/SectionBackdrop";
import Eyebrow from "@/components/base/Eyebrow";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { sectionBackdrops } from "@/mocks/home";
import ButtonLabel from "@/components/base/ButtonLabel";

const FORM_ADDR = "https://readdy.ai/api/form/dahcu0bp14a1h3mr6j20";

const inputClass =
  "mt-2 w-full border border-foreground-950/20 bg-transparent px-4 py-3 font-body text-sm text-foreground-950 outline-none transition-colors placeholder:text-foreground-400 focus:border-foreground-950 focus:ring-0";

export default function Newsletter() {
  const { status, message, submit } = useFormSubmit(FORM_ADDR);

  return (
    <StackPanel
      id="newsletter"
      order={4}
      label="Newsletter"
      className="flex items-center border-y border-foreground-950/12 px-4 py-20 md:min-h-[100svh] md:overflow-hidden md:px-10 md:py-16"
    >
      {/* Photograph left clean and clearly readable; the form sits on a paper
          plate so every field and label keeps full contrast. */}
      <SectionBackdrop
        image={sectionBackdrops.newsletter}
        wash="bg-background-50/20"
        scrim="bg-gradient-to-t from-background-50/50 via-transparent to-background-50/35"
        speed={0.055}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <Reveal y={26}>
          <div className="border border-foreground-950/12 bg-background-50/[0.96] px-6 py-10 md:px-14 md:py-14">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <Eyebrow index="07">Newsletter</Eyebrow>
                <h2 className="mt-6 max-w-md font-heading text-[1.95rem] leading-[1.08] tracking-[-0.025em] text-foreground-950 md:text-[2.7rem]">
                  New Listings, Straight to Your Inbox
                </h2>
                <p className="mt-6 max-w-md font-body text-sm font-light leading-relaxed text-foreground-700">
                  A short, occasional note with new listings, price changes, and what&apos;s moving
                  in the neighborhoods we know best.
                </p>
              </div>

              <form data-readdy-form id="newsletter-form" onSubmit={submit} className="w-full">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label
                      htmlFor="newsletter-name"
                      className="font-label text-[9px] text-foreground-600"
                    >
                      Name
                    </label>
                    <input
                      id="newsletter-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className={`${inputClass} box-border`}
                    />
                  </div>
                  <div className="min-w-0">
                    <label
                      htmlFor="newsletter-email"
                      className="font-label text-[9px] text-foreground-600"
                    >
                      Email
                    </label>
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@email.com"
                      className={`${inputClass} box-border`}
                    />
                  </div>
                </div>

                <input
                  className="form-field-alt"
                  type="text"
                  name="website_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                />

                <label className="mt-6 flex items-start gap-3 font-body text-[11px] font-light leading-relaxed text-foreground-600">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-primary-500"
                  />
                  I agree to be contacted by Karen Medved via call, email, and text for real estate
                  services. To opt out, you can reply &apos;stop&apos; at any time or reply
                  &apos;help&apos; for assistance. Message and data rates may apply. Message frequency
                  may vary.
                </label>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn-fill mt-8 inline-flex cursor-pointer items-center gap-3 bg-primary-500 px-9 py-4 btn-label text-background-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ButtonLabel>{status === "submitting" ? "Submitting..." : "Submit"}</ButtonLabel>
                  <i className="ri-arrow-right-line btn-arrow text-[11px]" />
                </button>

                {status !== "idle" && message && (
                  <p
                    className={`mt-4 font-body text-xs ${
                      status === "error" ? "text-accent-800" : "text-foreground-800"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </StackPanel>
  );
}