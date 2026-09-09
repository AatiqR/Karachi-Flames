"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* =========================================================
   IMAGE PATHS
   ========================================================= */

const imagePaths = {
  logo: "/logo.png",
  halal: "/halal.png",
};

/* =========================================================
   NAVIGATION
   ========================================================= */

const navigation = [
  { label: "Locations", href: "/location" },
  { label: "Catering", href: "/catering" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = {
  instagram: "https://www.instagram.com/karachiflamesdmv",
  facebook: "https://www.facebook.com/karachiflamesdmv",
  tiktok: "https://www.tiktok.com/@karachiflamesdmv",
};

/* =========================================================
   ARROW ICON
   ========================================================= */

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

/* =========================================================
   SOCIAL ICONS
   ========================================================= */

function InstagramIcon({ className = "" }: { className?: string }) {
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

      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
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

function TikTokIcon({ className = "" }: { className?: string }) {
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

/* =========================================================
   MOBILE MENU ICON
   ========================================================= */

function MenuIcon({ open }: { open: boolean }) {
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

/* =========================================================
   ORDER PAGE
   ========================================================= */

export default function OrderPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.touchAction = "";
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.touchAction = "none";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.touchAction = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b0b0b] text-[#f5f1e8] selection:bg-[#c75a24] selection:text-white">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

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
              src={imagePaths.logo}
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

              {navigation.map((item) => {
                const active = false;

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
                        active ? "w-full" : "w-0 group-hover:w-full",
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
              href="/order"
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
            onClick={() => setMenuOpen((value) => !value)}
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

        {/* =====================================================
            MOBILE MENU
            ===================================================== */}

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

          {/* BACKGROUND GLOW */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#c75a24]/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#c75a24]/10 blur-3xl" />
          </div>

          {/* MOBILE CONTENT */}

          <div className="relative flex h-full min-h-0 flex-col px-5 pb-5 pt-[96px] sm:px-8 sm:pt-[105px]">

            {/* TOP INFO */}

            <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#d76a2c] sm:text-[10px]">
                Explore Karachi Flames
              </p>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 sm:text-[10px]">
                Karachi
              </span>
            </div>

            {/* MOBILE NAVIGATION */}

            <div className="flex min-h-0 flex-1 flex-col justify-center">
              <ul className="w-full border-t border-white/10">

                {navigation.map((item, index) => {
                  const active = false;

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
                          transitionDelay: menuOpen
                            ? `${index * 35}ms`
                            : "0ms",
                        }}
                      >
                        <span>{item.label}</span>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#d76a2c] group-hover:bg-[#c75a24]">
                          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  );
                })}

              </ul>
            </div>

            {/* MOBILE ORDER BUTTON */}

            <div className="shrink-0 pt-4">

              <Link
                href="/order"
                onClick={closeMenu}
                className="group flex min-h-12 w-full items-center justify-center rounded-md bg-[#c75a24] px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(199,90,36,0.25)] transition-all duration-300 hover:bg-[#df7441] active:scale-[0.98]"
              >
                Order Now

                <Arrow className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* MOBILE SOCIAL ICONS */}

              <div className="mt-3 flex items-center justify-center gap-2">

                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>

                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>

                <a
                  href={socialLinks.tiktok}
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
          PREMIUM ONLINE ORDERING COMING SOON
          ===================================================== */}

      <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden px-5 pb-20 pt-[150px] sm:min-h-[85vh] sm:px-8 sm:pt-[170px] lg:min-h-[88vh] lg:px-12">

        {/* LARGE AMBIENT GLOW */}

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c75a24]/[0.10] blur-[130px] sm:h-[650px] sm:w-[650px]"
          aria-hidden="true"
        />

        {/* SECONDARY GLOW */}

        <div
          className="pointer-events-none absolute left-1/2 top-[45%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#e67838]/[0.06] blur-[90px]"
          aria-hidden="true"
        />

        {/* SUBTLE CENTER LINE */}

        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-white/[0.025]"
          aria-hidden="true"
        />

        {/* DECORATIVE CIRCLE */}

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c75a24]/[0.08] sm:h-[500px] sm:w-[500px]"
          aria-hidden="true"
        />

        {/* MAIN CONTENT */}

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">

          {/* EYEBROW */}

          <div className="mb-7 flex items-center justify-center gap-3 sm:mb-9">
            <span className="h-px w-8 bg-[#c75a24] sm:w-12" />

            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#e67838] sm:text-xs">
              Karachi Flames
            </span>

            <span className="h-px w-8 bg-[#c75a24] sm:w-12" />
          </div>

          {/* ICON */}

          <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#c75a24]/30 bg-[#c75a24]/[0.07] shadow-[0_0_70px_rgba(199,90,36,0.12)] sm:h-[84px] sm:w-[84px]">

            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              fill="none"
              className="h-8 w-8 text-[#e67838] sm:h-9 sm:w-9"
            >
              <path
                d="M24 5.5c1.8 6.6-3.3 9.6-3.3 14.2 0 2.6 1.5 4.7 3.7 5.9-.4-3.4 1.7-6.1 4.7-8.2 1.1 4.7 6 7.6 6 14.2 0 7.1-5.3 11.7-11.8 11.7-7.4 0-12.5-4.8-12.5-11.9 0-6.3 3.6-10.7 6.8-14.1.4 4.5 2.2 6.6 4 7.8-.4-6.4 1.2-12.8 2.4-19.6Z"
                fill="currentColor"
              />
            </svg>

          </div>

          {/* SMALL TITLE */}

          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-[#d8d3ca]/50 sm:text-xs">
            Online Ordering
          </p>

          {/* MAIN HEADING */}

          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[#f5f2ec] sm:text-6xl md:text-7xl lg:text-[82px]">

            Order Online

            <span className="block mt-2 text-[#e67838]">
              Coming Soon
            </span>

          </h1>

          {/* DIVIDER */}

          <div className="mx-auto mt-8 h-px w-16 bg-[#c75a24] sm:mt-9" />

          {/* DESCRIPTION */}

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#d8d3ca]/65 sm:text-base sm:leading-8">
            We&apos;re preparing a seamless online ordering experience so you
            can enjoy your Karachi Flames favorites whenever the craving
            strikes.
          </p>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-[#d8d3ca]/40 sm:text-sm">
            Our online ordering service is currently being prepared.
          </p>

          {/* BUTTONS */}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              href="/menu"
              className="group inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#c75a24] px-7 text-xs font-extrabold uppercase tracking-[0.13em] text-white shadow-[0_10px_35px_rgba(199,90,36,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7441] hover:shadow-[0_15px_45px_rgba(199,90,36,0.28)] sm:w-auto"
            >
              Explore Our Menu

              <Arrow className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/[0.14] bg-white/[0.025] px-7 text-xs font-extrabold uppercase tracking-[0.13em] text-[#f5f2ec] transition-all duration-300 hover:border-[#c75a24]/60 hover:bg-white/[0.05] sm:w-auto"
            >
              Contact Us
            </Link>

          </div>

          {/* BOTTOM STATUS */}

          <div className="mt-10 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-white/30 sm:text-[10px]">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d76a2c] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d76a2c]" />
            </span>

            Online ordering is on the way

          </div>

        </div>
      </section>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="relative overflow-hidden bg-[#080808] pb-8 pt-16 sm:pb-10 sm:pt-20">

        {/* AMBIENT GLOW */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-[560px] -translate-x-1/2 rounded-full bg-[#c75a24]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">

          {/* BIG CENTERED LOGO */}

          <div className="flex justify-center">

            <Link
              href="/"
              aria-label="Karachi Flames home"
              className="relative block h-[100px] w-[280px] sm:h-[125px] sm:w-[350px] lg:h-[145px] lg:w-[410px]"
            >
              <Image
                src={imagePaths.logo}
                alt="Karachi Flames"
                fill
                sizes="(min-width: 1024px) 410px, (min-width: 640px) 350px, 280px"
                className="object-contain"
              />
            </Link>

          </div>

          <div className="mt-10 border-t border-white/10" />

          {/* FOOTER COLUMNS */}

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

                  <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />

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

              {/* SOCIAL ICONS */}

              <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">

                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>

                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>

                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <TikTokIcon className="h-4 w-4" />
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
                  <Link
                    href="/location"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Locations
                  </Link>
                </li>

                <li>
                  <Link
                    href="/catering"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Catering
                  </Link>
                </li>

                <li>
                  <Link
                    href="/menu"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Menu
                  </Link>
                </li>

                <li>
                  <Link
                    href="/gallery"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Gallery
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>

              </ul>

            </div>

          </div>

          {/* HALAL BADGE */}

          <div className="mt-10 flex items-center justify-center gap-3 border-t border-dashed border-white/15 pt-8 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 sm:justify-start sm:text-left">

            <span className="relative h-8 w-10 shrink-0">
              <Image
                src={imagePaths.halal}
                alt=""
                fill
                sizes="40px"
                className="object-contain"
              />
            </span>

            100% Hand-Slaughtered Zabiha Halal

          </div>

          {/* BOTTOM BAR */}

          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-xs text-white/45 sm:flex-row sm:text-left">

            <p>
              © 2026 Karachi Flames. All rights reserved.
            </p>

          </div>

        </div>
      </footer>

      {/* =====================================================
          GLOBAL CSS
          ===================================================== */}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #080808;
        }

        .scrollbar-none {
          scrollbar-width: none;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        ::selection {
          background: rgba(199, 90, 36, 0.35);
          color: #ffffff;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

    </main>
  );
}