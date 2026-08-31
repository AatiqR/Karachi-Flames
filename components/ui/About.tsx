
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const imagePaths = {
  hero: "/hero.jpg",
  story: "/hero.jpg",
  fire: "/hero.jpg",
  food: "/hero.jpg",
  gathering: "/hero.jpg",
  galleryOne: "/hero.jpg",
  galleryTwo: "/hero.jpg",
  galleryThree: "/hero.jpg",
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
    <span className="relative block h-7 w-8" aria-hidden="true">
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

const values = [
  {
    number: "01",
    title: "Fire Is Our Language",
    text: "Real flame, patient grilling, and bold technique. We believe great BBQ should have depth you can taste from the first bite.",
  },
  {
    number: "02",
    title: "Karachi Is Our Soul",
    text: "Our food carries the energy, warmth, spice, and generosity that make Karachi unlike anywhere else.",
  },
  {
    number: "03",
    title: "Quality Without Shortcuts",
    text: "From carefully selected ingredients to the final plate, we keep the focus on freshness, flavor, and consistency.",
  },
  {
    number: "04",
    title: "People Come First",
    text: "A great meal is more than food. It is the table, the conversation, the welcome, and the memories made around it.",
  },
];

const milestones = [
  ["01", "The First Spark", "A love for Karachi BBQ becomes the beginning of something bigger."],
  ["02", "The Flame Grows", "Our kitchen evolves around fire, flavor, hospitality, and consistency."],
  ["03", "The Table Expands", "More guests, more gatherings, and more reasons to bring people together."],
  ["04", "The Journey Continues", "Karachi Flames keeps moving forward without losing what started it all."],
];

export default function AboutUsPage() {
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

      {/* =========================================================
          NAVBAR — INTENTIONALLY KEPT EXACTLY LIKE CATERING PAGE
      ========================================================= */}

      <header className="absolute left-0 right-0 top-0 z-[100]">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[82px] w-full max-w-[1800px] items-center justify-between px-4 sm:h-[92px] sm:px-7 lg:h-[105px] lg:px-10 xl:px-14"
        >
          <Link
            href="/"
            aria-label="Karachi Flames home"
            onClick={closeMenu}
            className="relative z-[130] block h-[68px] w-[205px] shrink-0 overflow-visible sm:h-[78px] sm:w-[235px] lg:h-[88px] lg:w-[285px] xl:h-[94px] xl:w-[315px]"
          >
            <Image
              src={imagePaths.logo}
              alt="Karachi Flames"
              fill
              priority
              sizes="(min-width: 1280px) 315px, (min-width: 1024px) 285px, 235px"
              className="object-contain object-left"
            />
          </Link>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center justify-center gap-5 xl:gap-7 2xl:gap-9">
              {navigation.map((item) => {
                const active = item.href === "/about";

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

          <div className="hidden shrink-0 lg:block">
            <Link
              href="/menu"
              className="group inline-flex min-h-12 items-center justify-center rounded-md bg-[#c75a24] px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_8px_30px_rgba(199,90,36,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#df7441] hover:shadow-[0_14px_40px_rgba(199,90,36,0.3)] focus:outline-none focus:ring-2 focus:ring-white"
            >
              Order Now
              <Arrow className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

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
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#c75a24]/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#c75a24]/10 blur-3xl" />
          </div>

          <div className="relative flex h-full min-h-0 flex-col px-5 pb-5 pt-[96px] sm:px-8 sm:pt-[105px]">
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#d76a2c] sm:text-[10px]">
                Explore Karachi Flames
              </p>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 sm:text-[10px]">
                Karachi
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-center">
              <ul className="w-full border-t border-white/10">
                {navigation.map((item, index) => {
                  const active = item.href === "/about";

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

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative isolate min-h-[780px] overflow-hidden sm:min-h-[850px]">
        <Image
          src={imagePaths.hero}
          alt="Karachi Flames BBQ"
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-center"
        />

        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-black/[0.96] via-black/[0.72] to-black/[0.25]" />

        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_35%,rgba(199,90,36,0.34),transparent_30%)]" />

        <div className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:70px_70px]" />

        <div className="mx-auto flex min-h-[780px] max-w-[1700px] items-end px-5 pb-14 pt-40 sm:min-h-[850px] sm:px-8 sm:pb-20 lg:px-12">
          <div className="w-full">
            <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_.7fr]">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-12 bg-[#d76a2c]" />

                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e88651]">
                    The story behind the flame
                  </p>
                </div>

                <h1 className="max-w-5xl text-[clamp(3.7rem,9vw,9.5rem)] font-black uppercase leading-[0.78] tracking-[-0.085em] text-white">
                  Born from
                  <br />
                  <span className="text-[#d76a2c]">Karachi.</span>
                  <br />
                  Built by fire.
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                  Karachi Flames is more than BBQ. It is a celebration of
                  bold Karachi flavor, real fire, generous hospitality, and
                  the people who make every table worth gathering around.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/menu"
                    className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#c75a24] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#df7441]"
                  >
                    Taste the story
                    <Arrow className="ml-3 h-5 w-5" />
                  </Link>

                  <a
                    href="#our-story"
                    className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/40 bg-black/20 px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-black"
                  >
                    Our story
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="ml-auto max-w-xs border-l border-white/20 pl-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e88651]">
                    Our philosophy
                  </p>

                  <p className="mt-4 text-2xl font-black uppercase leading-[0.95] tracking-[-0.04em]">
                    Keep the fire real.
                    <br />
                    Keep the flavor bold.
                    <br />
                    Keep people close.
                  </p>

                  <div className="mt-7 flex items-center gap-3">
                    <span className="relative h-9 w-11">
                      <Image
                        src={imagePaths.halal}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </span>

                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">
                      100% Hand-Slaughtered
                      <br />
                      Zabiha Halal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / STATS
      ========================================================= */}

      <section className="bg-[#f5f1e8] px-5 py-20 text-[#111] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c75a24]">
                What we believe
              </p>

              <h2 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.07em] sm:text-7xl lg:text-8xl">
                Great food should make you feel something.
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-lg leading-8 text-black/65">
                The crackle of the grill. The aroma of smoke in the air. The
                first bite that instantly takes you somewhere familiar.
                Karachi Flames was created around that feeling.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-4">
                {[
                  ["01", "Fire"],
                  ["02", "Flavor"],
                  ["03", "Culture"],
                  ["04", "People"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="bg-[#f5f1e8] px-4 py-5"
                  >
                    <p className="font-mono text-[10px] text-[#c75a24]">
                      {number}
                    </p>

                    <p className="mt-3 text-sm font-black uppercase tracking-[-0.02em]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STORY
      ========================================================= */}

      <section
        id="our-story"
        className="scroll-mt-8 bg-[#111] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative min-h-[550px] overflow-hidden sm:min-h-[650px]">
            <Image
              src={imagePaths.story}
              alt="Karachi Flames food and fire"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover transition duration-1000 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Karachi Flames
              </span>

              <span className="text-5xl font-black text-white/20">
                01
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="max-w-3xl lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d76a2c]">
                Our story
              </p>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.85] tracking-[-0.065em] sm:text-7xl">
                A love letter
                <br />
                to Karachi.
              </h2>

              <div className="mt-8 space-y-6 text-base leading-8 text-white/65 sm:text-lg">
                <p>
                  Karachi has a way of bringing people together. Different
                  neighborhoods, different backgrounds, different stories —
                  but somehow, there is always room around the table.
                </p>

                <p>
                  That spirit is at the heart of Karachi Flames. We take
                  inspiration from the city's unmistakable BBQ culture and
                  turn it into an experience built around smoke, spice,
                  char, freshness, and generosity.
                </p>

                <p>
                  We are not interested in making food complicated. We are
                  interested in making it memorable.
                </p>
              </div>

              <div className="mt-10 grid gap-6 border-t border-white/15 pt-7 sm:grid-cols-2">
                <div>
                  <p className="text-3xl font-black uppercase tracking-[-0.04em]">
                    Real fire
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/45">
                    Because flame brings something no shortcut can recreate.
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-black uppercase tracking-[-0.04em]">
                    Real people
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/45">
                    Because hospitality is just as important as what is on
                    the plate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FIRE FEATURE
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#c75a24]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[480px] lg:min-h-[700px]">
            <Image
              src={imagePaths.fire}
              alt="BBQ grilling over open flame"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="flex items-center px-5 py-20 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/60">
                Why fire matters
              </p>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.82] tracking-[-0.07em] text-[#15100d] sm:text-7xl">
                You can taste
                <br />
                the difference.
              </h2>

              <p className="mt-7 text-lg leading-8 text-black/70">
                Fire is not decoration at Karachi Flames. It is part of the
                flavor. It creates char, smoke, caramelization, aroma, and
                that unmistakable BBQ character we chase every day.
              </p>

              <div className="mt-9 border-t border-black/20 pt-6">
                <p className="text-2xl font-black uppercase tracking-[-0.04em]">
                  Flame first.
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-black/60">
                  Carefully prepared ingredients meet high heat, patience,
                  and technique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}

      <section className="bg-[#0b0b0b] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d76a2c]">
                What drives us
              </p>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.84] tracking-[-0.07em] sm:text-7xl">
                The rules
                <br />
                we cook by.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-white/55">
                Everything we do comes back to a few simple principles.
              </p>
            </div>

            <div className="border-t border-white/15">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="group grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[70px_1fr]"
                >
                  <span className="font-mono text-sm text-[#d76a2c]">
                    {value.number}
                  </span>

                  <div>
                    <div className="flex items-center justify-between gap-5">
                      <h3 className="text-2xl font-black uppercase tracking-[-0.045em] sm:text-3xl">
                        {value.title}
                      </h3>

                      <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition duration-300 group-hover:border-[#d76a2c] group-hover:bg-[#c75a24] sm:flex">
                        <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
                      {value.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TIMELINE
      ========================================================= */}

      <section className="bg-[#f5f1e8] px-5 py-20 text-[#111] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c75a24]">
                The journey
              </p>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.84] tracking-[-0.07em] sm:text-7xl">
                From one
                <br />
                spark.
              </h2>

              <p className="mt-6 max-w-sm text-base leading-7 text-black/55">
                Every great fire starts somewhere. Ours continues to grow
                with every plate, every guest, and every story.
              </p>
            </div>

            <div className="border-t border-black/15">
              {milestones.map(([number, title, text]) => (
                <article
                  key={number}
                  className="grid gap-5 border-b border-black/15 py-8 sm:grid-cols-[80px_1fr]"
                >
                  <span className="font-mono text-xs text-[#c75a24]">
                    {number}
                  </span>

                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-[-0.05em]">
                      {title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-black/55">
                      {text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOD / GALLERY
      ========================================================= */}

      <section className="bg-[#151515] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d76a2c]">
                More than a meal
              </p>

              <h2 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.07em] sm:text-7xl">
                Made to be
                <br />
                remembered.
              </h2>
            </div>

            <Link
              href="/gallery"
              className="group inline-flex items-center text-xs font-bold uppercase tracking-[0.15em] text-[#e88651]"
            >
              Explore gallery
              <Arrow className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[250px_250px]">
            <div className="relative col-span-12 overflow-hidden lg:col-span-7 lg:row-span-2">
              <Image
                src={imagePaths.food}
                alt="Karachi Flames BBQ"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="relative col-span-6 min-h-[240px] overflow-hidden lg:col-span-5 lg:min-h-0">
              <Image
                src={imagePaths.galleryOne}
                alt="Karachi Flames food"
                fill
                sizes="(min-width: 1024px) 42vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="relative col-span-6 min-h-[240px] overflow-hidden lg:col-span-5 lg:min-h-0">
              <Image
                src={imagePaths.galleryTwo}
                alt="Karachi Flames gathering"
                fill
                sizes="(min-width: 1024px) 42vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMMUNITY
      ========================================================= */}

      <section className="bg-[#f5f1e8] px-5 py-20 text-[#111] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c75a24]">
              The heart of it all
            </p>

            <h2 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.83] tracking-[-0.07em] sm:text-7xl">
              The best part
              <br />
              is who sits
              <br />
              at the table.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-black/65">
              Restaurants are built around food. Communities are built around
              people. We want Karachi Flames to be a place where both meet —
              where families celebrate, friends catch up, teams gather, and
              strangers leave feeling like regulars.
            </p>

            <div className="mt-8 border-l-2 border-[#c75a24] pl-5">
              <p className="text-xl font-black uppercase tracking-[-0.03em]">
                Come hungry.
                <br />
                Leave connected.
              </p>
            </div>

            <Link
              href="/location"
              className="mt-9 inline-flex min-h-14 items-center justify-center rounded-md bg-[#111] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#c75a24]"
            >
              Find a location
              <Arrow className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          HALAL / QUALITY
      ========================================================= */}

      <section className="bg-[#111] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d76a2c]/40 bg-[#1b120e]">
            <span className="relative h-11 w-14">
              <Image
                src={imagePaths.halal}
                alt="Zabiha Halal"
                fill
                className="object-contain"
              />
            </span>
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-[#d76a2c]">
            Our commitment
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
            100% Hand-Slaughtered
            <br />
            Zabiha Halal
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55">
            We believe quality starts with knowing what goes onto the plate.
            Karachi Flames uses hand-slaughtered Zabiha Halal ingredients,
            prepared with care and served with pride.
          </p>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="relative isolate overflow-hidden bg-[#c75a24] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#f2ad84]/25 blur-3xl" />

        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1200px] text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/60">
            Now it is your turn
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.82] tracking-[-0.08em] text-[#14100d] sm:text-7xl lg:text-8xl">
            Pull up a chair.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-black/65">
            Experience the flavor, fire, and hospitality that make Karachi
            Flames what it is.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#111] px-8 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
            >
              Explore the menu
              <Arrow className="ml-3 h-5 w-5" />
            </Link>

            <Link
              href="/catering"
              className="inline-flex min-h-14 items-center justify-center rounded-md border border-black/40 px-8 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white"
            >
              Plan an event
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#080808] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div>
              <Link
                href="/"
                aria-label="Karachi Flames home"
                className="relative block h-[90px] w-[300px] shrink-0"
              >
                <Image
                  src={imagePaths.logo}
                  alt="Karachi Flames"
                  fill
                  sizes="300px"
                  className="object-contain object-left"
                />
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
                Authentic Karachi flavor, fire-grilled with care and served
                with hospitality.
              </p>

              <div className="mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/65">
                <span className="relative h-8 w-10">
                  <Image
                    src={imagePaths.halal}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>

                Zabiha Halal
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>

                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>

                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-[#d76a2c] hover:bg-[#c75a24] hover:text-white"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d76a2c]">
                Navigate
              </p>

              <ul className="mt-4 space-y-2">
                {navigation.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/65 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d76a2c]">
                Visit &amp; contact
              </p>

              <p className="mt-4 text-sm leading-7 text-white/65">
                [Restaurant Address]
                <br />
                [Contact Number]
                <br />
                [Contact Email]
                <br />
                [Hours]
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 pt-6 text-xs text-white/45 sm:flex-row">
            <p>© 2026 Karachi Flames. All rights reserved.</p>

            <p>Authentic Karachi BBQ &amp; Catering</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
