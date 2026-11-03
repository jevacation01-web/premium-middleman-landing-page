import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import {
  ArrowRight,
  ArrowUpRight,
  Avatar,
  Banknote,
  Chat,
  Check,
  CheckCircle,
  ChevronDown,
  DocumentCheck,
  Eyebrow,
  Fingerprint,
  Globe,
  Lightning,
  Lock,
  Reveal,
  Scale,
  ShieldCheck,
  Sparkle,
} from "./primitives";

const F = {
  maya: "https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
  daniel:
    "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120",
};

const tabs = [
  { id: "room", label: "Deal room", icon: Chat },
  { id: "verify", label: "Verification", icon: Fingerprint },
  { id: "payout", label: "Payouts", icon: Banknote },
] as const;

type TabId = (typeof tabs)[number]["id"];

const initialMessages = [
  {
    from: "them" as const,
    name: "Maya",
    text: "Morning! Serial number matches the listing — I've added a photo to the evidence log.",
    time: "09:41",
  },
  {
    from: "me" as const,
    name: "You",
    text: "Perfect. Vouch has my funds secured. Shipping label is in the deal room.",
    time: "09:43",
  },
  {
    from: "them" as const,
    name: "Maya",
    text: "Packed and dropped off. Tracking shows delivery by Thursday.",
    time: "09:52",
  },
];

function WindowChrome() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-ink/[0.07] bg-white/70 px-3 py-2.5 backdrop-blur sm:px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-[5px]">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
        </div>
        <div className="hidden items-center gap-1.5 rounded-md border border-ink/[0.07] bg-cream px-2 py-1 font-mono text-[9px] text-ink/40 sm:flex">
          <Lock className="h-2.5 w-2.5" />
          app.vouch.deals/room/VCH-2941
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full border border-mint/50 bg-mint/15 px-2 py-[3px] text-[9px] font-semibold text-forest">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" /> Live
        </span>
        <span className="hidden rounded-full border border-ink/10 bg-white px-2 py-[3px] text-[9px] font-medium text-ink/50 sm:inline">
          Share
        </span>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-[218px] shrink-0 border-r border-ink/[0.07] bg-cream-soft/80 p-3.5 md:block">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">Deal summary</p>
      <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-ink/[0.07] bg-white p-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-lime-bright to-mint text-[10px] font-bold text-forest">
          LQ
        </span>
        <div className="min-w-0">
          <p className="truncate text-[10.5px] font-semibold text-ink">Leica Q3 · Mint</p>
          <p className="text-[9px] text-ink/40">Goods · Single release</p>
        </div>
      </div>
      <div className="mt-2.5 rounded-xl bg-ink p-2.5 text-cream">
        <p className="text-[8.5px] uppercase tracking-[0.12em] text-cream/40">In escrow · USD</p>
        <p className="mt-1 font-display text-[18px] font-bold tracking-tight">$3,450.00</p>
        <div className="mt-2 flex items-center gap-1 text-[8.5px] text-mint/80">
          <ShieldCheck className="h-2.5 w-2.5" /> Protected by Vouch
        </div>
      </div>
      <p className="mt-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">Timeline</p>
      <ul className="mt-2 space-y-2.5">
        {[
          { t: "Terms agreed", d: "Today · 09:12", done: true },
          { t: "Funds secured", d: "Today · 09:18", done: true },
          { t: "Delivered", d: "Expected Thu", done: false },
          { t: "Release", d: "On your approval", done: false },
        ].map((s, i, arr) => (
          <li key={s.t} className="relative flex gap-2">
            {i < arr.length - 1 && (
              <span aria-hidden="true" className="absolute left-[5px] top-[11px] h-[calc(100%+6px)] w-px bg-ink/10" />
            )}
            <span
              className={cn(
                "relative z-10 mt-[3px] grid h-[11px] w-[11px] shrink-0 place-items-center rounded-full border",
                s.done ? "border-forest bg-forest text-lime" : "border-ink/20 bg-white",
              )}
            >
              {s.done && <Check className="h-1.5 w-1.5" strokeWidth={4} />}
            </span>
            <div>
              <p className={cn("text-[10px] font-medium", s.done ? "text-ink/80" : "text-ink/40")}>{s.t}</p>
              <p className="text-[8.5px] text-ink/35">{s.d}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3.5 flex items-center gap-1.5 rounded-lg border border-dashed border-ink/15 px-2 py-1.5 text-[9px] text-ink/45">
        <Scale className="h-3 w-3" /> Dispute window: 48h
      </div>
    </aside>
  );
}

/* ------------------------------- panels ------------------------------- */

function DealRoomPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "me" as const, name: "You", text, time: "Now" }]);
    setDraft("");
  };

  return (
    <div className="flex min-h-[368px] flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-ink/[0.06] px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <Avatar src={F.maya} alt="Maya, seller" className="h-6 w-6 ring-white" />
            <Avatar src={F.daniel} alt="Daniel, buyer" className="h-6 w-6 ring-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-ink">Maya R. &amp; Daniel K.</p>
            <p className="flex items-center gap-1 text-[9px] text-ink/40">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" /> Both online · verified
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1 rounded-md bg-cream px-2 py-1 text-[9px] text-ink/45 sm:flex">
          <DocumentCheck className="h-3 w-3 text-forest" /> 6 files
        </span>
      </div>

      <div ref={scroller} className="no-scrollbar flex-1 space-y-2.5 overflow-y-auto px-3 py-3.5 sm:px-4" aria-live="polite">
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/50 bg-mint/15 px-2.5 py-1 text-[9px] font-medium text-forest">
            <Lock className="h-2.5 w-2.5" /> Vouch secured $3,450.00 in escrow · 3h ago
          </span>
        </div>
        {messages.map((m, i) => (
          <div key={i} className={cn("flex items-end gap-1.5", m.from === "me" ? "justify-end" : "justify-start")}>
            {m.from === "them" && <Avatar src={F.maya} alt="" className="mb-0.5 h-5 w-5 ring-white" />}
            <div
              className={cn(
                "slide-swap max-w-[78%] rounded-2xl px-2.5 py-2 text-[10.5px] leading-relaxed",
                m.from === "me"
                  ? "rounded-br-sm bg-ink text-cream/90"
                  : "rounded-bl-sm border border-ink/[0.07] bg-white text-ink/70 shadow-[0_1px_2px_rgba(10,21,18,0.03)]",
              )}
            >
              {m.text}
              <span className={cn("mt-1 block text-[8px]", m.from === "me" ? "text-cream/35" : "text-ink/30")}>{m.time}</span>
            </div>
            {m.from === "me" && (
              <span className="mb-0.5 grid h-5 w-5 place-items-center rounded-full bg-forest text-[7.5px] font-semibold text-lime">You</span>
            )}
          </div>
        ))}
        <div className="flex items-center gap-1.5 rounded-xl border border-ink/[0.07] bg-white/80 p-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-cream text-forest">
            <DocumentCheck className="h-3 w-3" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9.5px] font-medium text-ink/75">tracking-label.pdf</p>
            <p className="text-[8px] text-ink/35">DHL Express · added by Daniel</p>
          </div>
          <span className="rounded-full bg-mint/20 px-1.5 py-0.5 text-[8px] font-medium text-forest">Verified</span>
        </div>
      </div>

      <form onSubmit={send} className="border-t border-ink/[0.07] bg-white/60 p-2.5 sm:px-3.5">
        <div className="flex items-center gap-2">
          <label htmlFor="demo-message" className="sr-only">
            Message both parties in the deal room
          </label>
          <input
            id="demo-message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Message both parties…"
            className="h-9 min-w-0 flex-1 rounded-full border border-ink/[0.09] bg-white px-3 text-[11px] text-ink placeholder:text-ink/30 focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/10"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-cream transition hover:bg-ink-3 disabled:opacity-100"
          >
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </button>
        </div>
        <p className="mt-1.5 px-2 text-[8.5px] text-ink/30">Demo room — your message stays in this browser.</p>
      </form>

      <div className="hidden items-center justify-between border-t border-ink/[0.06] bg-cream-soft px-3.5 py-2 sm:flex">
        <span className="text-[9px] text-ink/40">Delivery confirmed? Release when you&apos;re ready.</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-[9px] font-semibold text-lime">
          <CheckCircle className="h-2.5 w-2.5" /> Release $3,450.00
        </span>
      </div>
    </div>
  );
}

function VerifyPanel() {
  const checks = [
    "Government-issued ID",
    "Liveness & selfie match",
    "Address verification",
    "Sanctions & PEP screening",
  ];
  return (
    <div className="flex-1 p-3.5 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-bold tracking-tight text-ink">Both parties, verified</h3>
          <p className="mt-0.5 text-[10.5px] text-ink/45">Completed in a combined 3m 12s.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-mint/50 bg-mint/15 px-2 py-1 text-[9px] font-semibold text-forest">
          <CheckCircle className="h-3 w-3" /> All checks passed
        </span>
      </div>

      <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
        {[
          { src: F.maya, name: "Maya Rodríguez", role: "Seller", loc: "Berlin, DE", match: "99.2%" },
          { src: F.daniel, name: "Daniel Kim", role: "Buyer", loc: "Lisbon, PT", match: "98.7%" },
        ].map((p) => (
          <div key={p.name} className="rounded-xl border border-ink/[0.08] bg-white p-2.5">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Avatar src={p.src} alt={`${p.name}, ${p.role}`} className="h-9 w-9 ring-cream" />
                <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-forest text-lime ring-2 ring-white">
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-ink">{p.name}</p>
                <p className="text-[9px] text-ink/40">{p.role} · {p.loc}</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-md bg-cream px-2 py-1.5">
              <span className="text-[8.5px] text-ink/40">Face match</span>
              <span className="text-[9px] font-semibold text-forest">{p.match}</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {["ID", "Selfie", "Address", "PEP"].map((c) => (
                <span key={c} className="flex items-center gap-1 text-[8.5px] text-ink/50">
                  <Check className="h-2.5 w-2.5 text-forest" strokeWidth={3} /> {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3.5 rounded-xl border border-ink/[0.08] bg-cream-soft p-3">
        <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/40">
          <Fingerprint className="h-3 w-3" /> Screening stack
        </p>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {checks.map((c) => (
            <span key={c} className="flex items-center gap-1.5 text-[10px] text-ink/60">
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-mint/40 text-forest">
                <Check className="h-2 w-2" strokeWidth={4} />
              </span>
              {c}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-[9px] text-ink/35">
        <ShieldCheck className="h-3 w-3" /> ID documents are encrypted and deleted 90 days after the deal closes.
      </p>
    </div>
  );
}

const currencies = [
  { code: "EUR", rate: 0.9215, symbol: "€", rail: "SEPA Instant", eta: "~2 minutes", decimals: 2 },
  { code: "GBP", rate: 0.7892, symbol: "£", rail: "Faster Payments", eta: "~5 minutes", decimals: 2 },
  { code: "NGN", rate: 1584.2, symbol: "₦", rail: "NIP transfer", eta: "~12 minutes", decimals: 0 },
] as const;

function PayoutPanel() {
  const [idx, setIdx] = useState(0);
  const c = currencies[idx];
  const gross = 3450;
  const fee = gross * 0.012;
  const fx = (gross - fee) * 0.0035;
  const amount = (gross - fee - fx) * c.rate;

  return (
    <div className="flex-1 p-3.5 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-bold tracking-tight text-ink">Release &amp; payout</h3>
          <p className="mt-0.5 text-[10.5px] text-ink/45">Try a currency — rates update live.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ink px-2 py-1 text-[9px] font-medium text-lime">
          <Lightning className="h-2.5 w-2.5" /> Instant
        </span>
      </div>

      <div className="mt-3.5 grid gap-2.5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-xl border border-ink/[0.08] bg-white p-3">
          <p className="text-[9px] uppercase tracking-[0.12em] text-ink/35">Buyer pays</p>
          <p className="mt-1 font-display text-[20px] font-bold tracking-tight text-ink">$3,450.00</p>
          <p className="mt-1 flex items-center gap-1 text-[9px] text-ink/40"><Lock className="h-2.5 w-2.5" /> Held since 09:18</p>
        </div>
        <div className="hidden sm:block">
          <ArrowRight className="h-4 w-4 text-ink/25" />
        </div>
        <div className="rounded-xl border border-forest/25 bg-forest p-3 text-cream">
          <div className="flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.12em] text-cream/45">Seller receives</p>
            <div className="relative">
              <select
                aria-label="Payout currency"
                value={idx}
                onChange={(e) => setIdx(Number(e.target.value))}
                className="appearance-none rounded-md border border-white/15 bg-white/10 py-0.5 pl-1.5 pr-5 text-[9px] font-medium text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                {currencies.map((cc, i) => (
                  <option key={cc.code} value={i} className="text-ink">
                    {cc.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-cream/50" />
            </div>
          </div>
          <p className="mt-1 font-display text-[20px] font-bold tracking-tight text-lime">
            {c.symbol}
            {amount.toLocaleString("en-US", { maximumFractionDigits: c.decimals, minimumFractionDigits: c.decimals })}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[9px] text-cream/45"><Globe className="h-2.5 w-2.5" /> {c.rail} · {c.eta}</p>
        </div>
      </div>

      <div className="mt-2.5 rounded-xl border border-ink/[0.08] bg-cream-soft p-3">
        <div className="space-y-1.5">
          {[
            ["Deal amount", `$3,450.00`],
            ["Vouch protection fee (1.2%)", `−$${fee.toFixed(2)}`],
            [`FX spread (0.35%) · ${c.code}`, `−$${fx.toFixed(2)}`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-[10px]">
              <span className="text-ink/45">{k}</span>
              <span className="font-medium text-ink/75">{v}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-ink/10 pt-1.5 text-[10.5px]">
            <span className="font-semibold text-ink">Seller payout</span>
            <span className="font-semibold text-forest">
              {c.symbol}{amount.toLocaleString("en-US", { maximumFractionDigits: c.decimals, minimumFractionDigits: c.decimals })} {c.code}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[9px] text-ink/40">
        <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-forest" /> No hidden charges</span>
        <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-forest" /> Rate locked at release</span>
        <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-forest" /> Receipt filed to room</span>
      </div>
    </div>
  );
}

/* ------------------------------- section ------------------------------ */

export default function Showcase() {
  const [tab, setTab] = useState<TabId>("room");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    setTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="product" className="relative overflow-hidden bg-ink py-20 text-cream sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,#1b3a2c_0%,#0a1512_55%,#0a1512_100%)]" />
        <div className="absolute inset-0 grid-fade-dark opacity-70" />
        <div className="animate-drift absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-lime/10 blur-[110px]" />
        <div className="animate-floaty-slow absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-mint/10 blur-[100px]" />
        <div className="noise noise-light" />
      </div>

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <Eyebrow tone="light">Inside the product</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,4.2vw,3.35rem)] font-bold text-cream">
              A deal room that does the{" "}
              <span className="serif-accent text-lime">worrying</span> for you.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:pb-1">
            <p className="max-w-md text-[14.5px] leading-relaxed text-cream/50">
              Terms, money, identity and evidence in one shared space. Both sides see the same truth —
              so nobody has to rely on a screenshot or a promise.
            </p>
            <a href="#start" className="group mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-lime">
              Open your own deal room
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
          </Reveal>
        </div>

        {/* tab rail */}
        <Reveal delay={80} className="mt-9 flex justify-center lg:justify-start">
          <div
            role="tablist"
            aria-label="Product tour"
            className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/12 bg-white/[0.06] p-1 backdrop-blur-xl"
          >
            {tabs.map((t, i) => {
              const selected = tab === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  type="button"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[12.5px] font-medium transition-all duration-300",
                    selected
                      ? "bg-cream text-ink shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                      : "text-cream/55 hover:bg-white/[0.06] hover:text-cream",
                  )}
                >
                  <t.icon className={cn("h-3.5 w-3.5", selected ? "text-forest" : "text-cream/40")} strokeWidth={1.9} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* app window */}
        <Reveal dir="scale" delay={120} className="relative mt-6">
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 -top-6 bottom-10 -z-10 rounded-[40px] bg-lime/10 blur-3xl"
          />
          <div className="pointer-events-none absolute -top-3 left-[8%] z-20 hidden sm:block">
            <div className="glass-dark animate-floaty rounded-xl px-2.5 py-1.5 text-[9.5px] text-cream/80">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-lime" /> Evidence log · immutable</span>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-5 right-[6%] z-20 hidden sm:block">
            <div className="glass-dark animate-floaty-slow rounded-xl px-2.5 py-1.5 text-[9.5px] text-cream/80">
              <span className="flex items-center gap-1.5"><Sparkle className="h-3 w-3 text-lime" /> Human support · 24/7</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-white/15 bg-cream-soft shadow-[0_50px_100px_-40px_rgba(0,0,0,0.75)] sm:rounded-[26px]">
            <WindowChrome />
            <div className="flex min-h-[400px]">
              <Sidebar />
              <div
                role="tabpanel"
                id={`panel-${tab}`}
                aria-labelledby={`tab-${tab}`}
                tabIndex={0}
                className="flex min-w-0 flex-1 flex-col focus-visible:outline-none"
              >
                {tab === "room" && <DealRoomPanel />}
                {tab === "verify" && <VerifyPanel />}
                {tab === "payout" && <PayoutPanel />}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Fingerprint, title: "Bank-grade custody", body: "Funds held with a regulated custodian, never in an operating account." },
            { icon: DocumentCheck, title: "Evidence that holds up", body: "Every approval, file and message is timestamped and tamper-evident." },
            { icon: Scale, title: "Fairness, by design", body: "Disputes reviewed by humans within 24 hours, with funds frozen throughout." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm transition-colors hover:bg-white/[0.06]">
              <div className="flex items-center gap-2 text-lime">
                <f.icon className="h-4 w-4" strokeWidth={1.7} />
                <p className="text-[12px] font-semibold text-cream">{f.title}</p>
              </div>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-cream/40">{f.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
