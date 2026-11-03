import { useState } from "react";
import { cn } from "../utils/cn";
import {
  ArrowUpRight,
  Avatar,
  Chat,
  CheckCircle,
  Clock,
  Eyebrow,
  Mail,
  Plus,
  Minus,
  Reveal,
  Scale,
  ShieldCheck,
} from "./primitives";

const faqs = [
  {
    q: "What exactly does Vouch do?",
    a: "Vouch is a neutral middleman. When two people agree on a deal, we hold the buyer's money in a segregated escrow account, verify who both parties are, and only release funds once the agreed conditions are met. Think of it as a referee who also happens to hold the money.",
  },
  {
    q: "How does that actually stop a scammer?",
    a: "Most scams need one thing: the ability to take money and disappear. Vouch removes that moment. The seller can't collect until delivery is confirmed, and the buyer can't claw back after receiving the goods. On top of that, both parties pass government ID, liveness and fraud screening before the first dollar moves — so throwaway accounts and repeat offenders never get a second attempt.",
  },
  {
    q: "When does the seller get paid?",
    a: "As soon as the buyer approves the deal, or automatically after the inspection window ends (3 days for goods, up to 14 for services) if no dispute is raised. Instant payouts land in minutes for Pro members; standard payouts settle within one business day. Sellers can see proof of funds the moment the deal is created.",
  },
  {
    q: "What if the item is fake, damaged or never arrives?",
    a: "Funds stay frozen. Open a dispute with two taps and upload what you have — the deal room already holds your messages, files and delivery confirmation. A resolution specialist reviews the evidence, usually within 24 hours, with a median full resolution of 2.4 business days. If the seller can't prove delivery, you're refunded in full.",
  },
  {
    q: "How much does it cost, and who pays?",
    a: "Personal deals are 1.2% with a $2 minimum; Pro is 0.9%; Business is volume-based from 0.6%. The fee is split 50/50 between both parties by default and can be assigned to one side during setup. Creating a deal costs nothing, and you'll always see the exact fee before anyone funds.",
  },
  {
    q: "Where is my money held — and is it safe?",
    a: "Funds are held in segregated, FDIC-insured custodial accounts with a regulated banking partner — never in Vouch's operating account. We reconcile daily, publish a trust report quarterly, and hold SOC 2 Type II. Vouch doesn't lend, invest or use deal funds for anything else. FDIC insurance is subject to the custodian's pass-through rules and per-depositor limits.",
  },
  {
    q: "How quickly can I start a deal?",
    a: "Most deals are live in under four minutes. Create the terms, invite the other party by email or link, and both sides complete identity checks in about two. We support buyers and sellers in 190+ countries, with payouts in 42 currencies.",
  },
];

const faces = [
  "https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100",
  "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100",
  "https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100",
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-x-clip border-t border-ink/[0.07] bg-cream-soft py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full bg-mint/20 blur-[120px]" />
      </div>
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Straight answers</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.9rem,4.2vw,3.2rem)] font-bold text-ink">
                The questions
                <br className="hidden sm:block" /> before the{" "}
                <span className="serif-accent text-forest">deal.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-muted">
                Still weighing it up? We wrote the honest version — no escrow fine print dressed
                up as marketing.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-7">
              <div className="relative overflow-hidden rounded-[24px] border border-ink/[0.08] bg-white/75 p-5 backdrop-blur">
                <div aria-hidden="true" className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-lime/20 blur-2xl" />
                <div className="relative">
                  <div className="flex -space-x-2.5">
                    {faces.map((src, i) => (
                      <Avatar key={i} src={src} alt="Vouch trust team member" className="h-8 w-8 ring-white" />
                    ))}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-lime ring-2 ring-white">
                      <Chat className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] font-semibold text-ink">Talk to a human first</p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink/45">
                    Our trust team answers in about 4 minutes, any hour. No sales script.
                  </p>
                  <a
                    href="mailto:trust@vouch.deals?subject=Question%20before%20my%20deal"
                    className="group mt-4 flex h-10 items-center justify-center gap-2 rounded-full bg-ink text-[12.5px] font-medium text-cream transition-colors hover:bg-ink-3"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Email the trust team
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9.5px] text-ink/35">
                    <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> 24/7</span>
                    <span className="flex items-center gap-1"><Scale className="h-2.5 w-2.5" /> No pressure</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="h-2.5 w-2.5" /> Independent</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <div className="divide-y divide-ink/[0.07] overflow-hidden rounded-[24px] border border-ink/[0.08] bg-white/60 backdrop-blur-sm">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} delay={Math.min(i * 45, 220)}>
                    <div className={cn("transition-colors duration-300", isOpen && "bg-white/80")}>
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${i}`}
                          id={`faq-button-${i}`}
                          className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-[18px]"
                        >
                          <span className={cn(
                            "text-[13.5px] font-medium leading-snug transition-colors sm:text-[14.5px]",
                            isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink",
                          )}>
                            {f.q}
                          </span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
                              isOpen
                                ? "rotate-180 border-ink bg-ink text-lime"
                                : "border-ink/10 bg-white text-ink/50 group-hover:border-ink/25 group-hover:text-ink",
                            )}
                          >
                            {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                          </span>
                        </button>
                      </h3>
                      <div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        aria-hidden={!isOpen}
                        className="accordion-body"
                        data-open={isOpen}
                      >
                        <div>
                          <div className="px-4 pb-5 pr-10 sm:px-5 sm:pb-5">
                            <p className="text-[12.5px] leading-[1.75] text-muted sm:text-[13px]">{f.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={120} className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-ink/15 px-4 py-3">
              <p className="flex items-center gap-2 text-[11.5px] text-ink/45">
                <CheckCircle className="h-4 w-4 text-forest" />
                Something we didn&apos;t cover?
              </p>
              <a href="mailto:trust@vouch.deals" className="text-[11.5px] font-semibold text-forest underline decoration-forest/25 underline-offset-4 hover:decoration-forest">
                Ask us directly
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
