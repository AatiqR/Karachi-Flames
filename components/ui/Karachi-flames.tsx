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
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  halalText?: string;
  socialLinks?: SocialLink[];
  logoSrc?: string;
  videoSrc?: string;
}

const DEFAULT_NAV: NavLink[] = [
  { label: "Locations", href: "/location" },
  { label: "Catering", href: "/catering" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_SOCIALS: SocialLink[] = [
  {
    platform: "instagram",
    href: "https://instagram.com/karachiflamesdmv",
  },
  {
    platform: "facebook",
    href: "https://facebook.com/karachiflamesdmv",
  },
  {
    platform: "tiktok",
    href: "https://tiktok.com/@karachiflamesdmv",
  },
];

const EMBER_PARTICLES: Array<{
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  opacity: number;
  color: string;
}> = [
  {
    left: "6%",
    size: 3,
    delay: "0s",
    duration: "7s",
    drift: "6px",
    opacity: 0.8,
    color: "#E08A2B",
  },
  {
    left: "16%",
    size: 2,
    delay: "1.4s",
    duration: "9s",
    drift: "-4px",
    opacity: 0.55,
    color: "#C1440E",
  },
  {
    left: "27%",
    size: 4,
    delay: "2.1s",
    duration: "6.5s",
    drift: "10px",
    opacity: 0.9,
    color: "#F0A040",
  },
  {
    left: "38%",
    size: 2,
    delay: "0.6s",
    duration: "8s",
    drift: "-8px",
    opacity: 0.5,
    color: "#E08A2B",
  },
  {
    left: "49%",
    size: 3,
    delay: "3.2s",
    duration: "7.5s",
    drift: "5px",
    opacity: 0.7,
    color: "#C1440E",
  },
  {
    left: "60%",
    size: 2,
    delay: "1.9s",
    duration: "10s",
    drift: "-6px",
    opacity: 0.55,
    color: "#F0A040",
  },
  {
    left: "71%",
    size: 4,
    delay: "0.2s",
    duration: "6s",
    drift: "12px",
    opacity: 0.85,
    color: "#E08A2B",
  },
  {
    left: "82%",
    size: 2,
    delay: "2.7s",
    duration: "9.5s",
    drift: "-5px",
    opacity: 0.5,
    color: "#C1440E",
  },
  {
    left: "92%",
    size: 3,
    delay: "4.1s",
    duration: "7.2s",
    drift: "7px",
    opacity: 0.7,
    color: "#F0A040",
  },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isInPageAnchor(href: string): boolean {
  return href.startsWith("#");
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileMenuIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-8 w-8 shrink-0"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={[
          "absolute inset-0 h-8 w-8",
          "transition-all duration-300",
          "ease-[cubic-bezier(0.4,0,0.2,1)]",
          open
            ? "rotate-90 scale-50 opacity-0"
            : "rotate-0 scale-100 opacity-100",
        ].join(" ")}
      >
        <path
          d="M4 8H28"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M4 16H28"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M4 24H28"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={[
          "absolute inset-0 h-8 w-8",
          "transition-all duration-300",
          "ease-[cubic-bezier(0.4,0,0.2,1)]",
          open
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0",
        ].join(" ")}
      >
        <path
          d="M6 6L26 26"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M26 6L6 26"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function KarachiFlamesHero({
  navLinks = DEFAULT_NAV,
  primaryCtaLabel = "Order Now",
  primaryCtaHref = "#order",
  halalText = "100% Zabiha Halal",
  socialLinks = DEFAULT_SOCIALS,
  logoSrc = "/logo.png",
  videoSrc = "/hero.mp4",
}: KarachiFlamesHeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuId = useId();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const timer = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
        ?.focus();
    }, 100);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);

    window.setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 50);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((current) => !current);
  }, []);

  const handlePanelKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          FOCUSABLE_SELECTOR,
        ),
      ).filter(
        (element) => !element.hasAttribute("disabled"),
      );

      if (focusable.length === 0) {
        return;
      }

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

  const renderSocialIcon = (
    platform: SocialLink["platform"],
  ) => {
    switch (platform) {
      case "instagram":
        return (
          <FaInstagram
            aria-hidden="true"
            className="h-4 w-4"
          />
        );

      case "facebook":
        return (
          <FaFacebookF
            aria-hidden="true"
            className="h-4 w-4"
          />
        );

      case "youtube":
        return (
          <FaYoutube
            aria-hidden="true"
            className="h-4 w-4"
          />
        );

      case "twitter":
        return (
          <FaXTwitter
            aria-hidden="true"
            className="h-4 w-4"
          />
        );

      case "tiktok":
        return (
          <FaTiktok
            aria-hidden="true"
            className="h-4 w-4"
          />
        );

      default:
        return null;
    }
  };

  const orderButton = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      <FaFire
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
      />

      <span>{primaryCtaLabel}</span>
    </>
  );

  return (
    <section
      id="hero"
      aria-label="Karachi Flames"
      className="relative isolate h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#0A0A0A] text-[#F5F1E8]"
    >
      <style>{`
        @keyframes kfEmberRise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }

          8% {
            opacity: var(--ember-o, 0.8);
          }

          85% {
            opacity: calc(var(--ember-o, 0.8) * 0.4);
          }

          100% {
            transform: translateY(-70vh) translateX(var(--drift, 6px));
            opacity: 0;
          }
        }

        .kf-ember {
          animation: kfEmberRise linear infinite;
          will-change: transform, opacity;
        }

        @keyframes kfSmokeDrift {
          0%,
          100% {
            transform: translateX(0) scale(1);
            opacity: 0.5;
          }

          33% {
            transform: translateX(18px) scale(1.06);
            opacity: 0.8;
          }

          66% {
            transform: translateX(-12px) scale(0.97);
            opacity: 0.6;
          }
        }

        .kf-smoke {
          animation: kfSmokeDrift ease-in-out infinite;
        }

        @keyframes kfHeatShimmer {
          0%,
          100% {
            transform: scaleY(1);
            opacity: 1;
          }

          50% {
            transform: scaleY(1.004);
            opacity: 0.7;
          }
        }

        .kf-heat {
          animation: kfHeatShimmer 4s ease-in-out infinite;
        }

        @keyframes kfLogoReveal {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
            filter: blur(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .kf-logo-reveal {
          animation: kfLogoReveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes kfLogoGlow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.75;
            transform: scale(1.04);
          }
        }

        .kf-logo-glow {
          animation: kfLogoGlow 4s ease-in-out infinite;
        }

        @keyframes kfBtnGlow {
          0%,
          100% {
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.3),
              inset 0 -2px 0 rgba(0,0,0,0.25),
              0 5px 18px -2px rgba(193,68,14,0.55),
              0 0 36px -10px rgba(224,138,43,0.35),
              0 2px 5px rgba(0,0,0,0.3);
          }

          50% {
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.3),
              inset 0 -2px 0 rgba(0,0,0,0.25),
              0 6px 24px -2px rgba(193,68,14,0.72),
              0 0 52px -8px rgba(224,138,43,0.52),
              0 2px 5px rgba(0,0,0,0.3);
          }
        }

        .kf-btn-glow {
          animation: kfBtnGlow 3s ease-in-out infinite;
        }

        @keyframes kfBadgeReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .kf-badge-reveal {
          animation: kfBadgeReveal 0.8s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes kfMenuIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .kf-menu-item {
          animation: kfMenuIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .kf-ember,
          .kf-smoke,
          .kf-heat,
          .kf-logo-reveal,
          .kf-logo-glow,
          .kf-btn-glow,
          .kf-badge-reveal,
          .kf-menu-item {
            animation: none !important;
          }
        }
      `}</style>

      <video
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_85%,rgba(224,138,43,0.16),transparent_70%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_45%,transparent_25%,rgba(0,0,0,0.68)_100%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_25%_65%,rgba(100,115,130,0.07),transparent_60%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_80%_55%,rgba(90,100,115,0.06),transparent_55%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/80" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {EMBER_PARTICLES.map((particle, index) => (
          <span
            key={index}
            className="kf-ember absolute bottom-0 rounded-full motion-reduce:hidden"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.size}px ${particle.color}88`,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              ["--drift" as string]: particle.drift,
              ["--ember-o" as string]: String(particle.opacity),
            }}
          />
        ))}

        <div
          className="kf-smoke absolute -left-24 bottom-0 h-[50%] w-[45%] rounded-full bg-[radial-gradient(ellipse,rgba(160,150,140,0.06),transparent_70%)]"
          style={{ animationDuration: "16s" }}
        />

        <div
          className="kf-smoke absolute -right-24 bottom-0 h-[45%] w-[40%] rounded-full bg-[radial-gradient(ellipse,rgba(150,140,130,0.05),transparent_70%)]"
          style={{
            animationDuration: "20s",
            animationDelay: "6s",
          }}
        />

        <div className="kf-heat absolute bottom-0 left-0 right-0 h-[30%] bg-[linear-gradient(to_top,rgba(224,138,43,0.03),transparent)]" />
      </div>

      {/* NAVBAR */}
      <header className="absolute inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top)]">
        <div className="relative mx-auto flex h-[82px] w-full max-w-[1800px] items-center justify-center px-4 sm:h-[92px] sm:px-7 lg:h-[105px] lg:px-10 xl:px-14">
          <nav
            aria-label="Primary navigation"
            className="hidden lg:block"
          >
            <ul className="flex items-center justify-center gap-5 xl:gap-7 2xl:gap-9">
              {navLinks.map((link) => {
                const content = (
                  <>
                    {link.label}

                    <span className="pointer-events-none absolute -bottom-2 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#E08A2B] to-[#C1440E] shadow-[0_0_8px_rgba(224,138,43,0.8)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </>
                );

                const className =
                  "group relative whitespace-nowrap px-1 py-3 text-[14px] font-extrabold uppercase tracking-[0.02em] text-white/95 transition-all duration-300 hover:text-[#F0A040] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B] xl:text-[15px]";

                return (
                  <li key={link.href}>
                    {isInPageAnchor(link.href) ? (
                      <a href={link.href} className={className}>
                        {content}
                      </a>
                    ) : (
                      <Link href={link.href} className={className}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* MOBILE MENU BUTTON
          IMPORTANT:
          This button is OUTSIDE the header stacking context.
          It sits above the black mobile menu.
      */}
      <button
        ref={menuButtonRef}
        type="button"
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={toggleMenu}
        className={[
          "fixed right-4 top-[calc(1rem+env(safe-area-inset-top))]",
          "sm:right-7 sm:top-[calc(1.5rem+env(safe-area-inset-top))]",
          "z-[100000]",
          "flex h-14 w-14 items-center justify-center",
          "rounded-full",
          "border border-white/30",
          "bg-black/80",
          "text-white",
          "backdrop-blur-xl",
          "shadow-[0_8px_35px_rgba(0,0,0,0.65)]",
          "transition-all duration-300",
          "hover:border-[#E08A2B]",
          "hover:bg-[#C1440E]",
          "hover:shadow-[0_0_30px_rgba(224,138,43,0.35)]",
          "active:scale-90",
          "focus:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[#E08A2B]",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-black",
          "lg:hidden",
        ].join(" ")}
      >
        <MobileMenuIcon open={menuOpen} />
      </button>

      {/* HERO CENTER */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-5">
        <div className="flex w-full max-w-3xl items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            <div
              aria-hidden="true"
              className="kf-logo-glow absolute left-1/2 top-1/2 h-[190px] w-[300px] -translate-x-1/2 -translate-y-[63%] rounded-full bg-[radial-gradient(ellipse,rgba(224,138,43,0.20),transparent_68%)] blur-2xl sm:h-[240px] sm:w-[420px] lg:h-[290px] lg:w-[540px]"
            />

            <div className="kf-logo-reveal relative h-[195px] w-[min(88vw,540px)] sm:h-[225px] sm:w-[min(80vw,610px)] md:h-[260px] md:w-[min(72vw,680px)] lg:h-[310px] lg:w-[min(64vw,760px)] xl:h-[345px] xl:w-[min(60vw,830px)]">
              <Image
                src={logoSrc}
                alt="Karachi Flames"
                fill
                priority
                quality={100}
                sizes="(max-width: 640px) 88vw, (max-width: 768px) 80vw, (max-width: 1024px) 72vw, (max-width: 1280px) 64vw, 60vw"
                className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.75)]"
              />
            </div>

            <div className="kf-logo-reveal mt-1.5 sm:mt-2 lg:mt-2.5">
              {isInPageAnchor(primaryCtaHref) ? (
                <a
                  href={primaryCtaHref}
                  className="kf-btn-glow group relative inline-flex min-h-[54px] items-center justify-center gap-3 overflow-hidden rounded-full px-9 font-sans text-[11.5px] font-bold uppercase tracking-[0.23em] text-[#F5F1E8] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B] active:scale-[0.97] sm:min-h-[57px] sm:px-11 sm:text-[12.5px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F09030 0%, #D4600E 45%, #B83D08 100%)",
                    border:
                      "1px solid rgba(255,180,100,0.30)",
                  }}
                >
                  {orderButton}
                </a>
              ) : (
                <Link
                  href={primaryCtaHref}
                  className="kf-btn-glow group relative inline-flex min-h-[54px] items-center justify-center gap-3 overflow-hidden rounded-full px-9 font-sans text-[11.5px] font-bold uppercase tracking-[0.23em] text-[#F5F1E8] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A2B] active:scale-[0.97] sm:min-h-[57px] sm:px-11 sm:text-[12.5px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F09030 0%, #D4600E 45%, #B83D08 100%)",
                    border:
                      "1px solid rgba(255,180,100,0.30)",
                  }}
                >
                  {orderButton}
                </Link>
              )}
            </div>

            <div className="kf-badge-reveal mt-2 sm:mt-3.5">
              <span className="inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-black/40 px-4 py-1.5 backdrop-blur-md sm:px-5 sm:py-2">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-300 sm:h-[18px] sm:w-[18px]">
                  <FaCheck
                    aria-hidden="true"
                    className="h-2 w-2 sm:h-2.5 sm:w-2.5"
                  />
                </span>

                <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.17em] text-emerald-100/90 sm:text-[9.5px]">
                  {halalText}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP SOCIALS */}
      <div className="pointer-events-auto absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 hidden -translate-x-1/2 lg:block">
        <div className="flex flex-col items-center">
          <ul className="flex items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    social.label ??
                    `Karachi Flames on ${social.platform}`
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.05] text-[#F5F1E8]/75 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#E08A2B]/60 hover:bg-[#E08A2B]/10 hover:text-[#E08A2B] hover:shadow-[0_0_18px_-2px_rgba(224,138,43,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B]"
                >
                  {renderSocialIcon(social.platform)}
                </a>
              </li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="mt-3 h-px w-16 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        </div>
      </div>

      {/* MOBILE SOCIALS */}
      <div className="absolute inset-x-0 bottom-0 z-30 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
        <ul className="flex items-center justify-center gap-2.5">
          {socialLinks.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  social.label ??
                  `Karachi Flames on ${social.platform}`
                }
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.14] bg-black/20 text-[#F5F1E8]/70 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#E08A2B]/60 hover:bg-[#E08A2B]/10 hover:text-[#E08A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A2B]"
              >
                {renderSocialIcon(social.platform)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[9990] h-[100dvh] w-screen overflow-hidden bg-[#080808] lg:hidden"
          onKeyDown={handlePanelKeyDown}
        >
          <div className="absolute inset-0 bg-[#080808]" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(224,138,43,0.11),transparent_40%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(193,68,14,0.09),transparent_45%)]"
          />

          <div
            ref={panelRef}
            className="relative flex h-full min-h-0 w-full flex-col px-5 pb-5 pt-[96px] sm:px-8 sm:pt-[105px]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E08A2B] sm:text-[10px]">
                Explore Karachi Flames
              </p>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overscroll-contain"
            >
              <ul className="w-full border-t border-white/10">
                {navLinks.map((link, index) => {
                  const content = (
                    <>
                      <span>{link.label}</span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#E08A2B] group-hover:bg-[#C1440E]">
                        <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </>
                  );

                  const className =
                    "kf-menu-item group flex w-full items-center justify-between py-[11px] text-[20px] font-black uppercase tracking-[-0.035em] text-white transition-all duration-300 hover:text-[#F0A040] sm:py-[13px]";

                  return (
                    <li
                      key={link.href}
                      className="border-b border-white/10"
                    >
                      {isInPageAnchor(link.href) ? (
                        <a
                          href={link.href}
                          onClick={closeMenu}
                          className={className}
                          style={{
                            animationDelay: `${index * 55}ms`,
                          }}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={className}
                          style={{
                            animationDelay: `${index * 55}ms`,
                          }}
                        >
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="shrink-0 pt-4">
              {isInPageAnchor(primaryCtaHref) ? (
                <a
                  href={primaryCtaHref}
                  onClick={closeMenu}
                  className="kf-btn-glow group relative flex min-h-[54px] w-full items-center justify-center gap-3 overflow-hidden rounded-full font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-[#F5F1E8] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F09030 0%, #D4600E 45%, #B83D08 100%)",
                    border:
                      "1px solid rgba(255,180,100,0.30)",
                  }}
                >
                  {orderButton}
                </a>
              ) : (
                <Link
                  href={primaryCtaHref}
                  onClick={closeMenu}
                  className="kf-btn-glow group relative flex min-h-[54px] w-full items-center justify-center gap-3 overflow-hidden rounded-full font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-[#F5F1E8] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F09030 0%, #D4600E 45%, #B83D08 100%)",
                    border:
                      "1px solid rgba(255,180,100,0.30)",
                  }}
                >
                  {orderButton}
                </Link>
              )}

              <div className="mt-3 flex items-center justify-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      social.label ??
                      `Karachi Flames on ${social.platform}`
                    }
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

