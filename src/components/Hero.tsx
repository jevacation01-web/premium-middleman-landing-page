import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import {
  ArrowRight,
  ArrowUpRight,
  Avatar,
  Banknote,
  Camera,
  Check,
  CheckCircle,
  Fingerprint,
  Lightning,
  Lock,
  Play,
  ShieldCheck,
  Sparkle,
  Stars,
} from "./primitives";

const faces = {
  maya: "https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
  daniel:
    "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
  ines: "https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
};

type Stage = "open" | "releasing" | "done";

function DealCard() {
  const [stage, setStage] = useState<Stage>("open");
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const release = () => {
    if (stage !== "open") return;
    setStage("releasing");
    timer.current = window.setTimeout(() => setStage("done"), 1250);
  };

  return (
    <div className="relative w-full max-w-[412px]">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(201,242,111,0.55),rgba(168,230,195,0.25),transparent_75%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[26px] bg-ink p-[1px] shadow-[0_40px_80px_-30px_rgba(10,21,18,0.55),0_2px_8px_rgba(10,21,18,0.2)]">
        <div className="relative overflow-hidden rounded-[25px] bg-[linear-gradient(158deg,#14261d_0%,#0a1512_52%,#0d1b16_100%)]">
          <div aria-hidden="true" className="absolute inset-0 grid-fade-dark opacity-60" />
          <div aria-hidden="true" className="noise noise-light" />
          <div
            aria-hidden="true"
            className="animate-drift absolute -right-16 -top-20 h-48 w-48 rounded-full bg-lime/20 blur-3xl"
          />

          <div className="relative p-4 sm:p-5">
            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] text-cream/40">
                <Lock className="h-3 w-3" strokeWidth={2} />
                DEAL ROOM
                <span className="text-cream/25">/</span>
                <span className="font-mono tracking-[0.05em] text-cream/55">VCH-2941</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/25 bg-lime/10 px-2 py-[3px] text-[10px] font-semibold text-lime">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
                </span>
                Protected
              </span>
            </div>

            {stage !== "done" ? (
              <>
                {/* item */}
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-2.5 backdrop-blur">
                  <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-lime-bright to-mint text-ink shadow-inner">
                    <Camera className="h-6 w-6" strokeWidth={1.7} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-semibold text-cream">Leica Q3 · Mint condition</p>
                    <p className="mt-0.5 truncate text-[11px] text-cream/40">Includes case, strap & receipt</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-semibold tracking-tight text-cream">$3,450</p>
                    <p className="text-[10px] text-cream/35">inc. shipping</p>
                  </div>
                </div>

                {/* escrow balance */}
                <div className="relative mt-2.5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-cream/40">
                        <Banknote className="h-3.5 w-3.5" /> In escrow
                      </p>
                      <p className="mt-1.5 font-display text-[26px] font-bold tracking-[-0.04em] text-cream">
                        $3,450<span className="text-cream/35">.00</span>
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-cream/55">
                      USD
                    </span>
                  </div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn(
                        "bar-grow h-full rounded-full bg-gradient-to-r from-mint to-lime",
                        stage === "releasing" && "animate-pulse",
                      )}
                      style={{ "--bar": stage === "releasing" ? "1" : "0.72" } as React.CSSProperties}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-cream/35">
                    <span>Secured 3h ago</span>
                    <span className="text-mint/80">Awaiting your approval</span>
                  </div>
                </div>

                {/* milestones */}
                <ul className="mt-3.5 space-y-0">
                  {[
                    { label: "Identity verified", meta: "Both parties", done: true },
                    { label: "Item delivered", meta: "Tracked · 2h ago", done: true },
                    { label: "Funds released", meta: "On your approval", done: stage === "releasing" },
                  ].map((s, i, arr) => (
                    <li key={s.label} className="relative flex items-center gap-3 pb-3 last:pb-0">
                      {i < arr.length - 1 && (
                        <span aria-hidden="true" className="absolute left-[9px] top-[19px] h-full w-px bg-white/10" />
                      )}
                      <span
                        className={cn(
                          "relative z-10 grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full border transition-colors duration-500",
                          s.done
                            ? "border-mint/60 bg-mint text-ink"
                            : "border-white/20 bg-ink-2 text-cream/25",
                        )}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span className="flex flex-1 items-center justify-between">
                        <span
                          className={cn(
                            "text-[12px] font-medium transition-colors",
                            s.done ? "text-cream/90" : "text-cream/45",
                          )}
                        >
                          {s.label}
                        </span>
                        <span className="text-[10px] text-cream/30">{s.meta}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* parties */}
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <Avatar src={faces.maya} alt="Maya, verified seller" className="h-6 w-6 ring-ink-2" />
                      <Avatar src={faces.daniel} alt="Daniel, verified buyer" className="h-6 w-6 ring-ink-2" />
                    </div>
                    <p className="text-[10.5px] text-cream/50">Maya <span className="text-cream/25">→</span> Daniel</p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-mint/85">
                    <Fingerprint className="h-3 w-3" /> KYC passed
                  </span>
                </div>

                <button
                  type="button"
                  onClick={release}
                  disabled={stage === "releasing"}
                  className="btn-shine group mt-3.5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-lime text-[13.5px] font-semibold text-ink transition-all duration-300 hover:bg-lime-bright disabled:cursor-wait"
                >
                  {stage === "releasing" ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                      Releasing to seller…
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                      Approve &amp; release funds
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
                    </>
                  )}
                </button>
                <div className="mt-2.5 flex items-center justify-between px-0.5">
                  <span className="text-[10px] text-cream/30">Try the demo — it&apos;s safe.</span>
                  <a href="#protection" className="text-[10px] font-medium text-cream/45 underline decoration-cream/20 underline-offset-2 transition hover:text-cream">
                    Something wrong? Open a dispute
                  </a>
                </div>
              </>
            ) : (
              <div className="slide-swap">
                <div className="relative mt-6 flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-7 text-center">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 overflow-hidden rounded-2xl"
                  >
                    {[...Array(10)].map((_, i) => (
                      <span
                        key={i}
                        className="checker-pop absolute h-1.5 w-1.5 rounded-full bg-lime/70"
                        style={{
                          left: `${10 + ((i * 83) % 80)}%`,
                          top: `${12 + ((i * 47) % 70)}%`,
                          animationDelay: `${i * 55}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="checker-pop relative grid h-16 w-16 place-items-center rounded-full border border-lime/30 bg-lime/15 text-lime">
                    <CheckCircle className="h-8 w-8" strokeWidth={1.5} />
                    <span aria-hidden="true" className="pulse-ring absolute inset-0 rounded-full text-lime/40" />
                  </span>
                  <p className="mt-4 font-display text-[21px] font-bold tracking-tight text-cream">Deal closed, cleanly.</p>
                  <p className="mt-1.5 max-w-[240px] text-[12px] leading-relaxed text-cream/45">
                    <span className="text-cream/80">$3,408.60</span> sent to Maya · receipt filed automatically.
                  </p>
                  <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-[10.5px] text-cream/45">
                    <Lock className="h-3 w-3" /> Both sides protected. Nothing left to chance.
                  </div>
                  <button
                    type="button"
                    onClick={() => setStage("open")}
                    className="mt-3 text-[11px] font-medium text-lime/80 underline decoration-lime/30 underline-offset-4 transition hover:text-lime"
                  >
                    Run the demo again
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                    <p className="text-[9.5px] uppercase tracking-wider text-cream/35">Buyer fee</p>
                    <p className="mt-0.5 text-[13px] font-semibold text-cream">$41.40</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                    <p className="text-[9.5px] uppercase tracking-wider text-cream/35">Time to payout</p>
                    <p className="mt-0.5 text-[13px] font-semibold text-cream">1m 48s</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* supporting chips */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <div className="group flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/70 p-2.5 shadow-[0_12px_30px_-20px_rgba(10,21,18,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-forest/10 text-forest">
            <Fingerprint className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[10.5px] font-semibold text-ink">Identity verified</p>
            <p className="truncate text-[9px] text-ink/45">Both parties · KYC</p>
          </div>
        </div>
        <div className="group flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/70 p-2.5 shadow-[0_12px_30px_-20px_rgba(10,21,18,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-lime text-ink">
            <Lightning className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[10.5px] font-semibold text-ink">Payout in 1m 48s</p>
            <p className="truncate text-[9px] text-ink/45">Instant rails · 42 currencies</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-10 sm:pt-32 lg:pt-36 lg:pb-16">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_-10%,#fbfbf5_0%,#f7f6f1_45%,#f2f1e8_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[620px] grid-fade opacity-70" />
        <div className="animate-drift absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-lime/25 blur-[110px]" />
        <div className="animate-floaty-slow absolute -right-20 top-40 h-[380px] w-[380px] rounded-full bg-mint/30 blur-[100px]" />
        <div className="absolute left-1/2 top-[70%] h-64 w-[800px] -translate-x-1/2 rounded-full bg-white/60 blur-[80px]" />
      </div>

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 xl:gap-14">
          {/* copy */}
          <div className="relative text-center lg:text-left">
            <div className="hero-in inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 py-1 pl-1 pr-3.5 shadow-[0_2px_10px_-4px_rgba(10,21,18,0.15)] backdrop-blur">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime">
                <Sparkle className="h-2.5 w-2.5" /> New
              </span>
              <span className="text-[11.5px] font-medium text-ink/60">
                Instant payouts in 42 currencies
              </span>
              <ArrowUpRight className="h-3 w-3 text-ink/35" />
            </div>

            <h1
              className="hero-in mt-6 font-display text-[clamp(2.3rem,7.6vw,5rem)] font-extrabold leading-[1.0] tracking-[-0.045em] text-ink sm:leading-[0.97]"
              style={{ animationDelay: "90ms" }}
            >
              Good faith,
              <br />
              <span className="relative inline-block">
                fully{" "}
                <span className="serif-accent relative inline-block pr-1 text-forest">
                  guaranteed.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 320 22"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1.5 left-0 h-[12px] w-[86%] text-lime"
                  >
                    <path
                      d="M3 15C60 6 145 3 213 6c38 2 74 6 104 11"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <p
              className="hero-in mx-auto mt-7 max-w-[30rem] text-[15px] leading-[1.7] text-muted sm:text-[16.5px] lg:mx-0"
              style={{ animationDelay: "170ms" }}
            >
              Vouch is the modern middleman for deals that matter. We hold the money,
              verify both sides, and release funds only when everyone delivers — so you
              can move with confidence, not crossed fingers.
            </p>

            <div
              className="hero-in mt-7 flex flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-3 lg:justify-start"
              style={{ animationDelay: "250ms" }}
            >
              <a
                href="#start"
                className="btn-shine group inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[14px] font-medium text-cream shadow-[0_14px_34px_-14px_rgba(10,21,18,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-3 sm:h-[54px] sm:text-[14.5px]"
              >
                Start a protected deal
                <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </span>
              </a>
              <a
                href="#product"
                className="group inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full border border-ink/12 bg-white/55 px-6 text-[14px] font-medium text-ink backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white sm:h-[54px] sm:text-[14.5px]"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/[0.07] text-ink transition-colors group-hover:bg-ink group-hover:text-cream">
                  <Play className="h-2.5 w-2.5 translate-x-[1px]" />
                </span>
                See a live deal
              </a>
            </div>

            <div
              className="hero-in mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
              style={{ animationDelay: "330ms" }}
            >
              <div className="flex items-center">
                <div className="flex -space-x-2.5">
                  <Avatar src={faces.maya} alt="Verified Vouch member Ines" className="ring-cream" />
                  <Avatar src={faces.daniel} alt="Verified Vouch member Daniel" className="ring-cream" />
                  <Avatar src={faces.ines} alt="Verified Vouch member Maya" className="ring-cream" />
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-[10px] font-semibold text-cream ring-2 ring-cream">
                    48k+
                  </span>
                </div>
                <div className="ml-3.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <Stars className="text-forest" />
                    <span className="text-[12px] font-semibold text-ink">4.9/5</span>
                  </div>
                  <p className="text-[11px] text-ink/45">12,400+ protected deals</p>
                </div>
              </div>
              <div aria-hidden="true" className="hidden h-8 w-px bg-ink/10 sm:block" />
              <p className="flex items-center gap-2 text-[11.5px] text-ink/50">
                <ShieldCheck className="h-4 w-4 text-forest" />
                Funds held in FDIC-insured accounts
              </p>
            </div>
          </div>

          {/* visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="hero-in relative" style={{ animationDelay: "180ms" }}>
              <DealCard />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-ink/[0.07] pt-6 text-[11px] text-ink/40 lg:mt-20">
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-forest" /> No account needed to start
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-forest" /> Both-party identity checks
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-forest" /> Human dispute team, 24/7
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-forest" /> 190+ countries supported
          </span>
        </div>
      </div>
    </section>
  );
}
