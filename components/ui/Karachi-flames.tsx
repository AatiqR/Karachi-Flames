"use client";

import Image from "next/image";
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

export interface KarachiFlamesHeroProps {
  navLinks?: NavLink[];
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  halalText?: string;
  socialLinks?: SocialLink[];
  logoSrc?: string;
  videoSrc?: string;
}

// ---------------------------------------------------------------------------
// Static defaults (deterministic — no Math.random / Date.now to avoid
// SSR ↔ CSR hydration mismatches)
// ---------------------------------------------------------------------------

const DEFAULT_NAV: NavLink[] = [
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "Catering", href: "#catering" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const DEFAULT_SOCIALS: SocialLink[] = [
  { platform: "instagram", href: "https://instagram.com" },
  { platform: "facebook", href: "https://facebook.com" },
  { platform: "tiktok", href: "https://tiktok.com" },
  { platform: "youtube", href: "https://youtube.com" },
  { platform: "twitter", href: "https://twitter.com" },
];

/** Fixed ember layout — position %, size px, timing, drift, opacity, colour */
const EMBER_PARTICLES: Array<{
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  opacity: number;
  color: string;
}> = [
  { left: "6%",  size: 3, delay: "0s",   duration: "7s",   drift: "6px",  opacity: 0.8,  color: "#E08A2B" },
  { left: "16%", size: 2, delay: "1.4s", duration: "9s",   drift: "-4px", opacity: 0.55, color: "#C1440E" },
  { left: "27%", size: 4, delay: "2.1s", duration: "6.5s", drift: "10px", opacity: 0.9,  color: "#F0A040" },
  { left: "38%", size: 2, delay: "0.6s", duration: "8s",   drift: "-8px", opacity: 0.5,  color: "#E08A2B" },
  { left: "49%", size: 3, delay: "3.2s", duration: "7.5s", drift: "5px",  opacity: 0.7,  color: "#C1440E" },
  { left: "60%", size: 2, delay: "1.9s", duration: "10s",  drift: "-6px", opacity: 0.55, color: "#F0A040" },
  { left: "71%", size: 4, delay: "0.2s", duration: "6s",   drift: "12px", opacity: 0.85, color: "#E08A2B" },
  { left: "82%", size: 2, delay: "2.7s", duration: "9.5s", drift: "-5px", opacity: 0.5,  color: "#C1440E" },
  { left: "92%", size: 3, delay: "4.1s", duration: "7.2s", drift: "7px",  opacity: 0.7,  color: "#F0A040" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function isInPageAnchor(href: string): boolean {
  return href.startsWith("#");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function KarachiFlamesHero({
  navLinks = DEFAULT_NAV,
  eyebrow = "Karachi · Charcoal Fire · Since the First Spark",
  headline = "Forged by Fire. Perfected by Flavor.",
  subheadline =
    "Charcoal-kissed seekh, boti and karahi, grilled the way Karachi has always done it. No shortcuts. No excuses.",
  primaryCtaLabel = "Order Now",
  primaryCtaHref = "#order",
  halalText = "Hand-Slaughtered Zabiha Halal",
  socialLinks = DEFAULT_SOCIALS,
  logoSrc = "/logo.png",
  videoSrc = "/hero.mp4",
}: KarachiFlamesHeroProps) {
  // -- State & refs --------------------------------------------------------
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // -- Effects -------------------------------------------------------------

  /** Lock body scroll & move focus into mobile panel; restore on close */
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current
      ?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      ?.focus();
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

  // -- Social icon renderer ------------------------------------------------

  const renderSocialIcon = (platform: SocialLink["platform"]) => {
    switch (platform) {
      case "instagram":
        return <FaInstagram aria-hidden="true" className="h-3.5 w-3.5" />;
      case "facebook":
        return <FaFacebookF aria-hidden="true" className="h-3.5 w-3.5" />;
      case "youtube":
        return <FaYoutube aria-hidden="true" className="h-3.5 w-3.5" />;
      case "twitter":
        return <FaXTwitter aria-hidden="true" className="h-3.5 w-3.5" />;
      case "tiktok":
        return <FaTiktok aria-hidden="true" className="h-3.5 w-3.5" />;
    }
  };

  // -- Render --------------------------------------------------------------

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate h-[100svh] w-full overflow-hidden bg-[#0A0A0A] text-[#F5F1E8]"
    >
      {/* ==================================================================
          Scoped keyframes — Tailwind v4 default theme doesn't provide these
      =================================================================== */}
      <style>{`
        @keyframes kfEmberRise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          8%   { opacity: var(--ember-o, 0.8); }
          85%  { opacity: calc(var(--ember-o, 0.8) * 0.4); }
          100% { transform: translateY(-70vh) translateX(var(--drift, 6px)); opacity: 0; }
        }
        .kf-ember { animation: kfEmberRise linear infinite; will-change: transform, opacity; }

        @keyframes kfGradientX {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .kf-gradient-text { background-size: 200% auto; animation: kfGradientX 9s ease-in-out infinite; }

        @keyframes kfPulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.25); }
        }
        .kf-glow-dot { animation: kfPulseGlow 2.4s ease-in-out infinite; }

        @keyframes kfSmokeDrift {
          0%, 100% { transform: translateX(0) scale(1);       opacity: 0.5; }
          33%      { transform: translateX(18px) scale(1.06); opacity: 0.8; }
          66%      { transform: translateX(-12px) scale(0.97); opacity: 0.6; }
        }
        .kf-smoke { animation: kfSmokeDrift ease-in-out infinite; }

        @keyframes kfHeatShimmer {
          0%, 100% { transform: scaleY(1);     opacity: 1; }
          50%      { transform: scaleY(1.004); opacity: 0.7; }
        }
        .kf-heat { animation: kfHeatShimmer 4s ease-in-out infinite; }

        @keyframes kfBtnGlow {
          0%, 100% { box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.3),
            inset 0 -2px 0 rgba(0,0,0,0.25),
            0 4px 16px -2px rgba(193,68,14,0.55),
            0 0 36px -10px rgba(224,138,43,0.35),
            0 2px 4px rgba(0,0,0,0.3);
          }
          50% { box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.3),
            inset 0 -2px 0 rgba(0,0,0,0.25),
            0 4px 20px -2px rgba(193,68,14,0.65),
            0 0 50px -8px rgba(224,138,43,0.45),
            0 2px 4px rgba(0,0,0,0.3);
          }
        }
        .kf-btn-glow { animation: kfBtnGlow 3s ease-in-out infinite; }

        @keyframes kfFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .kf-fade-up { animation: kfFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }

        .kf-menu-item {
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .kf-menu-item.kf-menu-active { opacity: 1; transform: translateX(0); }

        @media (prefers-reduced-motion: reduce) {
          .kf-ember, .kf-gradient-text, .kf-glow-dot, .kf-smoke, .kf-heat, .kf-btn-glow, .kf-fade-up {
            animation: none !important;
          }
          .kf-menu-item { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* ==================================================================
          VIDEO BACKGROUND
      =================================================================== */}
      <video
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* ==================================================================
          OVERLAY LAYERS
      =================================================================== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_85%,rgba(224,138,43,0.16),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_45%,transparent_25%,rgba(0,0,0,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_25%_65%,rgba(100,115,130,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_80%_55%,rgba(90,100,115,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/75" />
      </div>

      {/* ==================================================================
          ATMOSPHERIC EFFECTS — embers, smoke, heat shimmer
      =================================================================== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {EMBER_PARTICLES.map((p, i) => (
          <span
            key={i}
            className="kf-ember absolute bottom-0 rounded-full motion-reduce:hidden"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}88`,
              animationDelay: p.delay,
              animationDuration: p.duration,
              ["--drift" as string]: p.drift,
              ["--ember-o" as string]: String(p.opacity),
            }}
          />
        ))}
        <div
          className="kf-smoke absolute -left-24 bottom-0 h-[50%] w-[45%] rounded-full bg-[radial-gradient(ellipse,rgba(160,150,140,0.06),transparent_70%)]"
          style={{ animationDuration: "16s" }}
        />
        <div
          className="kf-smoke absolute -right-24 bottom-0 h-[45%] w-[40%] rounded-full bg-[radial-gradient(ellipse,rgba(150,140,130,0.05),transparent_70%)]"
          style={{ animationDuration: "20s", animationDelay: "6s" }}
        />
        <div className="kf-heat absolute bottom-0 left-0 right-0 h-[30%] bg-[linear-gradient(to_top,rgba(224,138,43,0.03),transparent)]" />
      </div>

      {/* ==================================================================
          HEADER / NAVBAR — logo only, no wordmark
      =================================================================== */}
      <header className="absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-black/55 via-black/15 to-transparent pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5 sm:px-8 sm:py-3">
          {/* Logo only — no text */}
          <Link
            href="/"
            aria-label="Karachi Flames — home"
            className="group inline-flex shrink-0 items-center rounded-sm transition-transform duration-300 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B]"
          >
            <div className="relative h-[68px] w-[168px] shrink-0 sm:h-[84px] sm:w-[210px] lg:h-[96px] lg:w-[240px]">
              <Image
                src={logoSrc}
                alt="Karachi Flames"
                fill
                className="object-contain object-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                sizes="(max-width: 640px) 168px, (max-width: 1024px) 210px, 240px"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:self-center">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => {
                const inner = (
                  <>
                    {link.label}
                    <span className="pointer-events-none absolute -bottom-1.5 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#E08A2B] to-[#C1440E] shadow-[0_0_8px_rgba(224,138,43,0.8)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </>
                );
                const cls =
                  "group relative font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[#F0A040] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B]";

                return (
                  <li key={link.href}>
                    {isInPageAnchor(link.href) ? (
                      <a href={link.href} className={cls}>{inner}</a>
                    ) : (
                      <Link href={link.href} className={cls}>{inner}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={openMenu}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:border-[#E08A2B]/60 hover:text-[#E08A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B] lg:hidden"
          >
            <HiBars3 aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ==================================================================
          DESKTOP SOCIAL RAIL — vertical, left side
      =================================================================== */}
      <div className="pointer-events-auto absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col items-center gap-3">
          {socialLinks.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label ?? `Karachi Flames on ${social.platform}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.05] text-[#F5F1E8]/75 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#E08A2B]/60 hover:bg-[#E08A2B]/10 hover:text-[#E08A2B] hover:shadow-[0_0_18px_-2px_rgba(224,138,43,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B]"
              >
                {renderSocialIcon(social.platform)}
              </a>
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-10 w-px bg-gradient-to-b from-white/20 to-transparent"
        />
      </div>

      {/* ==================================================================
          HERO CONTENT — vertically centered, single viewport
      =================================================================== */}
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <p
          className="kf-fade-up mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-black/30 px-4 py-1.5 font-sans text-[9px] uppercase tracking-[0.32em] text-[#F5F1E8]/75 backdrop-blur-md sm:text-[10px]"
          style={{ animationDelay: "0.05s" }}
        >
          <span aria-hidden="true" className="kf-glow-dot inline-block h-1.5 w-1.5 rounded-full bg-[#E08A2B]" />
          {eyebrow}
        </p>

        {/* Headline */}
        <h1
          className="kf-fade-up max-w-4xl font-['Cormorant_Garamond',Georgia,'Times_New_Roman',serif] text-[clamp(2.6rem,9vw,5.5rem)] font-semibold leading-[1.04] tracking-tight"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="kf-gradient-text bg-gradient-to-r from-[#F0A040] via-[#F5F1E8] to-[#E08A2B] bg-clip-text text-transparent">
            {headline}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="kf-fade-up mx-auto mt-3 max-w-md font-sans text-[13px] leading-relaxed text-[#F5F1E8]/65 sm:text-sm"
          style={{ animationDelay: "0.25s" }}
        >
          {subheadline}
        </p>

        {/* Single ORDER NOW CTA */}
        <div className="kf-fade-up mt-6 w-full sm:w-auto" style={{ animationDelay: "0.35s" }}>
          <a
            href={primaryCtaHref}
            className="kf-btn-glow group relative inline-flex min-h-[52px] w-full items-center justify-center gap-3 overflow-hidden rounded-full px-9 font-sans text-[12.5px] font-bold uppercase tracking-[0.24em] text-[#F5F1E8] transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B] active:scale-[0.97] active:translate-y-0.5 sm:w-auto"
            style={{
              background: "linear-gradient(180deg, #F09030 0%, #D4600E 45%, #B83D08 100%)",
              border: "1px solid rgba(255,180,100,0.25)",
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.3),
                inset 0 -2px 0 rgba(0,0,0,0.25),
                0 4px 16px -2px rgba(193,68,14,0.55),
                0 0 36px -10px rgba(224,138,43,0.35),
                0 2px 4px rgba(0,0,0,0.3)
              `,
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <FaFire aria-hidden="true" className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            <span>{primaryCtaLabel}</span>
          </a>
        </div>

        {/* Halal badge */}
        <span
          className="kf-fade-up mt-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-black/35 px-4 py-1.5 backdrop-blur-md transition-colors duration-300 hover:border-emerald-400/50"
          style={{ animationDelay: "0.45s" }}
        >
          <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500/20 text-emerald-300">
            <FaCheck aria-hidden="true" className="h-2 w-2" />
          </span>
          <span className="font-sans text-[9.5px] font-medium uppercase tracking-[0.2em] text-emerald-100/85">
            {halalText}
          </span>
        </span>
      </div>

      {/* ==================================================================
          MOBILE SOCIAL STRIP — footer, hidden on desktop (rail used instead)
      =================================================================== */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-[max(0.9rem,env(safe-area-inset-bottom))] lg:hidden">
        <ul className="flex items-center justify-center gap-2.5">
          {socialLinks.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label ?? `Karachi Flames on ${social.platform}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-[#F5F1E8]/65 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#E08A2B]/60 hover:text-[#E08A2B]"
              >
                {renderSocialIcon(social.platform)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ==================================================================
          MOBILE MENU — full-screen, premium, accessible
      =================================================================== */}
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
            "absolute inset-0 bg-[#0A0A0A]/[0.97] backdrop-blur-2xl transition-opacity duration-400",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        <div
          ref={panelRef}
          className="relative flex h-full w-full flex-col px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] will-change-[transform,opacity]"
          style={{
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease-out",
            transform: menuOpen ? "translateX(0)" : "translateX(32px)",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Karachi Flames — home" onClick={closeMenu} className="inline-flex items-center">
              <div className="relative h-[52px] w-[130px]">
                <Image src={logoSrc} alt="Karachi Flames" fill className="object-contain object-left" sizes="130px" />
              </div>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-[#F5F1E8] transition-all duration-300 hover:border-[#E08A2B]/60 hover:text-[#E08A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B]"
            >
              <HiXMark aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Primary" className="mt-12 flex-1">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, idx) => {
                const staggerDelay = `${idx * 60}ms`;
                const content = (
                  <>
                    {link.label}
                    <span className="mt-1 block h-[1px] w-0 bg-gradient-to-r from-[#E08A2B] to-transparent transition-all duration-500 group-hover:w-full" />
                  </>
                );
                const cls =
                  "kf-menu-item group block border-b border-white/[0.06] py-5 font-['Cormorant_Garamond',Georgia,'Times_New_Roman',serif] text-3xl font-semibold uppercase tracking-tight text-[#F5F1E8] transition-colors duration-300 hover:text-[#E08A2B]";

                return (
                  <li key={link.href} style={{ transitionDelay: menuOpen ? staggerDelay : "0ms" }}>
                    {isInPageAnchor(link.href) ? (
                      <a href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu} className={cls}>{content}</a>
                    ) : (
                      <Link href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu} className={cls}>{content}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-6">
            <ul className="flex items-center justify-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label ?? `Karachi Flames on ${social.platform}`}
                    tabIndex={menuOpen ? 0 : -1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-[#F5F1E8]/60 transition-all duration-300 hover:scale-110 hover:border-[#E08A2B]/60 hover:text-[#E08A2B] hover:shadow-[0_0_20px_-2px_rgba(224,138,43,0.7)]"
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={primaryCtaHref}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full font-sans text-sm font-bold uppercase tracking-[0.25em] text-[#F5F1E8] transition-all duration-300 hover:brightness-110"
              style={{
                background: "linear-gradient(180deg, #F09030 0%, #D4600E 45%, #B83D08 100%)",
                border: "1px solid rgba(255,180,100,0.25)",
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.3),
                  inset 0 -2px 0 rgba(0,0,0,0.25),
                  0 4px 16px -2px rgba(193,68,14,0.55),
                  0 0 36px -10px rgba(224,138,43,0.35)
                `,
              }}
            >
              <FaFire aria-hidden="true" className="h-4 w-4" />
              {primaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}