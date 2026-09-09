"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  type ComponentType,
} from "react";

/*
 * KARACHI FLAMES — LOCATIONS
 *
 * Only the permanent restaurant location is shown here.
 * The food truck and pop-up entries have been removed.
 * Replace the placeholder location information below
 * with the confirmed client information if it changes.
 */

type SimpleLocation = {
  id: string;
  typeLabel: "Restaurant";
  name: string;
  address: string[];
  directionsUrl: string | null;
};

/* =========================================================
   LOCATION DATA
   ========================================================= */

const location: SimpleLocation = {
  id: "restaurant-1",
  typeLabel: "Restaurant",
  name: "Karachi Flames",
  address: ["8411 Baltimore National Pike", "Ellicott City, MD 21043"],
  directionsUrl: null,
};

/*
 * Add your real halal logo path here when ready.
 * Example:
 *
 * const halalLogoSrc = "/halal-logo.png";
 */
const halalLogoSrc: string | null = null;

/* =========================================================
   HELPERS
   ========================================================= */

function getMapQuery(location: SimpleLocation): string {
  return location.address.join(", ");
}

function getDirectionsUrl(location: SimpleLocation): string {
  if (location.directionsUrl) {
    return location.directionsUrl;
  }

  const query = encodeURIComponent(getMapQuery(location));

  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function getEmbedSrc(location: SimpleLocation): string {
  const query = encodeURIComponent(getMapQuery(location));

  return `https://www.google.com/maps?q=${query}&output=embed`;
}

/* =========================================================
   ICONS
   ========================================================= */

function Arrow({
  className = "",
}: {
  className?: string;
}) {
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

function PinIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 21s7-6.1 7-11.3A7 7 0 0 0 5 9.7C5 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="9.7"
        r="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function InstagramIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="17.3"
        cy="6.8"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3.2l.8-4H13V9c0-.67.33-1 1-1Z" />
    </svg>
  );
}

function TikTokIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.7 4.5c.6.8 1.5 1.4 2.6 1.5v3.1c-1 0-1.9-.3-2.7-.7v6.4c0 3.4-2.5 5.2-5.2 5.2-2.7 0-4.8-1.8-4.8-4.5 0-2.8 2.2-4.7 5-4.7.4 0 .7 0 1 .1v3.1c-.3-.1-.6-.2-1-.2-1.1 0-1.9.7-1.9 1.7 0 1 .8 1.6 1.8 1.6 1.1 0 2-.7 2-2.3V4.5h3.2Z" />
    </svg>
  );
}

function MenuIcon({
  open,
}: {
  open: boolean;
}) {
  return (
    <span
      className="relative block h-7 w-8"
      aria-hidden="true"
    >
      <span
        className={[
          "absolute left-0 block h-[2px] w-8 rounded-full bg-current",
          "transition-all duration-500 ease-out",
          open ? "top-3 rotate-45" : "top-1",
        ].join(" ")}
      />

      <span
        className={[
          "absolute left-0 top-3 block h-[2px] w-8 rounded-full bg-current",
          "transition-all duration-300 ease-out",
          open
            ? "scale-0 opacity-0"
            : "scale-100 opacity-100",
        ].join(" ")}
      />

      <span
        className={[
          "absolute left-0 block h-[2px] w-8 rounded-full bg-current",
          "transition-all duration-500 ease-out",
          open ? "top-3 -rotate-45" : "top-5",
        ].join(" ")}
      />
    </span>
  );
}

/*
 * IMPORTANT:
 *
 * The old code used:
 *
 * JSX.Element
 *
 * That causes:
 * "Cannot find namespace 'JSX'"
 *
 * We use ComponentType instead.
 */

type IconComponent = ComponentType<{
  className?: string;
}>;

const typeIcon: Record<
  SimpleLocation["typeLabel"],
  IconComponent
> = {
  Restaurant: PinIcon,
};

/* =========================================================
   NAVIGATION
   ========================================================= */

const navItems = [
  {
    label: "Locations",
    href: "/location",
  },
  {
    label: "Catering",
    href: "/catering",
  },
  {
    label: "Menu",
    href: "/menu",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function LocationsPage() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  /* ---------------------------------------------------------
     PAGE META
     --------------------------------------------------------- */

  useEffect(() => {
    document.title = "Locations | Karachi Flames";

    const existingDescription =
      document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );

    const description =
      existingDescription ??
      document.createElement("meta");

    if (!existingDescription) {
      description.name = "description";
      document.head.appendChild(description);
    }

    description.content =
      "Find Karachi Flames — our restaurant location, with directions on Google Maps.";
  }, []);

  /* ---------------------------------------------------------
     ESCAPE KEY
     --------------------------------------------------------- */

  useEffect(() => {
    const closeOnEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      closeOnEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        closeOnEscape,
      );
    };
  }, []);

  /* ---------------------------------------------------------
     PREVENT BACKGROUND SCROLL WHEN MOBILE MENU IS OPEN
     --------------------------------------------------------- */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const TypeIcon = typeIcon[location.typeLabel];

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808] text-[#f5f1e8] selection:bg-[#c65a24] selection:text-white">
      {/* =====================================================
          SKIP LINK
      ====================================================== */}

      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-[#f5f1e8] px-5 py-3 text-sm font-bold text-[#080808] focus:not-sr-only"
      >
        Skip to content
      </a>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="absolute left-0 right-0 top-0 z-[100]">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[82px] w-full max-w-[1800px] items-center justify-between px-4 sm:h-[92px] sm:px-7 lg:h-[105px] lg:px-10 xl:px-14"
        >
          {/* LOGO */}

                   <Link
            href="/"
            aria-label="Karachi Flames home"
            onClick={closeMenu}
            className="relative z-[130] block h-[92px] w-[275px] shrink-0 overflow-visible sm:h-[104px] sm:w-[310px] lg:h-[116px] lg:w-[360px] xl:h-[124px] xl:w-[390px]"
          >
            <Image
              src="/logo.png"
              alt="Karachi Flames"
              fill
              priority
              sizes="(min-width: 1280px) 390px, (min-width: 1024px) 360px, 310px"
              className="object-contain object-left"
            />
          </Link>

          {/* DESKTOP NAV */}

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center justify-center gap-5 xl:gap-7 2xl:gap-9">
              {navItems.map((item) => {
                const active =
                  item.href === "/location";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "group relative whitespace-nowrap px-1 py-3",
                      "text-[14px] font-extrabold uppercase tracking-[0.02em]",
                      "transition-all duration-300 xl:text-[15px]",
                      active
                        ? "text-[#e87636]"
                        : "text-white hover:text-[#e87636]",
                    ].join(" ")}
                  >
                    {item.label}

                    <span
                      className={[
                        "absolute bottom-0 left-0 h-[2px] rounded-full bg-[#d76a2c]",
                        "transition-all duration-300",
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full",
                      ].join(" ")}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ORDER BUTTON */}

          <div className="hidden shrink-0 lg:block">
            <Link
              href="/menu"
              className="group inline-flex min-h-12 items-center justify-center rounded-md bg-[#c75a24] px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_8px_30px_rgba(199,90,36,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#df7441] hover:shadow-[0_14px_40px_rgba(199,90,36,0.3)] focus:outline-none focus:ring-2 focus:ring-white"
            >
              Order Now

              <Arrow className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            className={[
              "relative z-[140] flex h-14 w-14 shrink-0 items-center justify-center",
              "rounded-full border border-white/25",
              "bg-black/40 text-white backdrop-blur-xl",
              "shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
              "transition-all duration-300",
              "hover:border-[#d76a2c] hover:bg-[#c75a24]",
              "active:scale-90",
              "focus:outline-none focus:ring-2 focus:ring-[#d76a2c]",
              "lg:hidden",
            ].join(" ")}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>

        {/* ===================================================
            MOBILE MENU
        ==================================================== */}

        <div
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          className={[
            "fixed inset-0 z-[120] h-[100dvh] w-full lg:hidden",
            "bg-[#080808]",
            "transition-all duration-500 ease-out",
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-full opacity-0",
          ].join(" ")}
        >
          {/* Background decoration */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#c75a24]/10 blur-3xl" />

            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#c75a24]/10 blur-3xl" />
          </div>

          <div className="relative flex h-full min-h-0 flex-col px-5 pb-5 pt-[96px] sm:px-8 sm:pt-[105px]">
            {/* Mobile menu header */}

            <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#d76a2c] sm:text-[10px]">
                Explore Karachi Flames
              </p>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 sm:text-[10px]">
                Karachi
              </span>
            </div>

            {/* Links */}

            <div className="flex min-h-0 flex-1 flex-col justify-center">
              <ul className="w-full border-t border-white/10">
                {navItems.map(
                  (item, index) => {
                    const active =
                      item.href === "/location";

                    return (
                      <li
                        key={item.href}
                        className="border-b border-white/10"
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={[
                            "group flex w-full items-center justify-between",
                            "py-[11px] sm:py-[13px]",
                            "text-[20px] font-black uppercase",
                            "tracking-[-0.035em]",
                            "transition-all duration-300",
                            active
                              ? "text-[#e87636]"
                              : "text-white hover:text-[#e87636]",
                          ].join(" ")}
                          style={{
                            transitionDelay:
                              menuOpen
                                ? `${index * 35}ms`
                                : "0ms",
                          }}
                        >
                          <span>
                            {item.label}
                          </span>

                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#d76a2c] group-hover:bg-[#c75a24]">
                            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>

            {/* Mobile order */}

            <div className="shrink-0 pt-4">
              <Link
                href="/menu"
                onClick={closeMenu}
                className="group flex min-h-12 w-full items-center justify-center rounded-md bg-[#c75a24] px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(199,90,36,0.25)] transition-all duration-300 hover:bg-[#df7441] active:scale-[0.98]"
              >
                Order Now

                <Arrow className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Social icons */}

              <div className="mt-3 flex items-center justify-center gap-2">
                <a
                  href="https://www.instagram.com/karachiflamesdmv"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>

                <a
                  href="https://www.facebook.com/karachiflamesdmv"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>

                <a
                  href="https://www.tiktok.com/@karachiflamesdmv"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div id="main-content">
        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(198,90,36,0.22),transparent_32%),radial-gradient(circle_at_6%_92%,rgba(107,52,24,0.24),transparent_36%),linear-gradient(125deg,#080808_18%,#100c09_58%,#140e0a_100%)]" />

            <div className="absolute -right-24 top-[-10%] h-[26rem] w-[26rem] rounded-full border border-[#d76a2c]/15" />
          </div>

          <div className="mx-auto max-w-[1180px]">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#c65a24]" />

              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e88b58]">
                Find Karachi Flames
              </p>
            </div>

            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2.9rem,7vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.035em] text-[#f5f1e8]">
              Come find{" "}
              <em className="font-normal text-[#e88b58]">
                the flame.
              </em>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#c9c4b9] sm:text-lg">
              Our restaurant location — get
              directions in one tap.
            </p>
          </div>
        </section>

        {/* ===================================================
            LOCATION
        ==================================================== */}

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="mt-0 grid gap-6 sm:grid-cols-2">
              <article className="group overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c65a24]/55 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                {/* Google Map */}

                <div className="relative h-52 w-full overflow-hidden border-b border-white/10 sm:h-56">
                  <iframe
                    title={`Map to ${location.name}`}
                    src={getEmbedSrc(location)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full grayscale-[0.15] contrast-[1.05] transition duration-500 group-hover:grayscale-0"
                  />

                  <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e88b58]" />

                    Google Maps
                  </span>
                </div>

                {/* Card content */}

                <div className="p-5 sm:p-6">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e88b58]">
                    <TypeIcon className="h-3.5 w-3.5" />

                    {location.typeLabel}
                  </p>

                  <h2 className="mt-2.5 font-serif text-[1.75rem] leading-tight tracking-[-0.03em] text-[#f5f1e8]">
                    {location.name}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#c9c4b9]">
                    {location.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>

                  {/* Directions */}

                  <a
                    href={getDirectionsUrl(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#c65a24] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#d76a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f1e8]"
                  >
                    Get directions

                    <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      
      {/* ========================= FOOTER (fully self-contained — paste as-is into any page) ========================= */}

<footer className="relative overflow-hidden bg-[#080808] pb-8 pt-16 sm:pb-10 sm:pt-20">

  {/* ambient glow behind the logo */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-1/2 top-0 h-72 w-[560px] -translate-x-1/2 rounded-full bg-[#c75a24]/10 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">

    {/* BIG CENTERED LOGO */}
    <div className="flex justify-center">
      <a
        href="/"
        aria-label="Karachi Flames home"
        className="relative block h-[100px] w-[280px] sm:h-[125px] sm:w-[350px] lg:h-[145px] lg:w-[410px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Karachi Flames"
          className="h-full w-full object-contain"
        />
      </a>
    </div>

    <div className="mt-10 border-t border-white/10" />

    {/* COLUMNS — centered on mobile, left-aligned from sm up */}
    <div className="grid gap-10 pt-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[0.9fr_0.9fr_1fr_0.9fr]">

      {/* HOURS */}
     <div>
  <h3 className="text-2xl font-black tracking-[-0.02em] text-[#e87636] sm:text-[26px]">
    Hours
  </h3>

  <p className="mt-4 text-sm leading-6 text-white/70">
    <span className="block font-bold text-white">
      Monday – Thursday
    </span>
    Closed

    <span className="mt-2 block font-bold text-white">
      Friday – Saturday
    </span>
    4 PM – 12 AM

    <span className="mt-2 block font-bold text-white">
      Sunday
    </span>
    4 PM – 11 PM
  </p>
</div>

      {/* LOCATION */}
      <div>
        <h3 className="text-2xl font-black tracking-[-0.02em] text-[#e87636] sm:text-[26px]">
          Location
        </h3>
        <a
          href="https://www.google.com/maps/search/?api=1&query=8411%20Baltimore%20National%20Pike%2C%20Ellicott%20City%2C%20MD%2C%2021043"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-block text-sm leading-7 text-white/70 transition-colors duration-300 hover:text-white"
        >
          8411 Baltimore National Pike
          <br />
          Ellicott City, MD 21043
          <span className="mt-1.5 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[#d76a2c] transition-colors duration-300 group-hover:text-[#e87636] sm:justify-start">
            Get directions
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>

      {/* CONTACT */}
      <div>
        <h3 className="text-2xl font-black tracking-[-0.02em] text-[#e87636] sm:text-[26px]">
          Contact
        </h3>
        <ul className="mt-4 space-y-1.5 text-sm text-white/70">
          <li>
            <a
              href="tel:+14434305800"
              className="transition-colors duration-300 hover:text-white"
            >
              (443) 430-5800
            </a>
          </li>
          <li>
            <a
              href="mailto:Karachiflamesdmv@gmail.com"
              className="break-all transition-colors duration-300 hover:text-white"
            >
              Karachiflamesdmv@gmail.com
            </a>
          </li>
        </ul>

        <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">
          <a
            href="https://www.instagram.com/karachiflamesdmv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/karachiflamesdmv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3.2l.8-4H13V9c0-.67.33-1 1-1Z" />
            </svg>
          </a>

          <a
            href="https://www.tiktok.com/@karachiflamesdmv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M16.7 4.5c.6.8 1.5 1.4 2.6 1.5v3.1c-1 0-1.9-.3-2.7-.7v6.4c0 3.4-2.5 5.2-5.2 5.2-2.7 0-4.8-1.8-4.8-4.5 0-2.8 2.2-4.7 5-4.7.4 0 .7 0 1 .1v3.1c-.3-.1-.6-.2-1-.2-1.1 0-1.9.7-1.9 1.7 0 1 .8 1.6 1.8 1.6 1.1 0 2-.7 2-2.3V4.5h3.2Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* NAVIGATE */}
      <div>
        <h3 className="text-2xl font-black tracking-[-0.02em] text-[#e87636] sm:text-[26px]">
          Navigate
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          <li>
            <a href="/location" className="transition-colors duration-300 hover:text-white">
              Locations
            </a>
          </li>
          <li>
            <a href="/catering" className="transition-colors duration-300 hover:text-white">
              Catering
            </a>
          </li>
          <li>
            <a href="/menu" className="transition-colors duration-300 hover:text-white">
              Menu
            </a>
          </li>
          <li>
            <a href="/gallery" className="transition-colors duration-300 hover:text-white">
              Gallery
            </a>
          </li>
          <li>
            <a href="/about" className="transition-colors duration-300 hover:text-white">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact" className="transition-colors duration-300 hover:text-white">
              Contact Us
            </a>
          </li>
        </ul>
      </div>

    </div>

    {/* HALAL BADGE — dashed rule */}
    <div className="mt-10 flex items-center justify-center gap-3 border-t border-dashed border-white/15 pt-8 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 sm:justify-start sm:text-left">
      <span className="relative h-8 w-10 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/halal.png" alt="" className="h-full w-full object-contain" />
      </span>
      100% Hand-Slaughtered Zabiha Halal
    </div>

    {/* BOTTOM BAR */}
    <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-xs text-white/45 sm:flex-row sm:text-left">
      <p>© 2026 Karachi Flames. All rights reserved.</p>
      
    </div>

  </div>
</footer>

      {/* =====================================================
          REDUCED MOTION
      ====================================================== */}

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}