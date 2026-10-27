import { useState } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ContactModal from "@/components/feature/ContactModal";
import BackdropMesh from "@/components/base/BackdropMesh";
import Hero from "@/pages/home/components/Hero";
import CityFilm from "@/pages/home/components/CityFilm";
import HeroPropertyCarousel from "@/pages/home/components/HeroPropertyCarousel";
import StatsBand from "@/pages/home/components/StatsBand";
import QuickJump from "@/pages/home/components/QuickJump";
import PressMarquee from "@/pages/home/components/PressMarquee";
import FeaturedProperties from "@/pages/home/components/FeaturedProperties";
import AboutUs from "@/pages/home/components/AboutUs";
import BuySellSplit from "@/pages/home/components/BuySellSplit";
import Neighborhoods from "@/pages/home/components/Neighborhoods";
import Testimonials from "@/pages/home/components/Testimonials";
import Newsletter from "@/pages/home/components/Newsletter";
import WorkWithUs from "@/pages/home/components/WorkWithUs";
import InstagramFeed from "@/pages/home/components/InstagramFeed";

/**
 * The reel order matters: title card → the city → what is showing now →
 * the record → the work. Dark beats open and close the film, paper carries the
 * detail in between.
 */
export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <div className="relative isolate min-h-screen font-body">
      <BackdropMesh />

      <Navbar onOpenContact={openContact} />

      <main>
        <Hero />
        <CityFilm />
        <HeroPropertyCarousel />
        <StatsBand />
        {/* Sits in its own layer above the pinned record panel, so these
            sections physically ride up over it as you scroll. */}
        <div className="relative z-[2] bg-background-50">
          <QuickJump />
          <PressMarquee />
          <FeaturedProperties />
        </div>
        {/* Pinned photo chapter — the following layer paints over it. */}
        <AboutUs onOpenContact={openContact} />
        <div className="relative z-[3] bg-background-50">
          <BuySellSplit />
          <Neighborhoods />
        </div>
        <Testimonials />
        <Newsletter />
        <WorkWithUs onOpenContact={openContact} />
        <InstagramFeed />
      </main>

      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}