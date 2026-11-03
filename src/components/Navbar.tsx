import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { ArrowRight, ArrowUpRight, Logo, Menu, Close, ShieldCheck } from "./primitives";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Protection", href: "#protection" },
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative transition-all duration-500",
          scrolled
            ? "border-b border-ink/[0.07] bg-cream/95 shadow-[0_6px_24px_-18px_rgba(10,21,18,0.4)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell">
          <div className="flex h-[68px] items-center justify-between gap-4 sm:h-[74px]">
            <a
              href="#top"
              className="rounded-lg py-1"
              aria-label="Vouch — back to top"
              onClick={() => setOpen(false)}
            >
              <Logo />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {links.map((l) => {
                  const isActive = active === l.href;
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200",
                          isActive ? "text-ink" : "text-ink/55 hover:text-ink",
                        )}
                      >
                        {l.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-ink transition-all duration-300",
                            isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <a
                href="#faq"
                className="rounded-full px-4 py-2 text-[13.5px] font-medium text-ink/60 transition-colors hover:bg-ink/[0.04] hover:text-ink"
              >
                Log in
              </a>
              <a
                href="#start"
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink pl-4 pr-3 text-[13.5px] font-medium text-cream shadow-[0_8px_22px_-10px_rgba(10,21,18,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-ink-3"
              >
                Start a protected deal
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/12 bg-white/60 text-ink backdrop-blur transition hover:bg-white lg:hidden"
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-forest via-forest/60 to-lime"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
      </div>

      {/* mobile sheet */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "absolute inset-x-0 top-full px-3 transition-all duration-300 lg:hidden",
          open
            ? "visible pointer-events-auto translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-cream/95 p-3 shadow-[0_30px_60px_-20px_rgba(10,21,18,0.3)] backdrop-blur-2xl">
          <nav aria-label="Mobile" className="grid">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink/80 transition hover:bg-ink/[0.05] hover:text-ink"
                style={{ transitionDelay: open ? `${i * 25}ms` : "0ms" }}
              >
                {l.label}
                <ArrowUpRight className="h-4 w-4 text-ink/30" />
              </a>
            ))}
          </nav>
          <div className="mt-2 grid gap-2 border-t border-ink/8 p-1 pt-3">
            <a
              href="#start"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-cream"
            >
              Start a protected deal
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-ink/12 text-sm font-medium text-ink/70"
            >
              See pricing
            </a>
            <p className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-ink/45">
              <ShieldCheck className="h-3.5 w-3.5" />
              Funds protected up to $1M per deal
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
