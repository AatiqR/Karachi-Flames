"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const imagePaths = {
  hero: "/hero.jpg",
  wedding: "/hero.jpg",
  corporate: "/hero.jpg",
  privateEvent: "/hero.jpg",
  community: "/hero.jpg",
  dinner: "/hero.jpg",
  celebration: "/hero.jpg",
  feature: "/hero.jpg",
  galleryOne: "/hero.jpg",
  galleryTwo: "/hero.jpg",
  galleryThree: "/hero.jpg",
  galleryFour: "/hero.jpg",
  halal: "/images/hand-slaughtered-zabiha-halal.svg",
  logo: "/logo.png",
};

const navigation = [

  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/location" },
  { label: "Catering", href: "/catering" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/",
};

const eventTypes = [
  {
    title: "Weddings",
    description:
      "A bold, generous table for the day everyone will remember.",
    image: imagePaths.wedding,
  },
  {
    title: "Corporate Events",
    description:
      "Thoughtful catering for teams, launches, and gatherings with momentum.",
    image: imagePaths.corporate,
  },
  {
    title: "Private Parties",
    description:
      "Bring the warmth of Karachi Flames to birthdays, anniversaries, and family tables.",
    image: imagePaths.privateEvent,
  },
  {
    title: "Community Events",
    description:
      "Food made to gather around, served with genuine hospitality.",
    image: imagePaths.community,
  },
  {
    title: "Private Dinners",
    description:
      "An intimate, elevated BBQ experience designed around your guests.",
    image: imagePaths.dinner,
  },
  {
    title: "Special Celebrations",
    description:
      "For engagements, reunions, and every moment worth marking well.",
    image: imagePaths.celebration,
  },
];

const cateringOptions = [
  {
    number: "01",
    title: "Full-Service Catering",
    copy:
      "Our complete catering experience, from presentation and setup to attentive service, so you can stay present with your guests.",
  },
  {
    number: "02",
    title: "Event Catering",
    copy:
      "A flexible food experience for celebrations, corporate gatherings, and occasions of every kind.",
  },
  {
    number: "03",
    title: "Pick-Up & Delivery",
    copy:
      "Choose your favorites, arrange collection or delivery, and bring Karachi flavor straight to the table.",
  },
];

const packages = [
  {
    name: "Essential",
    description: "For relaxed gatherings and smaller events.",
    price: "Starting at $XX / person",
    includes: ["BBQ selections", "Sides and sauces", "Serving setup"],
    featured: false,
  },
  {
    name: "Signature",
    description: "Our most-requested catering experience.",
    price: "Starting at $XX / person",
    includes: [
      "Premium BBQ selections",
      "Signature sides and sauces",
      "Professional setup",
      "Serving support",
    ],
    featured: true,
  },
  {
    name: "Premier",
    description: "For larger celebrations and elevated occasions.",
    price: "Starting at $XX / person",
    includes: [
      "Premium menu",
      "Full setup",
      "Professional service",
      "Custom event options",
    ],
    featured: false,
  },
];

const reasons = [
  [
    "Authentic Karachi Flavor",
    "Bold recipes and the unmistakable character of Karachi cooking.",
  ],
  [
    "100% Zabiha Halal",
    "Hand-slaughtered Zabiha Halal ingredients, prepared with care.",
  ],
  [
    "Fire-Grilled Quality",
    "Freshly prepared food with depth, smoke, and a generous spirit.",
  ],
  [
    "Made for Your Event",
    "A catering plan shaped around your occasion, guests, and table.",
  ],
];

const faqs = [
  [
    "How far in advance should I book catering?",
    "Booking guidance will be confirmed with the Karachi Flames team. Please share your event date in the quote request and we will advise on availability.",
  ],
  [
    "Do you cater weddings and corporate events?",
    "Wedding and corporate-event inquiries are welcome. Tell us about the occasion and the team will help shape the right experience.",
  ],
  [
    "Can I customize the menu?",
    "Menu options and customization are discussed as part of your catering inquiry.",
  ],
  [
    "Are your meats Zabiha Halal?",
    "Karachi Flames uses hand-slaughtered Zabiha Halal ingredients.",
  ],
  [
    "Do you offer full-service catering, delivery, or on-site BBQ?",
    "Available formats depend on the event. Select your preferred style in the inquiry form and our team will follow up with the relevant options.",
  ],
];

const policies = [
  "Catering Policy",
  "Cancellation Policy",
  "Deposit Policy",
  "Delivery Policy",
  "Minimum Order",
  "Service Area",
  "Dietary / Allergy Information",
];

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

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em]">
        {label}
        {required && <span className="text-[#c75a24]"> *</span>}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        min={min}
        className="min-h-14 w-full border border-black/20 bg-transparent px-4 text-base outline-none transition focus:border-[#c75a24] focus:ring-1 focus:ring-[#c75a24]"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em]">
        {label}
        {required && <span className="text-[#c75a24]"> *</span>}
      </span>

      <select
        name={name}
        required={required}
        defaultValue=""
        className="min-h-14 w-full border border-black/20 bg-[#f5f1e8] px-4 text-base outline-none transition focus:border-[#c75a24] focus:ring-1 focus:ring-[#c75a24]"
      >
        <option value="" disabled>
          Select an option
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function CateringPrivateEventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openPolicy, setOpenPolicy] = useState<number | null>(null);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

            {/* NAVIGATION
                IMPORTANT:
                No overflow-y-auto.
                All seven items are fitted into the viewport.
            */}
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

              <a
                href="#inquiry"
                className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#c75a24] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#df7441] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Request a quote
                <Arrow className="ml-3 h-5 w-5" />
              </a>

              <a
                href="#packages"
                className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/50 bg-black/20 px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                View catering menu
              </a>

            </div>

            <div className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">

              <span className="relative h-8 w-10">
                <Image
                  src={imagePaths.halal}
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>

              100% Hand-Slaughtered Zabiha Halal

            </div>

          </div>
        </div>
      </section>

      {/* ========================= EVENTS ========================= */}

      <section className="bg-[#f5f1e8] px-5 py-20 text-[#111] sm:px-8 sm:py-28 lg:px-12">

        <div className="mx-auto max-w-[1600px]">

          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c75a24]">
                Gather around
              </p>

              <h2 className="mt-4 max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
                Made for the moments that matter.
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-black/65">
              A generous spread, an unforgettable first bite, and food that
              keeps the conversation at the table. Tell us what you are
              celebrating.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {eventTypes.map((event) => (
              <article
                key={event.title}
                className="group overflow-hidden bg-[#111]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">

                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1280px) 31vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                </div>

                <div className="p-6 text-white">

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e88651]">
                    Private events
                  </span>

                  <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.045em]">
                    {event.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {event.description}
                  </p>

                  <span className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-[0.13em]">
                    Explore
                    <Arrow className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>

                </div>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ========================= OPTIONS ========================= */}

      <section className="bg-[#111] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">

        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.76fr_1.24fr]">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d76a2c]">
              How we cater
            </p>

            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
              Catering made for your event.
            </h2>

            <p className="mt-6 max-w-md leading-7 text-white/65">
              Whatever you are planning, we will help build a Karachi Flames
              experience around it.
            </p>
          </div>

          <div className="border-t border-white/15">

            {cateringOptions.map((option) => (
              <article
                key={option.number}
                className="grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[70px_1fr_auto] sm:gap-7"
              >

                <span className="font-mono text-sm text-[#d76a2c]">
                  {option.number}
                </span>

                <div>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">
                    {option.title}
                  </h3>

                  <p className="mt-3 max-w-2xl leading-7 text-white/60">
                    {option.copy}
                  </p>
                </div>

                <a
                  href="#inquiry"
                  aria-label={option.title}
                  className="inline-flex h-11 w-11 items-center justify-center self-center rounded-full border border-white/25 transition hover:border-[#d76a2c] hover:bg-[#c75a24]"
                >
                  <Arrow className="h-5 w-5" />
                </a>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ========================= FEATURE ========================= */}

      <section className="grid bg-[#c75a24] lg:grid-cols-2">

        <div className="relative min-h-[430px] lg:min-h-[670px]">

          <Image
            src={imagePaths.feature}
            alt="Karachi Flames barbecue"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />

        </div>

        <div className="flex items-center px-5 py-20 sm:px-10 lg:px-16">

          <div className="max-w-xl">

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/65">
              The Karachi Flames experience
            </p>

            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.86] tracking-[-0.06em] text-[#15100d] sm:text-7xl">
              Your event. Our flame.
            </h2>

            <p className="mt-7 text-lg leading-8 text-black/70">
              From the first spark to the final plate, Karachi Flames brings
              the energy, flavor, and hospitality of our kitchen directly to
              your event.
            </p>

            <a
              href="#inquiry"
              className="mt-9 inline-flex min-h-14 items-center rounded-md bg-[#111] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
            >
              Start your inquiry
              <Arrow className="ml-3 h-5 w-5" />
            </a>

          </div>
        </div>
      </section>

      {/* ========================= PACKAGES ========================= */}

      <section
        id="packages"
        className="scroll-mt-6 bg-[#0b0b0b] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >

        <div className="mx-auto max-w-[1600px]">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d76a2c]">
              Built around your table
            </p>

            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
              Catering packages.
            </h2>

            <p className="mt-5 leading-7 text-white/65">
              Choose a starting point. Every event is different, and the final
              experience is tailored with our team.
            </p>

          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">

            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={[
                  "relative flex min-h-[480px] flex-col rounded-sm border p-7 sm:p-9",
                  pkg.featured
                    ? "border-[#d76a2c] bg-[#1b120e]"
                    : "border-white/15 bg-[#111]",
                ].join(" ")}
              >

                {pkg.featured && (
                  <span className="absolute -top-3 left-7 rounded-sm bg-[#d76a2c] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
                    Most popular
                  </span>
                )}

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e88651]">
                  Karachi Flames
                </p>

                <h3 className="mt-5 text-4xl font-black uppercase tracking-[-0.05em]">
                  {pkg.name}
                </h3>

                <p className="mt-4 leading-7 text-white/65">
                  {pkg.description}
                </p>

                <p className="mt-8 border-y border-white/15 py-5 text-lg font-bold">
                  {pkg.price}
                </p>

                <ul className="mt-7 space-y-4 text-sm text-white/75">

                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d76a2c]" />
                      {item}
                    </li>
                  ))}

                </ul>

                <a
                  href="#inquiry"
                  className="mt-auto inline-flex min-h-12 items-center pt-8 text-xs font-bold uppercase tracking-[0.14em] text-[#e88651] transition hover:text-white"
                >
                  Request a quote
                  <Arrow className="ml-2 h-4 w-4" />
                </a>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ========================= GALLERY ========================= */}

      <section className="bg-[#f5f1e8] px-5 py-20 text-[#111] sm:px-8 sm:py-28 lg:px-12">

        <div className="mx-auto max-w-[1600px]">

          <div className="mb-10 max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c75a24]">
              A table worth gathering around
            </p>

            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
              Flavor in every frame.
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[220px_220px_220px]">

            <div className="relative col-span-2 min-h-[300px] overflow-hidden lg:col-span-5 lg:row-span-2 lg:min-h-0">
              <Image
                src={imagePaths.galleryOne}
                alt="Karachi Flames catered food"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="relative min-h-[180px] overflow-hidden lg:col-span-3 lg:min-h-0">
              <Image
                src={imagePaths.galleryTwo}
                alt="Karachi Flames event"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="flex min-h-[180px] flex-col justify-end bg-[#17120f] p-5 text-[#f5f1e8] lg:col-span-4 lg:min-h-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e88651]">
                The details
              </p>

              <p className="mt-3 text-xl font-black uppercase leading-none tracking-[-0.04em]">
                Smoke, spice, and a generous welcome.
              </p>
            </div>

            <div className="flex min-h-[180px] flex-col justify-center bg-[#c75a24] p-5 lg:col-span-3 lg:row-span-2 lg:min-h-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
                Your celebration
              </p>

              <p className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Bring everyone to the table.
              </p>
            </div>

            <div className="relative min-h-[180px] overflow-hidden lg:col-span-4 lg:row-span-2 lg:min-h-0">
              <Image
                src={imagePaths.galleryThree}
                alt="Karachi Flames platter"
                fill
                sizes="(min-width: 1024px) 34vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="relative col-span-2 min-h-[250px] overflow-hidden lg:col-span-5 lg:min-h-0">
              <Image
                src={imagePaths.galleryFour}
                alt="Karachi Flames grill"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================= WHY ========================= */}

      <section className="bg-[#151515] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">

        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d76a2c]">
              The Karachi Flames difference
            </p>

            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
              Why Karachi Flames?
            </h2>

          </div>

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">

            {reasons.map(([title, copy], index) => (
              <article
                key={title}
                className="border-t border-white/15 pt-5"
              >

                <span className="font-mono text-xs text-[#d76a2c]">
                  0{index + 1}
                </span>

                <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.035em]">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  {copy}
                </p>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ========================= INQUIRY ========================= */}

      <section
        id="inquiry"
        className="scroll-mt-6 bg-[#f5f1e8] px-5 py-20 text-[#111] sm:px-8 sm:py-28 lg:px-12"
      >

        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.78fr_1.22fr]">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c75a24]">
              Start the conversation
            </p>

            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
              Let&apos;s cater your next event.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-black/65">
              Tell us a little about your event and our team will help you
              create the right Karachi Flames experience.
            </p>

            <div className="mt-10 border-l-2 border-[#c75a24] pl-5">

              <p className="text-xs font-bold uppercase tracking-[0.15em]">
                Need to reach us directly?
              </p>

              <p className="mt-2 text-black/60">
                [Contact Number]
                <br />
                [Contact Email]
              </p>

            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
          >

            <Field
              label="Name"
              name="name"
              placeholder="First & Last Name"
              required
            />

            <Field
              label="Email"
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <Field
              label="Phone"
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
            />

            <SelectField
              label="Event type"
              name="eventType"
              required
              options={[
                "Wedding",
                "Corporate Event",
                "Private Party",
                "Birthday",
                "Family Gathering",
                "Community Event",
                "Other",
              ]}
            />

            <Field
              label="Event date"
              type="date"
              name="eventDate"
              required
            />

            <Field
              label="Guest count"
              type="number"
              name="guestCount"
              placeholder="Number of guests"
              min="1"
              required
            />

            <Field
              label="Event location"
              name="location"
              placeholder="City / Venue"
              required
            />

            <SelectField
              label="Catering style"
              name="cateringStyle"
              required
              options={[
                "Full-Service Catering",
                "Event Catering",
                "Pick-Up",
                "Delivery",
                "On-Site BBQ",
                "Not Sure Yet",
              ]}
            />

            <Field
              label="Budget (optional)"
              name="budget"
              placeholder="Your estimated budget"
            />

            <label className="sm:col-span-2">

              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em]">
                Additional details
              </span>

              <textarea
                name="details"
                rows={6}
                placeholder="Tell us about your event, menu preferences, timing, or anything else we should know."
                className="w-full resize-y border border-black/20 bg-transparent px-4 py-4 text-base outline-none transition placeholder:text-black/35 focus:border-[#c75a24] focus:ring-1 focus:ring-[#c75a24]"
              />

            </label>

            <div className="sm:col-span-2">

              <button
                type="submit"
                className="inline-flex min-h-14 w-full items-center justify-center rounded-md bg-[#c75a24] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#a94216] focus:outline-none focus:ring-2 focus:ring-[#111]"
              >
                Request a quote
                <Arrow className="ml-3 h-5 w-5" />
              </button>

            </div>

          </form>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}

      <section className="bg-[#111] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">

        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-2">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d76a2c]">
              Questions, answered
            </p>

            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
              Good to know.
            </h2>

            <div className="mt-10 border-t border-white/15">

              {faqs.map(([question, answer], index) => {
                const open = openFaq === index;

                return (
                  <div key={question} className="border-b border-white/15">

                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-bold uppercase tracking-[-0.02em] focus:outline-none focus:text-[#e88651]"
                    >

                      <span>{question}</span>

                      <span
                        className={[
                          "text-2xl font-normal text-[#d76a2c]",
                          "transition-transform duration-300",
                          open ? "rotate-180" : "",
                        ].join(" ")}
                      >
                        {open ? "−" : "+"}
                      </span>

                    </button>

                    {open && (
                      <div className="pb-5 pr-9">
                        <p className="text-sm leading-6 text-white/60">
                          {answer}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          </div>

          <div className="lg:pt-[78px]">

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d76a2c]">
              Policies &amp; service details
            </p>

            <div className="mt-5 border-t border-white/15">

              {policies.map((policy, index) => {
                const open = openPolicy === index;

                return (
                  <div key={policy} className="border-b border-white/15">

                    <button
                      type="button"
                      onClick={() =>
                        setOpenPolicy(open ? null : index)
                      }
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-bold uppercase tracking-[-0.02em] focus:outline-none focus:text-[#e88651]"
                    >

                      <span>{policy}</span>

                      <span className="text-2xl font-normal text-[#d76a2c]">
                        {open ? "−" : "+"}
                      </span>

                    </button>

                    {open && (
                      <div className="pb-5">
                        <p className="text-sm leading-6 text-white/60">
                          Policy details coming soon.
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

            <div className="mt-10 border border-[#d76a2c]/50 bg-[#1b120e] p-6">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e88651]">
                Where we cater
              </p>

              <p className="mt-3 text-lg leading-7 text-white/80">
                Serving [City / Area] and surrounding communities.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ========================= CTA ========================= */}

      <section className="relative isolate overflow-hidden bg-[#c75a24] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">

        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#f0a075]/25 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px] text-center">

          <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/65">
            Karachi Flames catering
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.07em] text-[#14100d] sm:text-7xl lg:text-8xl">
            Your event deserves the flame.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-black/70">
            From intimate gatherings to unforgettable celebrations, let
            Karachi Flames bring authentic flavor to your table.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="#inquiry"
              className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#111] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
            >
              Request a quote
            </a>

            <Link
              href="/menu"
              className="inline-flex min-h-14 items-center justify-center rounded-md border border-black/50 px-7 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white"
            >
              View menu
            </Link>

          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}

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
