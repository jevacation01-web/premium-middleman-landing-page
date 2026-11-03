import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  Close,
  Clock,
  Globe,
  Lock,
  Logo,
  Reveal,
  ShieldCheck,
  Sparkle,
} from "./primitives";

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <section id="start" className="relative overflow-hidden bg-ink py-20 text-cream sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_-5%,#1e4333_0%,#0a1512_58%,#0a1512_100%)]" />
        <div className="absolute inset-0 grid-fade-dark opacity-60" />
        <div className="animate-floaty-slow absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/[0.13] blur-[120px]" />
        <div className="animate-drift absolute -left-24 bottom-0 h-[280px] w-[280px] rounded-full bg-mint/10 blur-[90px]" />
        <div className="noise noise-light" />
        {/* orbit rings */}
        <div className="absolute left-1/2 top-16 hidden h-[560px] w-[560px] -translate-x-1/2 lg:block">
          <div className="absolute inset-0 rounded-full border border-white/[0.055]" />
          <div className="absolute inset-10 rounded-full border border-white/[0.045]" />
          <div className="absolute inset-24 rounded-full border border-dashed border-lime/[0.13]" />
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-lime/70" />
          <span className="absolute bottom-16 right-16 h-1 w-1 rounded-full bg-mint/60" />
        </div>
      </div>

      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-3 py-1.5 text-[10.5px] font-medium text-cream/60 backdrop-blur">
            <Sparkle className="h-3 w-3 text-lime" />
            Set up in under 4 minutes
            <span className="h-1 w-1 rounded-full bg-cream/20" />
            No card required
          </span>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
            Trust isn&apos;t a gamble.
            <br />
            Make it the <span className="serif-accent text-gradient-lime">default.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[14.5px] leading-relaxed text-cream/50 sm:text-[15.5px]">
            Join 48,000 buyers, sellers and collectors who refuse to send money into the
            unknown. Your next deal deserves a witness.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-9 max-w-lg">
          <div className="glass-dark relative overflow-hidden rounded-[24px] p-4 sm:p-5">
            {status === "success" ? (
              <div className="slide-swap py-2 text-center">
                <span className="checker-pop mx-auto grid h-12 w-12 place-items-center rounded-full bg-lime/15 text-lime ring-1 ring-lime/30">
                  <CheckCircle className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <p className="mt-3 font-display text-[18px] font-bold tracking-tight text-cream">You&apos;re on your way.</p>
                <p className="mx-auto mt-1.5 max-w-[320px] text-[12px] leading-relaxed text-cream/45">
                  We sent a secure deal link to{" "}
                  <span className="text-cream/80">{email.trim()}</span>. Open it to set your
                  terms — nothing is charged until both sides agree.
                </p>
                <button
                  type="button"
                  onClick={() => { setStatus("idle"); setEmail(""); }}
                  className="mt-4 text-[11px] font-medium text-lime/80 underline decoration-lime/25 underline-offset-4 hover:text-lime"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <label htmlFor="cta-email" className="block text-[11px] font-medium text-cream/60">
                  Work or personal email
                </label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      id="cta-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                      placeholder="you@company.com"
                      aria-invalid={status === "error"}
                      aria-describedby="cta-email-hint"
                      autoComplete="email"
                      className={cn(
                        "h-12 w-full rounded-xl border bg-white/[0.07] px-4 text-[13.5px] text-cream placeholder:text-cream/25 backdrop-blur transition-colors focus:outline-none focus:ring-2",
                        status === "error"
                          ? "border-red-400/60 focus:ring-red-400/25"
                          : "border-white/12 focus:border-lime/50 focus:ring-lime/15",
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-shine group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-lime px-5 text-[13.5px] font-semibold text-ink transition-all duration-300 hover:bg-lime-bright"
                  >
                    Start a protected deal
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
                  </button>
                </div>
                <p
                  id="cta-email-hint"
                  aria-live="polite"
                  className={cn("mt-2 text-[10.5px]", status === "error" ? "text-red-300" : "text-cream/30")}
                >
                  {status === "error"
                    ? "That email doesn't look right — mind checking it?"
                    : "Free to start · No card · Cancel or pause any time"}
                </p>
              </form>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10.5px] text-cream/35">
            <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Bank-grade encryption</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> FDIC-insured custody</span>
            <span className="flex items-center gap-1.5"><Globe className="h-3 w-3" /> 190+ countries</span>
          </div>
        </Reveal>

        <Reveal delay={180} className="mx-auto mt-12 grid max-w-3xl gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
          {[
            { n: "01", t: "Invite the other side", b: "Email or a link. They join without an account fee." },
            { n: "02", t: "We verify, then hold", b: "Both IDs pass. Funds are secured before anyone ships." },
            { n: "03", t: "Approve, and it's done", b: "Release with one tap. Both sides get a receipt." },
          ].map((s, i) => (
            <div key={s.n} className="flex gap-3 sm:block">
              <span className="serif-accent text-[15px] italic text-lime/60">{s.n}</span>
              <div className="sm:mt-1.5">
                <p className="text-[12px] font-semibold text-cream/85">{s.t}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-cream/35">{s.b}</p>
              </div>
              {i < 2 && <span className="hidden sm:block" />}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

const columns = [
  {
    title: "Product",
    links: ["How it works", "Protection", "Pricing", "Fee calculator", "API & integrations", "Status"],
    hrefs: ["#how-it-works", "#protection", "#pricing", "#pricing", "#start", "#start"],
  },
  {
    title: "Company",
    links: ["Our story", "Trust center", "Careers", "Press kit", "Security", "Contact"],
    hrefs: ["#why", "#protection", "#start", "#start", "#protection", "mailto:hello@vouch.deals"],
  },
  {
    title: "Resources",
    links: ["Help center", "Scam playbook", "Deal guides", "Dispute process", "Blog", "Changelog"],
    hrefs: ["#faq", "#protection", "#how-it-works", "#faq", "#stories", "#product"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Escrow terms", "Complaints", "Cookie settings"],
    hrefs: ["#start", "#start", "#start", "#faq", "#start"],
  },
];

const socials = [
  {
    label: "Vouch on X",
    path: "M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L2 2h6.4l4.5 5.9L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z",
  },
  {
    label: "Vouch on LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.45-2.2 2.97V21h-4V9Z",
  },
  {
    label: "Vouch on Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.55.21.95.47 1.36.88.4.4.67.8.88 1.36.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.87s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.21.55-.47.95-.88 1.36-.4.4-.8.67-1.36.88-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.6 3.6 0 0 1-1.36-.88 3.6 3.6 0 0 1-.88-1.36c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.21-.55.47-.95.88-1.36.4-.4.8-.67 1.36-.88.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5 0-4.74.07-.9.04-1.4.2-1.72.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.72C3.4 8.5 3.4 8.86 3.4 12s0 3.5.07 4.74c.04.9.2 1.4.32 1.72.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.72.32 1.24.07 1.6.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.4-.2 1.72-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.72.07-1.24.07-1.6.07-4.74s0-3.5-.07-4.74c-.04-.9-.2-1.4-.32-1.72a2.8 2.8 0 0 0-.69-1.06 2.8 2.8 0 0 0-1.06-.69c-.33-.13-.81-.28-1.72-.32C15.5 4 15.14 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm6.25-8.2a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-ink pb-24 pt-14 text-cream md:pb-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="noise noise-light opacity-60" />
        <div className="absolute -bottom-24 left-1/2 h-52 w-[700px] -translate-x-1/2 rounded-full bg-lime/[0.07] blur-[90px]" />
      </div>
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-[260px] text-[12.5px] leading-relaxed text-cream/40">
              The modern middleman for deals that matter. Funds held, identities verified,
              promises kept — in 190+ countries.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-cream/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-lime"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10.5px] text-cream/45">
              <Globe className="h-3 w-3" /> Global · English · USD
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/35">{col.title}</p>
                <ul className="mt-3.5 space-y-2.5">
                  {col.links.map((l, i) => (
                    <li key={l}>
                      <a
                        href={col.hrefs[i]}
                        className="group inline-flex items-center gap-1 text-[12px] text-cream/55 transition-colors hover:text-cream"
                      >
                        {l}
                        <ArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-60" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.08] pt-6">
          <p className="max-w-4xl text-[10px] leading-relaxed text-cream/25">
            Vouch is a financial technology company, not a bank. Payment and escrow services are
            provided by Vouch Payments, Inc. and its regulated banking partners. Funds in custody
            are held in segregated accounts and are eligible for FDIC pass-through insurance up to
            applicable per-depositor limits; insurance is subject to the custodian&apos;s terms.
            Vouch does not provide legal, tax or investment advice. Deal previews and figures on
            this page are illustrative.
          </p>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-[10.5px] text-cream/30">© 2026 Vouch Technologies, Inc.</p>
              <span className="hidden h-3 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-1.5">
                {["VISA", "MC", "AMEX", "SEPA", "2FA"].map((p) => (
                  <span key={p} className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[8px] font-medium tracking-wide text-cream/35">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10.5px] text-cream/35">
              <a href="#top" className="transition-colors hover:text-cream">Privacy</a>
              <a href="#top" className="transition-colors hover:text-cream">Terms</a>
              <a href="#faq" className="flex items-center gap-1.5 transition-colors hover:text-cream">
                <Clock className="h-3 w-3" /> Help
              </a>
              <a href="#top" className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 transition-colors hover:text-cream">
                Back to top
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="relative -mb-6 mt-8 select-none overflow-hidden sm:-mb-10">
          <p className="font-display text-[clamp(4.5rem,15vw,12rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/[0.045]">
            vouch
            <span className="text-lime/25">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile sticky CTA                                                  */
/* ------------------------------------------------------------------ */

export function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 760);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-cream/90 p-2 pl-3.5 shadow-[0_18px_50px_-16px_rgba(10,21,18,0.45)] backdrop-blur-xl">
        <div className="min-w-0 flex-1">
          <p className="text-[11.5px] font-semibold text-ink">Deal without the doubt</p>
          <p className="flex items-center gap-1 text-[9.5px] text-ink/45">
            <Check className="h-2.5 w-2.5 text-forest" /> From 1.2% · free to start
          </p>
        </div>
        <a
          href="#start"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-ink px-3.5 text-[11.5px] font-medium text-cream"
        >
          Start a deal
          <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss starter bar"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink/35 transition hover:bg-ink/5 hover:text-ink"
        >
          <Close className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
