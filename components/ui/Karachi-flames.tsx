"use client";

/**
 * KarachiFlamesHero
 * ------------------------------------------------------------------------
 * Single-file, self-contained Next.js (App Router) hero section.
 *
 * Stack: Next.js + React + TypeScript + Tailwind CSS + react-icons only.
 * No framer-motion / motion, no lucide-react, no separate component files.
 * All motion is CSS keyframes/transitions; a small <style> block supplies
 * the handful of keyframes Tailwind's default theme doesn't ship with
 * (ember float, animated gradient, glow pulse) — this is the one
 * "necessary" inline styling exception called for by the brief, since a
 * single file can't extend tailwind.config.
 * ------------------------------------------------------------------------
 */

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  FaCheck,
  FaChevronDown,
  FaFacebookF,
  FaFire,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { HiBars3, HiXMark } from "react-icons/hi2";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  platform: "instagram" | "facebook" | "youtube" | "twitter" | "tiktok";
  href: string;
  label?: string;
}

interface TrustStat {
  value: string;
  label: string;
}

export interface KarachiFlamesHeroProps {
  announcementText?: string;
  navLinks?: NavLink[];
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  halalText?: string;
  trustStats?: TrustStat[];
  socialLinks?: SocialLink[];
}

// ---------------------------------------------------------------------------
// Static defaults (kept deterministic — no Math.random / Date.now in
// render, which would cause SSR/CSR hydration mismatches)
// ---------------------------------------------------------------------------

const DEFAULT_NAV: NavLink[] = [
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "Catering", href: "#catering" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const DEFAULT_STATS: TrustStat[] = [
  { value: "50K+", label: "Diners Fed" },
  { value: "12", label: "Locations" },
  { value: "98%", label: "Satisfaction" },
  { value: "15+", label: "Years Grilling" },
];

const DEFAULT_SOCIALS: SocialLink[] = [
  { platform: "instagram", href: "https://instagram.com" },
  { platform: "facebook", href: "https://facebook.com" },
  { platform: "youtube", href: "https://youtube.com" },
  { platform: "twitter", href: "https://twitter.com" },
];

// Fixed ember-particle layout (position %, size px, animation delay/duration).
// Deterministic on purpose — see hydration note above.
const EMBER_PARTICLES: Array<{
  left: string;
  size: number;
  delay: string;
  duration: string;
}> = [
  { left: "8%", size: 3, delay: "0s", duration: "7s" },
  { left: "18%", size: 2, delay: "1.4s", duration: "9s" },
  { left: "32%", size: 4, delay: "2.1s", duration: "6.5s" },
  { left: "47%", size: 2, delay: "0.6s", duration: "8s" },
  { left: "61%", size: 3, delay: "3.2s", duration: "7.5s" },
  { left: "74%", size: 2, delay: "1.9s", duration: "10s" },
  { left: "86%", size: 4, delay: "0.2s", duration: "6s" },
  { left: "93%", size: 2, delay: "2.7s", duration: "9.5s" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ---------------------------------------------------------------------------
// Pure helpers (not components — safe to keep top-level)
// ---------------------------------------------------------------------------

function isInPageAnchor(href: string): boolean {
  return href.startsWith("#");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function KarachiFlamesHero({
  announcementText = "100% ZABIHA HALAL · NOW DELIVERING CITYWIDE",
  navLinks = DEFAULT_NAV,
  eyebrow = "Karachi · BBQ · Since the first spark",
  headline = "Fire-Forged Flavor, Karachi Style",
  subheadline = "Charcoal-kissed seekh, boti and karahi — grilled the way Karachi has always done it. No shortcuts, no excuses.",
  primaryCtaLabel = "Order Now",
  primaryCtaHref = "#order",
  secondaryCtaLabel = "View Menu",
  secondaryCtaHref = "#menu",
  halalText = "100% Zabiha Halal Certified",
  trustStats = DEFAULT_STATS,
  socialLinks = DEFAULT_SOCIALS,
}: KarachiFlamesHeroProps) {
  // -- State & refs ----------------------------------------------------
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // -- Effects -----------------------------------------------------------

  // Swap header background once the user scrolls past the announcement bar.
  // rAF-throttled + passive to stay off the main-thread critical path.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll and move focus into the mobile panel while it's open;
  // restore both when it closes.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  // -- Handlers ------------------------------------------------------------

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  const handlePanelKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [closeMenu],
  );

  // -- Render ------------------------------------------------------------

  return (
    <section
      aria-label="Hero"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#0A0A0A] text-[#F5F1E8]"
    >
      {/* Scoped keyframes Tailwind's default theme doesn't provide */}
      <style>{`
        @keyframes kfEmberRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-70vh) translateX(6px); opacity: 0; }
        }
        @keyframes kfGradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes kfPulseGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .kf-ember { animation: kfEmberRise linear infinite; }
        .kf-gradient-text {
          background-size: 200% auto;
          animation: kfGradientX 6s ease-in-out infinite;
        }
        .kf-glow-dot { animation: kfPulseGlow 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .kf-ember, .kf-gradient-text, .kf-glow-dot {
            animation: none !important;
          }
        }
      `}</style>

      {/* ---------------------------------------------------------------
          Background: layered radial glow + faint grid + rising embers
      --------------------------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(224,138,43,0.16),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_80%_85%,rgba(193,68,14,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,241,232,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,232,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]" />

        {EMBER_PARTICLES.map((p, i) => (
          <span
            key={i}
            className="kf-ember absolute bottom-0 rounded-full bg-[#E08A2B] shadow-[0_0_8px_2px_rgba(224,138,43,0.7)] motion-reduce:hidden"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------------
          Header
      --------------------------------------------------------------- */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-500",
          scrolled
            ? "border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md"
            : "bg-gradient-to-b from-black/50 to-transparent",
        ].join(" ")}
      >
        {announcementText && (
          <div className="border-b border-white/10 bg-black/40">
            <p className="mx-auto max-w-7xl px-4 py-1.5 text-center font-sans text-[10px] uppercase tracking-[0.28em] text-[#F5F1E8]/80 sm:text-[11px]">
              {announcementText}
            </p>
          </div>
        )}

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:py-4">
          <Link
            href="/"
            aria-label="Karachi Flames — home"
            className="flex shrink-0 items-center gap-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#E08A2B]/50 bg-black/40 shadow-[0_0_16px_-2px_rgba(224,138,43,0.55)]">
              <FaFire aria-hidden="true" className="h-4 w-4 text-[#E08A2B]" />
            </span>
            <span className="font-sans text-xl font-black uppercase leading-none tracking-[0.12em]">
              Karachi<span className="text-[#C1440E]">·</span>Flames
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {isInPageAnchor(link.href) ? (
                    <a
                      href={link.href}
                      className="group relative font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-[#F5F1E8]/85 transition-colors hover:text-[#F5F1E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B]"
                    >
                      {link.label}
                      <span className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[#E08A2B] transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="group relative font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-[#F5F1E8]/85 transition-colors hover:text-[#F5F1E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B]"
                    >
                      {link.label}
                      <span className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[#E08A2B] transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={primaryCtaHref}
            className="hidden items-center gap-2 border border-[#F5F1E8]/70 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] transition-all hover:border-[#E08A2B] hover:text-[#E08A2B] hover:shadow-[0_0_20px_-4px_rgba(224,138,43,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B] lg:inline-flex"
          >
            <FaFire aria-hidden="true" className="h-3.5 w-3.5" />
            {primaryCtaLabel}
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-black/30 transition-colors hover:border-[#E08A2B] hover:text-[#E08A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B] lg:hidden"
          >
            <HiBars3 aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------------------
          Main hero content
      --------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-10 text-center sm:pt-36">
        <p className="mb-5 inline-flex animate-[fade-in_0.7s_ease-out] items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.32em] text-[#F5F1E8]/80 backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="kf-glow-dot inline-block h-1.5 w-1.5 rounded-full bg-[#E08A2B]"
          />
          {eyebrow}
        </p>

        <h1 className="max-w-4xl font-sans text-[clamp(2.75rem,9vw,7rem)] font-black uppercase leading-[0.94] tracking-tight">
          <span className="kf-gradient-text bg-gradient-to-r from-[#E08A2B] via-[#F5F1E8] to-[#C1440E] bg-clip-text text-transparent">
            {headline}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-sans text-sm text-[#F5F1E8]/75 sm:text-base">
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={primaryCtaHref}
            className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#C1440E] px-9 font-sans text-sm font-bold uppercase tracking-[0.24em] text-[#F5F1E8] transition-transform duration-200 hover:scale-[1.03] hover:shadow-[0_0_30px_-6px_rgba(193,68,14,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B] active:scale-[0.98] sm:w-auto"
          >
            <FaFire
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-rotate-12"
            />
            {primaryCtaLabel}
          </a>
          <a
            href={secondaryCtaHref}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 border border-[#F5F1E8]/40 px-9 font-sans text-sm font-bold uppercase tracking-[0.24em] text-[#F5F1E8] transition-all hover:border-[#F5F1E8] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B] sm:w-auto"
          >
            {secondaryCtaLabel}
          </a>
        </div>

        {/* Halal badge */}
        <span className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-black/45 px-3.5 py-1.5 backdrop-blur-sm">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-300">
            <FaCheck aria-hidden="true" className="h-2.5 w-2.5" />
          </span>
          <span className="font-sans text-[10.5px] uppercase tracking-[0.24em] text-emerald-100/90">
            {halalText}
          </span>
        </span>

        {/* Trust stats */}
        <ul className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {trustStats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-4 backdrop-blur-sm transition-colors hover:border-[#E08A2B]/40"
            >
              <p className="font-sans text-2xl font-black text-[#F5F1E8] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#F5F1E8]/60">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------------------------------------------------------
          Footer bar: socials + scroll cue
      --------------------------------------------------------------- */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-gradient-to-t from-black/70 to-transparent pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-4 sm:flex-row sm:justify-between">
          <ul className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label ?? `Karachi Flames on ${social.platform}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#F5F1E8]/80 transition-all hover:border-[#E08A2B] hover:text-[#E08A2B] hover:shadow-[0_0_16px_-2px_rgba(224,138,43,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B]"
                >
                  {social.platform === "instagram" && (
                    <FaInstagram aria-hidden="true" className="h-4 w-4" />
                  )}
                  {social.platform === "facebook" && (
                    <FaFacebookF aria-hidden="true" className="h-4 w-4" />
                  )}
                  {social.platform === "youtube" && (
                    <FaYoutube aria-hidden="true" className="h-4 w-4" />
                  )}
                  {social.platform === "twitter" && (
                    <FaXTwitter aria-hidden="true" className="h-4 w-4" />
                  )}
                  {social.platform === "tiktok" && (
                    <FaTiktok aria-hidden="true" className="h-4 w-4" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#hero"
            aria-label="Scroll to explore"
            className="motion-safe:animate-bounce inline-flex items-center gap-2 text-[#F5F1E8]/60 transition-colors hover:text-[#E08A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B]"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.28em]">
              Scroll
            </span>
            <FaChevronDown aria-hidden="true" className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* ---------------------------------------------------------------
          Mobile menu (always mounted, transitioned via classes — avoids
          needing an animation library for enter/exit states)
      --------------------------------------------------------------- */}
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        onKeyDown={handlePanelKeyDown}
        className={[
          "fixed inset-0 z-50 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
          className={[
            "absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          ref={panelRef}
          className={[
            "relative flex h-full w-full flex-col px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "translate-x-4 opacity-0",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-lg font-black uppercase tracking-[0.12em] text-[#F5F1E8]">
              Karachi<span className="text-[#C1440E]">·</span>Flames
            </span>
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-[#F5F1E8] hover:border-[#E08A2B] hover:text-[#E08A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B]"
            >
              <HiXMark aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Primary" className="mt-10 flex-1">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {isInPageAnchor(link.href) ? (
                    <a
                      href={link.href}
                      tabIndex={menuOpen ? 0 : -1}
                      onClick={closeMenu}
                      className="block border-b border-white/10 py-4 font-sans text-3xl font-black uppercase tracking-tight text-[#F5F1E8] transition-colors hover:text-[#E08A2B]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      tabIndex={menuOpen ? 0 : -1}
                      onClick={closeMenu}
                      className="block border-b border-white/10 py-4 font-sans text-3xl font-black uppercase tracking-tight text-[#F5F1E8] transition-colors hover:text-[#E08A2B]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={primaryCtaHref}
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="flex min-h-[54px] w-full items-center justify-center gap-2 bg-[#C1440E] font-sans text-sm font-bold uppercase tracking-[0.24em] text-[#F5F1E8]"
          >
            <FaFire aria-hidden="true" className="h-4 w-4" />
            {primaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}