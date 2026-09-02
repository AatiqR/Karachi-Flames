"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/*
 * KARACHI FLAMES — LOCATIONS
 *
 * Update the data blocks below when confirmed business information is
 * available. Each location only needs a name, an address, and (optionally) a
 * `directionsUrl`. When `directionsUrl` is left null, a Google Maps link is
 * generated automatically from the address — and the same address powers the
 * embedded map preview on the card, so nothing has to be wired up twice.
 */

type LocationCategory = "permanent" | "pop-up";

type SimpleLocation = {
  id: string;
  category: LocationCategory;
  typeLabel: "Restaurant" | "Food Truck" | "Pop-Up";
  name: string;
  address: string[];
  date?: string;
  directionsUrl: string | null;
};

// Use the supplied hand-slaughtered Zabiha Halal logo here. Leave null for text only.
const halalLogoSrc: string | null = null;

// Replace every bracketed value once it has been confirmed by the client.
const locations: SimpleLocation[] = [
  {
    id: "restaurant-1",
    category: "permanent",
    typeLabel: "Restaurant",
    name: "[LOCATION NAME]",
    address: ["[STREET ADDRESS]", "[CITY, STATE ZIP]"],
    directionsUrl: null,
  },
  {
    id: "food-truck-1",
    category: "permanent",
    typeLabel: "Food Truck",
    name: "[FOOD TRUCK NAME]",
    address: ["[CURRENT ADDRESS]", "[CITY, STATE ZIP]"],
    directionsUrl: null,
  },
  {
    id: "pop-up-1",
    category: "pop-up",
    typeLabel: "Pop-Up",
    name: "[POP-UP EVENT NAME]",
    address: ["[EVENT ADDRESS]", "[CITY, STATE ZIP]"],
    date: "[DATE / TIME]",
    directionsUrl: null,
  },
];

function getMapQuery(location: SimpleLocation) {
  return location.address.join(", ");
}

function getDirectionsUrl(location: SimpleLocation) {
  if (location.directionsUrl) return location.directionsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getMapQuery(location))}`;
}

function getEmbedSrc(location: SimpleLocation) {
  return `https://www.google.com/maps?q=${encodeURIComponent(getMapQuery(location))}&output=embed`;
}

const categoryTabs: { id: LocationCategory; label: string }[] = [
  { id: "permanent", label: "Permanent Location / Food Truck" },
  { id: "pop-up", label: "Pop-Ups" },
];

/* =========================================================
   ICONS
   ========================================================= */

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21s7-6.1 7-11.3A7 7 0 0 0 5 9.7C5 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.7" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function TruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 7h10v9H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 10h4l4 3v3h-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3c.6 3.4 2.1 4.9 5.5 5.5C14.1 9.1 12.6 10.6 12 14c-.6-3.4-2.1-4.9-5.5-5.5C9.9 7.9 11.4 6.4 12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 14.5c.35 1.9 1.15 2.7 3 3.05-1.85.35-2.65 1.15-3 3.05-.35-1.9-1.15-2.7-3-3.05 1.85-.35 2.65-1.15 3-3.05Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3.2l.8-4H13V9c0-.67.33-1 1-1Z" />
    </svg>
  );
}

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.7 4.5c.6.8 1.5 1.4 2.6 1.5v3.1c-1 0-1.9-.3-2.7-.7v6.4c0 3.4-2.5 5.2-5.2 5.2-2.7 0-4.8-1.8-4.8-4.5 0-2.8 2.2-4.7 5-4.7.4 0 .7 0 1 .1v3.1c-.3-.1-.6-.2-1-.2-1.1 0-1.9.7-1.9 1.7 0 1 .8 1.6 1.8 1.6 1.1 0 2-.7 2-2.3V4.5h3.2Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-7 w-8" aria-hidden="true">
      <span className={[
        "absolute left-0 block h-[2px] w-8 rounded-full bg-current",
        "transition-all duration-500 ease-out",
        open ? "top-3 rotate-45" : "top-1",
      ].join(" ")} />
      <span className={[
        "absolute left-0 top-3 block h-[2px] w-8 rounded-full bg-current",
        "transition-all duration-300 ease-out",
        open ? "scale-0 opacity-0" : "scale-100 opacity-100",
      ].join(" ")} />
      <span className={[
        "absolute left-0 block h-[2px] w-8 rounded-full bg-current",
        "transition-all duration-500 ease-out",
        open ? "top-3 -rotate-45" : "top-5",
      ].join(" ")} />
    </span>
  );
}

const typeIcon: Record<SimpleLocation["typeLabel"], (props: { className?: string }) => JSX.Element> = {
  Restaurant: PinIcon,
  "Food Truck": TruckIcon,
  "Pop-Up": SparkIcon,
};

const navItems = [
  { label: "Locations", href: "/location" },
  { label: "Catering", href: "/catering" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function LocationsPage() {
  // Opens by default on Permanent Location/Food Truck.
  const [activeCategory, setActiveCategory] =
    useState<LocationCategory>("permanent");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Locations | Karachi Flames";
    const existingDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const description = existingDescription ?? document.createElement("meta");
    if (!existingDescription) {
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content =
      "Find Karachi Flames — our permanent location, food truck, and upcoming pop-ups, with directions on Google Maps.";
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

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

  const filteredLocations = useMemo(
    () => locations.filter((location) => location.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808] text-[#f5f1e8] selection:bg-[#c65a24] selection:text-white">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-[#f5f1e8] px-5 py-3 text-sm font-bold text-[#080808] focus:not-sr-only"
      >
        Skip to content
      </a>

      {/* =========================================================
          NAVBAR — unchanged
      ========================================================== */}
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
            className="relative z-[130] block h-[68px] w-[205px] shrink-0 overflow-visible sm:h-[78px] sm:w-[235px] lg:h-[88px] lg:w-[285px] xl:h-[94px] xl:w-[315px]"
          >
            <Image
              src="/logo.png"
              alt="Karachi Flames"
              fill
              priority
              sizes="(min-width: 1280px) 315px, (min-width: 1024px) 285px, 235px"
              className="object-contain object-left"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center justify-center gap-5 xl:gap-7 2xl:gap-9">
              {navItems.map((item) => {
                const active = item.href === "/location";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "group relative whitespace-nowrap px-1 py-3",
                      "text-[14px] font-extrabold uppercase tracking-[0.02em]",
                      "transition-all duration-300 xl:text-[15px]",
                      active ? "text-[#e87636]" : "text-white hover:text-[#e87636]",
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
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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

        {/* ================= MOBILE MENU — unchanged ================= */}
        <div
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          className={[
            "fixed inset-0 z-[120] h-[100dvh] w-full lg:hidden",
            "bg-[#080808]",
            "transition-all duration-500 ease-out",
            menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-full opacity-0",
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
                {navItems.map((item, index) => {
                  const active = item.href === "/location";

                  return (
                    <li key={item.href} className="border-b border-white/10">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={[
                          "group flex w-full items-center justify-between",
                          "py-[11px] sm:py-[13px]",
                          "text-[20px] font-black uppercase",
                          "tracking-[-0.035em]",
                          "transition-all duration-300",
                          active ? "text-[#e87636]" : "text-white hover:text-[#e87636]",
                        ].join(" ")}
                        style={{ transitionDelay: menuOpen ? `${index * 35}ms` : "0ms" }}
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

      {/* =========================================================
          MAIN
      ========================================================== */}
      <div id="main-content">
        {/* HERO — one deliberate, cinematic moment */}
        <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-40">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
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
              Come find <em className="font-normal text-[#e88b58]">the flame.</em>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#c9c4b9] sm:text-lg">
              Our permanent spot, the food truck, and every upcoming pop-up —
              pick a tab below and get directions in one tap.
            </p>
          </div>
        </section>

        {/* LOCATIONS */}
        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            {/* Segmented tab toggle */}
            <div
              role="tablist"
              aria-label="Filter locations"
              className="inline-flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-1.5 sm:w-auto sm:flex-row"
            >
              {categoryTabs.map((tab) => {
                const active = activeCategory === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`location-tab-${tab.id}`}
                    aria-selected={active}
                    aria-controls="location-results"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c65a24] ${
                      active
                        ? "bg-[#c65a24] text-white shadow-[0_10px_30px_rgba(198,90,36,0.28)]"
                        : "text-[#a49d92] hover:text-[#f5f1e8]"
                    }`}
                  >
                    {tab.id === "permanent" ? (
                      <PinIcon className="h-4 w-4" />
                    ) : (
                      <SparkIcon className="h-4 w-4" />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Results */}
            <div
              id="location-results"
              role="tabpanel"
              aria-labelledby={`location-tab-${activeCategory}`}
              className="mt-9 grid gap-6 sm:grid-cols-2"
            >
              {filteredLocations.length ? (
                filteredLocations.map((location) => {
                  const TypeIcon = typeIcon[location.typeLabel];

                  return (
                    <article
                      key={location.id}
                      className="group overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c65a24]/55 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                    >
                      {/* Embedded Google Map */}
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

                        {location.date && (
                          <p className="mt-2 text-sm font-semibold text-[#e88b58]">{location.date}</p>
                        )}

                        <a
                          href={getDirectionsUrl(location)}
                          target="_blank"
                          rel="noreferrer"
                          className="group/btn mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#c65a24] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#d76a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f1e8]"
                        >
                          Get directions
                          <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </a>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="col-span-full py-10 text-sm text-[#a29b90]">
                  No {activeCategory === "pop-up" ? "pop-ups" : "locations"} to show yet — check back soon.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================
          FOOTER — simplified
      ========================================================== */}
      <footer className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="font-serif text-xl tracking-[-0.03em] text-[#f5f1e8] transition-colors hover:text-[#e88b58] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d76a2c]"
            >
              Karachi Flames
            </Link>

            {halalLogoSrc ? (
              <Image
                src={halalLogoSrc}
                alt="Hand-slaughtered Zabiha Halal"
                width={150}
                height={56}
                className="mt-2 h-8 w-auto object-contain"
              />
            ) : (
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#d7a087]">
                Hand-slaughtered Zabiha Halal
              </p>
            )}
          </div>

          <p className="text-xs text-[#716c64]">© Karachi Flames. All rights reserved.</p>
        </div>
      </footer>

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