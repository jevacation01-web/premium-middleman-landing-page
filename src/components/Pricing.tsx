import { useState } from "react";
import { cn } from "../utils/cn";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Eyebrow,
  Globe,
  Lightning,
  Lock,
  Reveal,
  Scale,
  ShieldCheck,
  Sparkle,
  Users,
} from "./primitives";

const money = (n: number, digits = 0) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

const plans = [
  {
    name: "Personal",
    tagline: "For the occasional deal that still has to go right.",
    price: "$0",
    cadence: "forever",
    rate: "1.2%",
    rateNote: "per protected deal · $2 minimum",
    cta: "Start a protected deal",
    highlight: false,
    features: [
      "Escrow with both-party ID checks",
      "Standard 1–2 day verification",
      "Single-release deals",
      "Card, bank transfer & wallet",
      "Human dispute resolution",
      "Full timestamped evidence log",
    ],
  },
  {
    name: "Pro",
    tagline: "For people whose week runs on deals.",
    priceMonthly: 19,
    priceYearly: 15,
    cadence: "per month",
    rate: "0.9%",
    rateNote: "per protected deal · no minimum",
    cta: "Start 14 days free",
    highlight: true,
    features: [
      "Everything in Personal",
      "Priority verification (under 2h)",
      "Instant payouts in 42 currencies",
      "Milestone & multi-party releases",
      "$1M per-deal protection ceiling",
      "24/7 priority support",
      "Custom terms & approval flows",
    ],
  },
  {
    name: "Business",
    tagline: "For teams, marketplaces and high volume.",
    price: "Custom",
    cadence: "annual agreement",
    rate: "From 0.6%",
    rateNote: "volume-based · negotiated",
    cta: "Talk to our team",
    highlight: false,
    features: [
      "Everything in Pro",
      "Dedicated trust & compliance lead",
      "API & webhook access",
      "SSO, roles & audit exports",
      "Custom SLAs and contracts",
      "Bulk onboarding for counterparties",
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [amount, setAmount] = useState(3450);

  const fee = Math.max(amount * 0.012, 2);
  const sellerGets = amount - fee;
  const pct = ((amount - 100) / (50000 - 100)) * 100;

  return (
    <section id="pricing" className="relative overflow-hidden border-t border-ink/[0.07] bg-cream py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-40" />
        <div className="absolute left-1/2 top-0 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-lime/15 blur-[110px]" />
      </div>

      <div className="shell relative">
        <Reveal className="text-center">
          <Eyebrow>Simple, honest pricing</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.9rem,4.2vw,3.35rem)] font-bold text-ink">
            A small fee. A{" "}
            <span className="serif-accent whitespace-nowrap text-forest">sleep&#8209;well</span> kind of deal.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            No surprise deductions, no escrow minimums, no waiting for approval like it&apos;s 2011.
            Fees are split evenly between both parties by default.
          </p>

          <div className="mt-7 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/70 p-1 shadow-[0_4px_14px_-8px_rgba(10,21,18,0.3)] backdrop-blur">
            <span className="sr-only" id="billing-label">Billing period</span>
            <button
              type="button"
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              aria-describedby="billing-label"
              className={cn(
                "rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-300",
                !yearly ? "bg-ink text-cream shadow-sm" : "text-ink/55 hover:text-ink",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              aria-describedby="billing-label"
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-300",
                yearly ? "bg-ink text-cream shadow-sm" : "text-ink/55 hover:text-ink",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold transition-colors",
                  yearly ? "bg-lime text-ink" : "bg-forest/10 text-forest",
                )}
              >
                −20%
              </span>
            </button>
          </div>
        </Reveal>

        {/* fee calculator */}
        <Reveal delay={100} className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-[26px] border border-ink/25 bg-[linear-gradient(135deg,#16362a_0%,#0a1512_60%,#122019_100%)] p-5 text-cream shadow-[0_36px_80px_-40px_rgba(10,21,18,0.7)] sm:p-7 lg:p-8">
            <div aria-hidden="true" className="absolute inset-0 grid-fade-dark opacity-50" />
            <div aria-hidden="true" className="animate-drift absolute -right-10 -top-20 h-56 w-56 rounded-full bg-lime/15 blur-3xl" />
            <div className="relative grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-lime">
                  <Sparkle className="h-3 w-3" /> Fee calculator
                </div>
                <h3 className="mt-3 text-[22px] font-bold tracking-[-0.03em] text-cream sm:text-[26px]">
                  What would your deal cost to protect?
                </h3>
                <div className="mt-5">
                  <div className="flex items-end justify-between">
                    <label htmlFor="deal-amount" className="text-[11.5px] text-cream/45">
                      Deal amount
                    </label>
                    <output htmlFor="deal-amount" className="font-display text-[24px] font-bold tracking-[-0.04em] text-cream" aria-live="polite">
                      {money(amount)}
                    </output>
                  </div>
                  <input
                    id="deal-amount"
                    type="range"
                    min={100}
                    max={50000}
                    step={50}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    aria-valuetext={`${money(amount)} deal amount`}
                    className="fee-range mt-3 w-full cursor-grab active:cursor-grabbing"
                    style={{
                      background: `linear-gradient(to right, #C9F26F 0%, #A8E6C3 ${pct}%, rgba(255,255,255,0.14) ${pct}%, rgba(255,255,255,0.14) 100%)`,
                    }}
                  />
                  <div className="mt-2 flex items-center justify-between text-[10px] text-cream/30">
                    <span>$100</span>
                    <span>$50,000</span>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-1.5 text-[10.5px] text-cream/35">
                  <Scale className="h-3 w-3" /> Split 50/50 by default. One bad deal costs 100%.
                </p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-white/[0.055] p-4 backdrop-blur-md sm:p-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-cream/45">Vouch protection fee</span>
                    <span className="font-medium text-cream">{money(fee, 2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-cream/45">Split between parties</span>
                    <span className="font-medium text-cream/80">{money(fee / 2, 2)} each</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-[12.5px]">
                    <span className="text-cream/60">Seller receives</span>
                    <span className="font-semibold text-lime">{money(sellerGets, 2)}</span>
                  </div>
                </div>
                <a
                  href="#start"
                  className="btn-shine mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-lime text-[13px] font-semibold text-ink transition-all duration-300 hover:bg-lime-bright"
                >
                  Protect this deal
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                </a>
                <p className="mt-2.5 text-center text-[9.5px] text-cream/30">
                  Pro members pay 0.9% — about {money(Math.max(amount * 0.009, 0), 2)} on this deal.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* plans */}
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price =
              plan.name === "Pro"
                ? `$${yearly ? plan.priceYearly : plan.priceMonthly}`
                : plan.price;
            return (
              <Reveal
                key={plan.name}
                delay={i * 100}
                className={cn(
                  "lift relative flex flex-col rounded-[26px] border p-5 sm:p-6",
                  plan.highlight
                    ? "border-ink bg-ink text-cream shadow-[0_30px_60px_-28px_rgba(10,21,18,0.6)] lg:-mt-2 lg:mb-2"
                    : "border-ink/[0.09] bg-white/70 backdrop-blur-sm",
                )}
              >
                {plan.highlight && (
                  <>
                    <div aria-hidden="true" className="noise noise-light" />
                    <div aria-hidden="true" className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-lime/20 blur-3xl" />
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-ink">
                      <Sparkle className="h-2.5 w-2.5" /> Most chosen
                    </span>
                  </>
                )}
                <div className="relative">
                  <h3 className={cn("text-[16px] font-bold tracking-tight", plan.highlight ? "text-cream" : "text-ink")}>
                    {plan.name}
                  </h3>
                  <p className={cn("mt-1 max-w-[220px] text-[11.5px] leading-relaxed", plan.highlight ? "text-cream/45" : "text-ink/45")}>
                    {plan.tagline}
                  </p>
                  <div className="mt-5 flex items-end gap-1.5">
                    <span className={cn("font-display text-[36px] font-extrabold tracking-[-0.05em]", plan.highlight ? "text-cream" : "text-ink")}>
                      {price}
                    </span>
                    <span className={cn("pb-1.5 text-[11px]", plan.highlight ? "text-cream/40" : "text-ink/40")}>
                      {plan.cadence}
                    </span>
                  </div>
                  <div className={cn("mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]", plan.highlight ? "text-cream/55" : "text-ink/55")}>
                    <span className={cn("font-semibold", plan.highlight ? "text-lime" : "text-forest")}>{plan.rate}</span>
                    <span className={plan.highlight ? "text-cream/25" : "text-ink/20"}>·</span>
                    <span>{plan.rateNote}</span>
                  </div>
                  {plan.name === "Pro" && (
                    <p className={cn("mt-1.5 text-[10px]", plan.highlight ? "text-cream/30" : "text-ink/30")}>
                      {yearly ? "Billed annually · save $48/yr" : "Billed monthly · switch any time"}
                    </p>
                  )}

                  <a
                    href="#start"
                    className={cn(
                      "group mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-all duration-300",
                      plan.highlight
                        ? "bg-lime text-ink hover:bg-lime-bright"
                        : "border border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-cream-soft",
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.2} />
                  </a>

                  <ul className="mt-5 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span
                          className={cn(
                            "mt-[1px] grid h-4 w-4 shrink-0 place-items-center rounded-full",
                            plan.highlight ? "bg-lime/15 text-lime" : "bg-forest/10 text-forest",
                          )}
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        </span>
                        <span className={cn("text-[12px] leading-snug", plan.highlight ? "text-cream/70" : "text-ink/65")}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-ink/[0.08] bg-white/55 px-5 py-4 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              { icon: Lock, t: "Funds in FDIC-insured custody" },
              { icon: Globe, t: "190+ countries" },
              { icon: ShieldCheck, t: "SOC 2 Type II" },
              { icon: Users, t: "Human disputes" },
            ].map((b) => (
              <span key={b.t} className="flex items-center gap-1.5 text-[10.5px] text-ink/45">
                <b.icon className="h-3.5 w-3.5 text-forest" /> {b.t}
              </span>
            ))}
          </div>
          <a
            href="#faq"
            className="group inline-flex items-center gap-1.5 text-[11.5px] font-medium text-forest"
          >
            <Lightning className="h-3 w-3" />
            Who pays the fee?
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
