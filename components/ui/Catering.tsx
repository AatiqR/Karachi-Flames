"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const imagePaths = {
  hero: "/hero.jpg",
  halal: "/halal.png",
  logo: "/logo.png",
};

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
          open ? "scale-0 opacity-0" : "scale-100 opacity-100",
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

export default function CateringPrivateEventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b0b0b] text-[#f5f1e8] selection:bg-[#c75a24] selection:text-white">

      {/* ========================= NAVBAR ========================= */}

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
                const active = item.href === "/catering";

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

        {/* ================= MOBILE MENU ================= */}

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

            {/* NAVIGATION */}
            <div className="flex min-h-0 flex-1 flex-col justify-center">
              <ul className="w-full border-t border-white/10">

                {navigation.map((item, index) => {
                  const active = item.href === "/catering";

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

            {/* MOBILE BOTTOM */}
            <div className="shrink-0 pt-4">

              <Link
                href="/menu"
                onClick={closeMenu}
                className="group flex min-h-12 w-full items-center justify-center rounded-md bg-[#c75a24] px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(199,90,36,0.25)] transition-all duration-300 hover:bg-[#df7441] active:scale-[0.98]"
              >
                Order Now

                <Arrow className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

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

      {/* ========================= HERO ========================= */}

      <section className="relative isolate min-h-[760px] overflow-hidden sm:min-h-[820px]">

        <Image
          src={imagePaths.hero}
          alt="Karachi Flames barbecue"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/[0.94] via-black/[0.65] to-black/[0.2]" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_25%,rgba(199,90,36,0.3),transparent_30%)]" />

        <div className="mx-auto flex min-h-[760px] max-w-[1600px] items-end px-5 pb-12 pt-36 sm:min-h-[820px] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">

          <div className="max-w-3xl">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#e88651]">
              Catering &amp; Private Events
            </p>

            <h1 className="max-w-2xl text-[clamp(3.2rem,8vw,8.5rem)] font-black uppercase leading-[0.84] tracking-[-0.075em] text-white">
              Bring the flame to your event.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              From intimate gatherings to unforgettable celebrations, Karachi
              Flames brings authentic Karachi flavor, fire-grilled favorites,
              and genuine hospitality to your table.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#c75a24] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#df7441] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Request a quote
                <Arrow className="ml-3 h-5 w-5" />
              </Link>

              {/* <Link
                href="/menu"
                className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/50 bg-black/20 px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                View catering menu
              </Link>  */}

            </div>

            {/* <div className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">

              <span className="relative h-8 w-10">
                <Image
                  src={imagePaths.halal}
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>

              100% Hand-Slaughtered Zabiha Halal

            </div> */}

          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}

      {/*
  Drop-in replacement for the existing <footer>...</footer> block in your
  catering page. It reuses the constants and icon components already
  defined at the top of your file (imagePaths, navigation, socialLinks,
  InstagramIcon, FacebookIcon, TikTokIcon) — no new imports needed.

  Fill in the bracketed placeholders ([Opening], [Street Address],
  [Contact Number], [Contact Email]) with your real details.
*/}

{/* ========================= FOOTER ========================= */}
{/* ========================= FOOTER ========================= */}

<footer className="relative overflow-hidden bg-[#080808] pb-8 pt-16 sm:pb-10 sm:pt-20">

  {/* ambient glow behind the logo */}
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

    {/* COLUMNS — centered on mobile, left-aligned from sm up */}
    <div className="grid gap-10 pt-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[0.9fr_0.9fr_1fr_0.9fr]">

      {/* HOURS */}
      <div>
        <h3 className="text-2xl font-black tracking-[-0.02em] text-[#e87636] sm:text-[26px]">
          Hours
        </h3>
        <p className="mt-4 text-sm leading-6 text-white/70">
          <span className="block font-bold text-white">Daily</span>
          12 PM – 12 AM
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
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>

    {/* HALAL BADGE — dashed rule like the reference */}
    <div className="mt-10 flex items-center justify-center gap-3 border-t border-dashed border-white/15 pt-8 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 sm:justify-start sm:text-left">
      <span className="relative h-8 w-10 shrink-0">
        <Image
          src={imagePaths.halal}
          alt=""
          fill
          className="object-contain"
        />
      </span>
      100% Hand-Slaughtered Zabiha Halal
    </div>

    {/* BOTTOM BAR */}
    <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-xs text-white/45 sm:flex-row sm:text-left">
      <p>© 2026 Karachi Flames. All rights reserved.</p>
      <p>Charcoal-Fired Halal BBQ &amp; Catering</p>
    </div>

  </div>
</footer>
    </main>
  );
}