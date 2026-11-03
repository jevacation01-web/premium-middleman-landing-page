import React, { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */

let sharedObserver: IntersectionObserver | null = null;
const revealRegistry = new Map<Element, () => void>();

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = revealRegistry.get(entry.target);
            if (cb) cb();
            sharedObserver?.unobserve(entry.target);
            revealRegistry.delete(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: "120px 0px 0px 0px" },
    );
  }
  return sharedObserver;
}

type RevealTag = "div" | "section" | "article" | "li" | "span" | "figure" | "header" | "footer" | "p" | "h2";

export function Reveal({
  children,
  className,
  delay = 0,
  dir = "up",
  as = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dir?: "up" | "left" | "right" | "scale";
  as?: RevealTag;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    const observer = getObserver();
    if (!el || !observer) return;
    revealRegistry.set(el, () => el.classList.add("is-visible"));
    observer.observe(el);
    // Safety: content already within the viewport shouldn't wait for a scroll.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94) {
      window.requestAnimationFrame(() => el.classList.add("is-visible"));
    }
    return () => {
      observer.unobserve(el);
      revealRegistry.delete(el);
    };
  }, []);

  const Tag = as as unknown as React.ElementType;

  return (
    <Tag
      id={id}
      ref={ref as never}
      className={cn("reveal", className)}
      data-dir={dir}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

type BtnVariant = "primary" | "lime" | "outline" | "ghost" | "dark-outline";
type BtnSize = "sm" | "md" | "lg";

const baseBtn =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-300 ease-out select-none disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<BtnSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-[54px] px-7 text-[15px]",
};

const variants: Record<BtnVariant, string> = {
  primary:
    "bg-ink text-cream shadow-[0_10px_30px_-12px_rgba(10,21,18,0.6)] hover:bg-ink-3 hover:shadow-[0_18px_40px_-14px_rgba(10,21,18,0.6)] hover:-translate-y-px active:translate-y-0",
  lime: "bg-lime text-ink shadow-[0_12px_34px_-14px_rgba(201,242,111,0.7)] hover:bg-lime-bright hover:-translate-y-px active:translate-y-0",
  outline:
    "border border-ink/15 bg-white/60 text-ink backdrop-blur-sm hover:bg-white hover:border-ink/25 hover:-translate-y-px",
  ghost: "text-ink/70 hover:text-ink hover:bg-ink/[0.05]",
  "dark-outline":
    "border border-white/20 text-cream/90 hover:text-white hover:bg-white/10 hover:border-white/35 backdrop-blur-sm",
};

export function btn(variant: BtnVariant = "primary", size: BtnSize = "md", extra?: string) {
  return cn(baseBtn, sizes[size], variants[variant], extra);
}

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center rounded-[11px] shadow-[0_4px_14px_-6px_rgba(10,21,18,0.6)]",
          light ? "bg-lime" : "bg-ink",
        )}
        aria-hidden="true"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.6 20 5.7v6.1c0 4.6-3.3 8.2-8 9.6-4.7-1.4-8-5-8-9.6V5.7L12 2.6Z"
            stroke={light ? "#0A1512" : "#C9F26F"}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m8.4 11.9 2.6 2.6 4.7-5.1"
            stroke={light ? "#0A1512" : "#C9F26F"}
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-[21px] font-extrabold tracking-[-0.055em]",
          light ? "text-cream" : "text-ink",
        )}
      >
        vouch
        <span className={light ? "text-lime" : "text-ink/40"}>.</span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow",
        tone === "dark" ? "text-ink/45" : "text-cream/45",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-[5px] w-[5px] rounded-full", tone === "dark" ? "bg-ink/30" : "bg-lime")}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-5 text-[clamp(1.9rem,4.2vw,3.35rem)] font-bold",
          tone === "dark" ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-muted" : "text-cream/55",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small shared bits                                                  */
/* ------------------------------------------------------------------ */

export function Stars({ className, count = 5 }: { className?: string; count?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-[3px]", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6z" />
        </svg>
      ))}
    </span>
  );
}

export function Avatar({
  src,
  alt,
  className,
  ring = "ring-cream",
}: {
  src: string;
  alt: string;
  className?: string;
  ring?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={96}
      height={96}
      className={cn(
        "h-9 w-9 rounded-full object-cover ring-2",
        ring,
        className,
      )}
    />
  );
}

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-mint/40 bg-mint/15 px-2 py-[3px] text-[10px] font-semibold text-forest",
        className,
      )}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon set                                                           */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string; strokeWidth?: number };
const iconBase = (className?: string) => cn("h-5 w-5", className);
const svgProps = (strokeWidth = 1.6) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ShieldCheck = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M12 3 20 6v5.5c0 4.6-3.3 8.2-8 9.5-4.7-1.3-8-4.9-8-9.5V6l8-3Z" />
    <path d="m8.8 11.7 2.4 2.4 4.2-4.6" />
  </svg>
);
export const Lock = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <rect x="4" y="10" width="16" height="11" rx="2.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 15v2" />
  </svg>
);
export const UserCheck = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <circle cx="9.5" cy="8" r="3.5" />
    <path d="M3 20c0-3.3 2.9-5.5 6.5-5.5 1.2 0 2.3.25 3.2.7" />
    <path d="m15.5 17.5 1.8 1.8 3.2-3.6" />
  </svg>
);
export const Chat = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H9l-4 3v-3H6a2.5 2.5 0 0 1-2-2.5v-7A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v7Z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
);
export const Globe = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);
export const Lightning = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z" />
  </svg>
);
export const ArrowRight = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
  </svg>
);
export const ArrowUpRight = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const Check = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M20 6.5 9.5 17 4 11.5" />
  </svg>
);
export const CheckCircle = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.3 2.7 2.7 5.3-5.8" />
  </svg>
);
export const Play = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={iconBase(className)} aria-hidden="true">
    <path d="M8.5 5.6c0-.9 1-1.4 1.7-1L19 11a1.2 1.2 0 0 1 0 2l-8.8 6.4c-.8.5-1.7 0-1.7-.9V5.6Z" />
  </svg>
);
export const Menu = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const Close = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Sparkle = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={iconBase(className)} aria-hidden="true">
    <path d="M12 2.5c.4 0 .7.3.8.7l1.2 4.6a4 4 0 0 0 2.9 2.9l4.6 1.2c.8.2.8 1.4 0 1.6l-4.6 1.2a4 4 0 0 0-2.9 2.9l-1.2 4.6c-.2.8-1.4.8-1.6 0l-1.2-4.6a4 4 0 0 0-2.9-2.9l-4.6-1.2c-.8-.2-.8-1.4 0-1.6l4.6-1.2a4 4 0 0 0 2.9-2.9l1.2-4.6c.1-.4.4-.7.8-.7Z" />
  </svg>
);
export const DocumentCheck = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z" />
    <path d="M13 3v6h6M8.5 14l2 2 3.5-3.8" />
  </svg>
);
export const Banknote = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 10v4M18 10v4" />
  </svg>
);
export const Scale = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M12 3v18M7 21h10M4 7h16" />
    <path d="M4 7 1.8 13a3.2 3.2 0 0 0 4.4 0L4 7ZM20 7l-2.2 6a3.2 3.2 0 0 0 4.4 0L20 7Z" />
  </svg>
);
export const Clock = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const Refresh = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M20 11a8 8 0 0 0-13.7-5.3L3 9M4 13a8 8 0 0 0 13.7 5.3L21 15" />
    <path d="M3 4v5h5M21 20v-5h-5" />
  </svg>
);
export const ChevronDown = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);
export const Fingerprint = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M6.7 8a6 6 0 0 1 10.6 2.5c.3 1.3.4 2.7.2 4M4.6 12a7.5 7.5 0 0 1 .6-3" />
    <path d="M8.4 20.2A10 10 0 0 0 10 15a2 2 0 0 1 3.9-.5c.2 1.2.2 2.4 0 3.6M17.4 17.2c.3-1.6.4-3.2.3-4.8" />
    <path d="M8.2 16.4A6 6 0 0 0 8 14a4 4 0 0 1 7.8-1.2M6 18.5c.6-.8 1-1.8 1.2-2.8" />
  </svg>
);
export const Users = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <circle cx="8.5" cy="8" r="3.2" />
    <path d="M2.5 19.5c0-3 2.7-5 6-5s6 2 6 5" />
    <path d="M16 5.4a3.2 3.2 0 0 1 0 6M17.5 14.8c2.3.5 4 2.1 4 4.7" />
  </svg>
);
export const Mail = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7.5 7.1 5.2a1.5 1.5 0 0 0 1.8 0L20 7.5" />
  </svg>
);
export const Plus = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M5 12h14" />
  </svg>
);
export const Camera = ({ className, strokeWidth }: IconProps) => (
  <svg {...svgProps(strokeWidth)} className={iconBase(className)}>
    <path d="M4 8h2.5l1.4-2h8.2l1.4 2H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19H4a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 4 8Z" />
    <circle cx="12" cy="13.5" r="3.4" />
  </svg>
);
