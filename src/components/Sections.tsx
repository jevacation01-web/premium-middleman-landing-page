import { cn } from "../utils/cn";
import {
  ArrowRight,
  ArrowUpRight,
  Avatar,
  Banknote,
  Check,
  CheckCircle,
  Chat,
  DocumentCheck,
  Eyebrow,
  Fingerprint,
  Globe,
  Lightning,
  Lock,
  Reveal,
  Scale,
  SectionHeading,
  ShieldCheck,
  Sparkle,
  Stars,
  UserCheck,
  Users,
} from "./primitives";

const F = {
  maya: "https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
  daniel:
    "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
  ines: "https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
  marcus:
    "https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
};

/* ------------------------------------------------------------------ */
/*  Social proof                                                       */
/* ------------------------------------------------------------------ */

const brands = [
  { name: "NORTHWIND", style: "font-display font-bold tracking-[0.24em] text-[13px]" },
  { name: "Arclight", style: "font-serif italic text-[23px] tracking-tight" },
  { name: "form&fold", style: "font-display font-semibold tracking-[-0.045em] text-[20px]" },
  { name: "STUDIO KŌ", style: "font-sans font-medium tracking-[0.28em] text-[12px]" },
  { name: "Ledgerline", style: "font-display font-medium tracking-tight text-[19px]" },
  { name: "CÉLESTE", style: "font-serif text-[20px] tracking-[0.14em]" },
];

const stats = [
  { value: "$2.4B", label: "Protected deal volume" },
  { value: "12,400+", label: "Deals closed without a loss" },
  { value: "190", label: "Countries supported" },
  { value: "99.98%", label: "Successful releases" },
];

export function SocialProof() {
  return (
    <section aria-label="Trusted by" className="relative border-y border-ink/[0.07] bg-cream-soft">
      <div aria-hidden="true" className="noise" />
      <div className="shell relative py-9 sm:py-11">
        <div className="flex flex-col items-center gap-7 lg:flex-row lg:gap-12">
          <p className="shrink-0 text-center text-[10.5px] font-medium uppercase leading-relaxed tracking-[0.16em] text-ink/40 lg:max-w-[130px] lg:text-left">
            Trusted by people
            <br className="hidden lg:block" /> who trade seriously
          </p>
          <div className="marquee relative w-full overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-cream-soft to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-cream-soft to-transparent"
            />
            <div className="marquee-track items-center gap-10 sm:gap-14">
              {[...brands, ...brands].map((b, i) => (
                <span
                  key={`${b.name}-${i}`}
                  aria-hidden={i >= brands.length}
                  className={cn("shrink-0 whitespace-nowrap text-ink/35 transition-colors hover:text-ink/60", b.style)}
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/[0.08] bg-ink/[0.08] sm:mt-11 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className="group bg-cream-soft px-4 py-5 transition-colors duration-300 hover:bg-white sm:px-6 sm:py-6"
            >
              <p className="font-display text-[24px] font-bold tracking-[-0.045em] text-ink sm:text-[28px]">
                {s.value}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-ink/45 sm:text-[12px]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works                                                       */
/* ------------------------------------------------------------------ */

const steps = [
  {
    n: "01",
    title: "Write the deal, not a prayer",
    body: "Name the item, set the price, add the terms. Our guided builder turns a vague DM agreement into something both sides can actually hold each other to.",
    icon: DocumentCheck,
    visual: (
      <div className="space-y-2">
        {[
          ["What's being sold", "Leica Q3 + extras"],
          ["Agreed price", "$3,450.00"],
          ["Delivery window", "3 business days"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className="flex items-center justify-between rounded-lg border border-ink/[0.07] bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(10,21,18,0.03)]"
            style={{ marginLeft: `${i === 1 ? 0 : i === 2 ? 10 : 0}px` }}
          >
            <span className="text-[10px] text-ink/40">{k}</span>
            <span className="text-[10.5px] font-medium text-ink/80">{v}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 pt-1 text-[9.5px] text-forest">
          <CheckCircle className="h-3 w-3" /> Terms accepted by both parties
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "The money goes to the vault",
    body: "The buyer pays Vouch — not the seller. Funds sit in a segregated, FDIC-insured account until the deal is honoured. The seller sees proof of funds, so they ship with confidence.",
    icon: Lock,
    visual: (
      <div className="relative overflow-hidden rounded-xl bg-ink p-3 text-cream">
        <div aria-hidden="true" className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-lime/25 blur-2xl" />
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.14em] text-cream/40">Secured balance</span>
          <span className="rounded-full bg-lime/15 px-1.5 py-0.5 text-[8.5px] font-semibold text-lime">HELD</span>
        </div>
        <p className="mt-1.5 font-display text-[22px] font-bold tracking-tight">$3,450.00</p>
        <div className="mt-2 flex items-center gap-1.5 text-[9px] text-cream/45">
          <ShieldCheck className="h-3 w-3 text-mint" /> Not visible to the seller until release
        </div>
      </div>
    ),
  },
  {
    n: "03",
    title: "You approve. We release.",
    body: "Inspect the goods, then release with one tap. If something's off, pause the deal and our resolution team steps in — before a single cent moves.",
    icon: ShieldCheck,
    visual: (
      <div className="space-y-2">
        <div className="rounded-xl border border-mint/50 bg-mint/10 p-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10.5px] font-medium text-forest">
              <CheckCircle className="h-3.5 w-3.5" /> Delivery confirmed
            </span>
            <span className="text-[9px] text-forest/60">2h ago</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-full bg-forest px-2 py-1 text-[9px] font-medium text-lime">
            <Lock className="h-2.5 w-2.5" /> Release $3,450.00 to seller
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-ink/15 px-2.5 py-2 text-[9.5px] text-ink/45">
          <Scale className="h-3 w-3" /> Or raise a dispute — funds stay frozen.
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/3 h-[380px] w-[380px] rounded-full bg-mint/15 blur-[100px]" />
      </div>
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  Three steps to a deal you don&apos;t have to{" "}
                  <span className="serif-accent text-forest">second-guess.</span>
                </>
              }
              lede="No escrow jargon. No 14-day waits. Just a clear, protected path from handshake to release."
            />
          </Reveal>
          <Reveal delay={120} className="shrink-0">
            <a
              href="#product"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-white/60 px-5 py-3 text-[13.5px] font-medium text-ink backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-cream">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              Walk through a live deal
            </a>
          </Reveal>
        </div>

        <div className="relative mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute inset-x-[16%] top-[74px] hidden h-px bg-[repeating-linear-gradient(to_right,rgba(10,21,18,0.18)_0_6px,transparent_6px_14px)] lg:block"
          />
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 110}
              className="lift spotlight group relative flex flex-col rounded-[26px] border border-ink/[0.08] bg-white/70 p-5 backdrop-blur-sm sm:p-6"
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-cream text-ink shadow-[inset_0_1px_0_#fff]">
                  <s.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="serif-accent text-[30px] italic leading-none text-ink/15">{s.n}</span>
              </div>
              <h3 className="relative z-10 mt-5 text-[19px] font-bold tracking-[-0.03em] text-ink">{s.title}</h3>
              <p className="relative z-10 mt-2 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
              <div className="relative z-10 mt-5 rounded-2xl border border-ink/[0.07] bg-cream-soft/80 p-2.5">{s.visual}</div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11.5px] text-ink/40">
          <span className="flex items-center gap-1.5"><Lightning className="h-3.5 w-3.5 text-forest" /> Average setup: 4 minutes</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-forest" /> Funds never touch our operating account</span>
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-forest" /> Works for goods, services, vehicles, digital assets</span>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Protection / features bento                                        */
/* ------------------------------------------------------------------ */

function FeatureCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "lift spotlight group relative overflow-hidden rounded-[26px] border border-ink/[0.08] bg-white/65 p-5 backdrop-blur-sm sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function FeatureHead({
  icon: Icon,
  title,
  body,
  tone = "dark",
}: {
  icon: (p: { className?: string; strokeWidth?: number }) => React.ReactElement;
  title: string;
  body: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className="relative z-10">
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl border",
          tone === "dark" ? "border-ink/10 bg-cream text-forest" : "border-white/15 bg-white/10 text-lime",
        )}
      >
        <Icon className="h-[19px] w-[19px]" strokeWidth={1.6} />
      </span>
      <h3
        className={cn(
          "mt-4 text-[17.5px] font-bold tracking-[-0.03em]",
          tone === "dark" ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </h3>
      <p className={cn("mt-1.5 text-[13px] leading-relaxed", tone === "dark" ? "text-muted" : "text-cream/50")}>
        {body}
      </p>
    </div>
  );
}

export function Protection() {
  return (
    <section id="protection" className="relative border-y border-ink/[0.07] bg-cream-deep/60 py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 grid-fade opacity-40" />
      <div className="shell relative">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Protection by default"
            title={
              <>
                Everything a handshake
                <br className="hidden sm:block" /> can&apos;t <span className="serif-accent text-forest">cover.</span>
              </>
            }
            lede="Five layers of protection, working quietly in the background of every deal — whether it's a $200 sneaker or a $200,000 portfolio."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {/* escrow flow — wide */}
          <Reveal className="lg:col-span-2">
            <div className="lift spotlight group relative h-full overflow-hidden rounded-[26px] border border-ink/30 bg-[linear-gradient(140deg,#16362a_0%,#0a1512_62%,#122019_100%)] p-5 text-cream sm:p-7">
              <div aria-hidden="true" className="absolute inset-0 grid-fade-dark opacity-60" />
              <div aria-hidden="true" className="noise noise-light" />
              <div aria-hidden="true" className="animate-drift absolute -right-14 -top-16 h-52 w-52 rounded-full bg-lime/20 blur-3xl" />
              <FeatureHead
                tone="light"
                icon={Banknote}
                title="Escrow that keeps everyone honest"
                body="Buyer funds are secured before the seller ships. Nothing moves until the agreed conditions are met — and our ledger records every step."
              />
              <div className="relative z-10 mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm sm:gap-3 sm:p-4">
                {[
                  { label: "Buyer", value: "$3,450", sub: "Pays Vouch", icon: Users },
                  { label: "Vault", value: "$3,450", sub: "FDIC-insured", icon: Lock },
                  { label: "Seller", value: "$3,408.60", sub: "On approval", icon: CheckCircle },
                ].map((node, i) => (
                  <div key={node.label} className="contents">
                    <div className={cn("rounded-xl border p-2 text-center sm:p-2.5", i === 1 ? "border-lime/30 bg-lime/10" : "border-white/10 bg-white/[0.04]")}>
                      <node.icon className={cn("mx-auto h-3.5 w-3.5", i === 1 ? "text-lime" : "text-cream/45")} />
                      <p className="mt-1.5 text-[9px] uppercase tracking-[0.1em] text-cream/40">{node.label}</p>
                      <p className="mt-0.5 whitespace-nowrap font-display text-[12px] font-semibold tracking-tight text-cream sm:text-[13px]">{node.value}</p>
                      <p className="text-[8px] text-cream/30">{node.sub}</p>
                    </div>
                    {i < 2 && (
                      <div className="flex flex-col items-center gap-1 text-cream/25">
                        <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden text-[7.5px] uppercase tracking-wider sm:block">{i === 0 ? "secured" : "released"}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="relative z-10 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-cream/35">
                <span className="flex items-center gap-1"><Check className="h-3 w-3 text-mint" /> Funds isolated from operations</span>
                <span className="flex items-center gap-1"><Check className="h-3 w-3 text-mint" /> Up to $1M per deal</span>
                <span className="flex items-center gap-1"><Check className="h-3 w-3 text-mint" /> SOC 2 Type II</span>
              </div>
            </div>
          </Reveal>

          {/* identity */}
          <Reveal delay={90}>
            <FeatureCard className="h-full">
              <FeatureHead
                icon={Fingerprint}
                title="Verified humans, not usernames"
                body="Government ID, liveness and fraud screening on both sides before money moves."
              />
              <div className="relative z-10 mt-5 space-y-2">
                {[
                  { src: F.maya, name: "Maya R.", detail: "Seller · Berlin" },
                  { src: F.daniel, name: "Daniel K.", detail: "Buyer · Lisbon" },
                ].map((p) => (
                  <div key={p.name} className="flex items-center gap-2.5 rounded-xl border border-ink/[0.07] bg-white/80 p-2">
                    <Avatar src={p.src} alt={`${p.name}, identity verified`} className="h-8 w-8 ring-white" />
                    <div className="flex-1">
                      <p className="text-[11.5px] font-semibold text-ink">{p.name}</p>
                      <p className="text-[9.5px] text-ink/40">{p.detail}</p>
                    </div>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-lime">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-xl bg-cream px-2.5 py-2 text-[9.5px] text-ink/45">
                  <span className="flex items-center gap-1.5"><Sparkle className="h-3 w-3 text-forest" /> Sanctions & PEP screening</span>
                  <span className="font-medium text-forest">Clear</span>
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          {/* deal room */}
          <Reveal delay={40}>
            <FeatureCard className="h-full">
              <FeatureHead
                icon={Chat}
                title="One room for the whole deal"
                body="Chat, files, terms and approvals — time-stamped and admissible."
              />
              <div className="relative z-10 mt-5 space-y-2">
                <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-ink/[0.06] bg-white px-2.5 py-2 text-[10.5px] leading-snug text-ink/70">
                  Serial number matches. Shipping today 🎉
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-ink px-2.5 py-2 text-[10.5px] leading-snug text-cream/90">
                  Perfect. Funds are waiting in escrow.
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-ink/[0.07] bg-cream px-2 py-1.5">
                  <DocumentCheck className="h-4 w-4 shrink-0 text-forest" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium text-ink/80">serial-number.jpg</p>
                    <p className="text-[8.5px] text-ink/35">Added to evidence log · 2.1 MB</p>
                  </div>
                  <CheckCircle className="h-3.5 w-3.5 text-forest" />
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          {/* milestones */}
          <Reveal delay={90}>
            <FeatureCard className="h-full">
              <FeatureHead
                icon={CheckCircle}
                title="Milestone-by-milestone release"
                body="For bigger projects: release in tranches as work gets signed off."
              />
              <div className="relative z-10 mt-5 space-y-3">
                {[
                  { label: "Deposit & scope", pct: 100, state: "Released" },
                  { label: "Design handoff", pct: 100, state: "Released" },
                  { label: "Final delivery", pct: 55, state: "In escrow" },
                ].map((m, i) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-ink/60">{m.label}</span>
                      <span className={m.pct === 100 ? "text-forest" : "text-ink/35"}>{m.state}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.08]">
                      <div
                        className={cn(
                          "bar-grow h-full rounded-full",
                          m.pct === 100 ? "bg-forest" : "bg-gradient-to-r from-mint to-lime",
                        )}
                        style={{ "--bar": `${m.pct}%`, animationDelay: `${i * 180}ms` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
                <p className="rounded-lg bg-cream px-2 py-1.5 text-[9.5px] text-ink/45">
                  Remaining protected: <span className="font-semibold text-ink">$1,552.50</span>
                </p>
              </div>
            </FeatureCard>
          </Reveal>

          {/* payouts */}
          <Reveal delay={140}>
            <FeatureCard className="h-full">
              <FeatureHead
                icon={Globe}
                title="Paid out in your currency"
                body="Local rails in 190+ countries. 42 currencies, same-day where supported."
              />
              <div className="relative z-10 mt-5 flex flex-wrap gap-1.5">
                {["USD", "EUR", "GBP", "NGN", "INR", "JPY", "AED", "BRL"].map((c, i) => (
                  <span
                    key={c}
                    className={cn(
                      "rounded-lg border px-2 py-1 text-[10px] font-medium transition-colors",
                      i === 0
                        ? "border-forest/20 bg-forest text-lime"
                        : "border-ink/[0.08] bg-white text-ink/55 hover:border-forest/25 hover:text-forest",
                    )}
                  >
                    {c}
                  </span>
                ))}
                <span className="rounded-lg border border-dashed border-ink/15 px-2 py-1 text-[10px] text-ink/40">+34</span>
              </div>
              <div className="relative z-10 mt-4 rounded-xl border border-ink/[0.07] bg-cream p-2.5">
                <div className="flex items-center justify-between text-[9.5px] text-ink/40">
                  <span>Last payout</span>
                  <span className="flex items-center gap-1 text-forest"><Lightning className="h-2.5 w-2.5" /> Instant</span>
                </div>
                <div className="mt-1 flex items-end justify-between">
                  <p className="font-display text-[17px] font-bold tracking-tight text-ink">€3,148.20</p>
                  <p className="text-[9px] text-ink/35">1m 48s ago</p>
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          {/* disputes — wide */}
          <Reveal delay={160} className="lg:col-span-3">
            <div className="lift spotlight group relative flex h-full flex-col gap-5 overflow-hidden rounded-[26px] border border-ink/[0.08] bg-white/70 p-5 backdrop-blur-sm sm:p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4 md:max-w-xl">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ink/10 bg-cream text-forest">
                  <Scale className="h-[19px] w-[19px]" />
                </span>
                <div>
                  <h3 className="text-[17.5px] font-bold tracking-[-0.03em] text-ink">A real human, before anything moves</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    If a deal goes sideways, funds stay frozen and a resolution specialist reviews the evidence log.
                    Median resolution: 2.4 business days. No bots deciding your money.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-ink/[0.07] bg-cream/80 p-3">
                <div className="flex -space-x-2.5">
                  <Avatar src={F.ines} alt="Vouch resolution specialist Ines" className="h-8 w-8 ring-cream" />
                  <Avatar src={F.marcus} alt="Vouch resolution specialist Marcus" className="h-8 w-8 ring-cream" />
                  <Avatar src={F.maya} alt="Vouch resolution specialist Maya" className="h-8 w-8 ring-cream" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-ink">Resolution team online</p>
                  <p className="flex items-center gap-1 text-[9.5px] text-forest">
                    <span className="h-1.5 w-1.5 rounded-full bg-forest" /> 2.4h median first reply
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Benefits                                                           */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    icon: Lock,
    title: "Your money is never exposed",
    body: "Buyers pay into a segregated account, not into someone's pocket. Sellers ship knowing the funds exist. Nobody has to go first.",
  },
  {
    icon: Fingerprint,
    title: "Scammers can't pass the gate",
    body: "ID verification, liveness checks and device intelligence run on both sides. Repeat fraud rings don't get a second attempt.",
  },
  {
    icon: Scale,
    title: "An escape hatch that actually works",
    body: "Dispute in two taps. Evidence is already timestamped in the deal room, so resolution is fast, fair and documented.",
  },
];

export function Benefits() {
  return (
    <section id="why" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-lime/15 blur-[110px]" />
      </div>
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal dir="left" className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-[440px]">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[34px] border border-ink/[0.07] bg-cream-deep/60"
              />
              <div className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-cream-deep shadow-[0_30px_70px_-30px_rgba(10,21,18,0.35)]">
                <img
                  src="/images/handoff.jpg"
                  alt="Two people completing a deal with a sealed package on a marble table"
                  className="h-[420px] w-full object-cover object-[50%_38%] sm:h-[500px] lg:h-[560px]"
                  loading="lazy"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 py-1.5 pl-1.5 pr-3 text-[10.5px] font-medium text-white backdrop-blur-md">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-lime text-ink">
                    <ShieldCheck className="h-3 w-3" strokeWidth={2} />
                  </span>
                  Protected by Vouch
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-white/12 p-3.5 text-cream backdrop-blur-xl sm:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9.5px] uppercase tracking-[0.14em] text-cream/55">Protected this week</p>
                      <p className="mt-1 font-display text-[24px] font-bold tracking-[-0.04em]">$18,402,190</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-lime/25 bg-lime/15 px-2.5 py-1 text-[10px] font-semibold text-lime">
                      <Sparkle className="h-2.5 w-2.5" /> +12.4%
                    </div>
                  </div>
                  <div className="mt-3 flex items-end gap-1">
                    {[38, 52, 44, 66, 58, 74, 68, 88, 82, 96].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-lime/30 to-lime/90"
                        style={{ height: `${h * 0.32}px`, opacity: 0.5 + i * 0.05 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="animate-floaty absolute -right-3 top-24 hidden rounded-2xl border border-white/70 bg-white/85 p-3 shadow-[0_18px_40px_-20px_rgba(10,21,18,0.4)] backdrop-blur-xl sm:block lg:-right-8">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-forest/10 text-forest">
                    <UserCheck className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold text-ink">Both sides verified</p>
                    <p className="text-[9px] text-ink/45">Before the first dollar moves</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Why people choose Vouch</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.9rem,4.2vw,3.35rem)] font-bold text-ink">
                For the deals your{" "}
                <span className="serif-accent text-forest">reputation</span> depends on.
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
                Whether it&apos;s your first sale to a stranger or your fiftieth trade this year, the feeling should
                be the same: settled, certain, safe.
              </p>
            </Reveal>

            <div className="mt-8 space-y-1">
              {benefits.map((b, i) => (
                <Reveal
                  key={b.title}
                  delay={i * 90}
                  className="group flex gap-3.5 rounded-2xl border-b border-ink/[0.07] py-4 last:border-0"
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-ink/10 bg-white text-forest transition-colors duration-300 group-hover:bg-ink group-hover:text-lime">
                    <b.icon className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-ink">{b.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{b.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="mt-6">
              <div className="flex flex-col gap-3 rounded-2xl border border-ink/[0.08] bg-white/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[12.5px] font-medium text-ink">Curious what your next deal would cost?</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-ink/45">
                    <Stars className="text-forest" /> Fee calculator, no email required
                  </p>
                </div>
                <a href="#pricing" className="group inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-forest">
                  Calculate a fee
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
