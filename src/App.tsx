import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import { Benefits, HowItWorks, Protection, SocialProof } from "./components/Sections";
import { FinalCTA, Footer, MobileCTA } from "./components/Closing";

export default function App() {
  useEffect(() => {
    // Deep links: wait for layout, then honour the hash on first paint.
    if (!window.location.hash) return;
    const id = window.location.hash;
    const timer = window.setTimeout(() => {
      const el = document.querySelector(id);
      if (el instanceof HTMLElement) el.scrollIntoView({ block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const card = target?.closest?.(".spotlight");
      if (!(card instanceof HTMLElement)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink antialiased">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Protection />
        <Showcase />
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
