import { Avatar, Eyebrow, Reveal, Stars } from "./primitives";
import { cn } from "../utils/cn";

const portraits = {
  ines: "https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
  daniel:
    "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
  maya: "https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
  marcus:
    "https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
};

const small = [
  {
    quote:
      "I sell camera bodies to buyers I've never met. Vouch shows me the funds are real before I ship — which makes the whole conversation easier.",
    name: "Daniel Kim",
    role: "Camera trader · Lisbon",
    avatar: portraits.daniel,
    tag: "Seller",
    stat: "$18,900 protected",
  },
  {
    quote:
      "We ran a $46k design project across three milestones with a client overseas. Everyone always knew exactly where the money was.",
    name: "Maya Rodríguez",
    role: "Founder, Studio Nord · Berlin",
    avatar: portraits.maya,
    tag: "Services",
    stat: "3 milestones, zero surprises",
  },
  {
    quote:
      "A $28,000 engine didn't match the listing. Vouch's review caught it and the funds never left escrow. Worth every basis point.",
    name: "Marcus Bell",
    role: "Classic car collector · London",
    avatar: portraits.marcus,
    tag: "Dispute resolved",
    stat: "Refunded in 3 days",
  },
];

const categories = [
  ["Watches", "$412M"],
  ["Vehicles", "$688M"],
  ["Freelance", "$316M"],
  ["Cameras", "$97M"],
  ["Sneakers", "$64M"],
  ["Digital assets", "$181M"],
];

export default function Testimonials() {
  return (
    <section id="stories" className="relative overflow-hidden border-t border-ink/[0.07] bg-cream-soft py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-mint/20 blur-[110px]" />
      </div>
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow>Proof, not promises</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,4.2vw,3.35rem)] font-bold text-ink">
              People who stopped gambling on{" "}
              <span className="serif-accent text-forest">strangers.</span>
            </h2>
          </Reveal>
          <Reveal delay={110} className="flex items-center gap-3 rounded-2xl border border-ink/[0.08] bg-white/70 px-4 py-3 backdrop-blur">
            <div>
              <div className="flex items-center gap-1.5">
                <Stars className="text-forest" />
                <span className="text-[14px] font-semibold text-ink">4.9 / 5</span>
              </div>
              <p className="mt-0.5 text-[11px] text-ink/45">2,400+ verified reviews</p>
            </div>
            <div aria-hidden="true" className="h-9 w-px bg-ink/10" />
            <p className="max-w-[110px] text-[10.5px] leading-snug text-ink/45">
              98% of members would deal again
            </p>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* featured */}
          <Reveal dir="left" className="lg:row-span-2">
            <figure className="lift spotlight group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#16362a_0%,#0a1512_60%,#0d1b16_100%)] p-6 text-cream sm:p-8">
              <div aria-hidden="true" className="absolute inset-0 grid-fade-dark opacity-50" />
              <div aria-hidden="true" className="animate-drift absolute -right-16 -top-16 h-52 w-52 rounded-full bg-lime/20 blur-3xl" />
              <div aria-hidden="true" className="noise noise-light" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <Stars className="text-lime" />
                  <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-cream/60">
                    Watch · $12,800
                  </span>
                </div>
                <span aria-hidden="true" className="serif-accent mt-5 block text-[64px] leading-[0.6] text-lime/25">
                  &ldquo;
                </span>
                <blockquote className="mt-1 font-display text-[21px] font-medium leading-[1.35] tracking-[-0.025em] text-cream sm:text-[25px]">
                  A seller sent a tracking number that never moved. Two days later, Vouch
                  refunded every cent — and shut the account down. I&apos;ll never buy a
                  watch from a stranger without it again.
                </blockquote>
              </div>
              <div className="relative mt-8">
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-mint/25 bg-mint/10 px-2.5 py-1 text-[10px] font-medium text-mint">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  Funds recovered in full
                </div>
                <figcaption className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <Avatar src={portraits.ines} alt="Ines Laurent" className="h-11 w-11 ring-white/20" />
                  <div>
                    <p className="text-[13.5px] font-semibold text-cream">Ines Laurent</p>
                    <p className="text-[11px] text-cream/45">Watch collector · Paris</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[9.5px] uppercase tracking-[0.12em] text-cream/35">Deals</p>
                    <p className="text-[13px] font-semibold text-lime">31</p>
                  </div>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          {small.map((t, i) => (
            <Reveal key={t.name} delay={80 + i * 80} className={cn(i === 2 && "lg:col-span-2")}>
              <figure className="lift spotlight group flex h-full flex-col justify-between rounded-[24px] border border-ink/[0.08] bg-white/75 p-5 backdrop-blur-sm sm:p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <Stars className="text-forest" />
                    <span className="rounded-full bg-cream px-2 py-0.5 text-[9.5px] font-medium text-ink/45">{t.tag}</span>
                  </div>
                  <blockquote className="mt-3 text-[13.5px] leading-relaxed text-ink/70">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption
                  className={cn(
                    "mt-5 flex items-center gap-2.5 border-t border-ink/[0.07] pt-4",
                    i === 2 && "sm:flex-row sm:items-center",
                  )}
                >
                  <Avatar src={t.avatar} alt={t.name} className="h-9 w-9 ring-white" />
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-ink">{t.name}</p>
                    <p className="truncate text-[10.5px] text-ink/45">{t.role}</p>
                  </div>
                  <span className="ml-auto hidden shrink-0 rounded-full border border-mint/40 bg-mint/15 px-2 py-1 text-[9.5px] font-medium text-forest sm:inline">
                    {t.stat}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-ink/[0.07] bg-white/50 px-5 py-4">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/35">Protected volume by category</span>
          {categories.map(([label, value]) => (
            <span key={label} className="flex items-baseline gap-1.5 text-[11px] text-ink/45">
              {label}
              <span className="font-semibold text-ink/75">{value}</span>
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
