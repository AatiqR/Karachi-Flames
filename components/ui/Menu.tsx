"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Category =
  | "All"
  | "Rolls"
  | "Burgers"
  | "Biryani"
  | "BBQ"
  | "Platter"
  | "Desserts"
  | "Drinks";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  category: Exclude<Category, "All">;
  imagePath: string;
  imageAlt: string;
  addon?: string;
  featured?: boolean;
};

/* =========================================================
   NAVBAR DATA
   ========================================================= */

const imagePaths = {
  logo: "/logo.png",
  halal: "/halal.png",
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

/* =========================================================
   NAVBAR ICONS
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

/* =========================================================
   MENU CATEGORIES
   ========================================================= */

const categories: Category[] = [
  "All",
  "Rolls",
  "Burgers",
  "Biryani",
  "BBQ",
  "Platter",
  "Desserts",
  "Drinks",
];

/* =========================================================
   MENU DATA
   ========================================================= */

const mainMenu: MenuItem[] = [
  /* =========================
     ROLLS
     ========================= */

  {
    name: "Beef Bihari Kabab Roll",
    description:
      "Flaky paratha, beef bihari kabab, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$13.99",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Beef Bihari Kabab Roll",
    featured: true,
  },

  {
    name: "Chicken Tikka Boti Roll",
    description:
      "Flaky paratha, chicken tikka boti, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$11.99",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Tikka Boti Roll",
  },

  {
    name: "Chicken Malai Boti Roll",
    description:
      "Flaky paratha, chicken malai boti, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$11.99",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Malai Boti Roll",
  },

  /* =========================
     BURGERS
     ========================= */

  {
    name: "KF Flame House Burger",
    description:
      "Potato bun, smashed beef patty, chopped jalapeños, white cheddar, pineapple, pickles, and KF Flame House sauce.",
    price: "$11.99",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "KF Flame House Burger",
    featured: true,
  },

  {
    name: "Classic Smash Burger",
    description:
      "Potato bun, smashed beef patty, white cheddar, KF mild white sauce, pickles, jalapeños, lettuce, and red onions.",
    price: "$9.99",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "Classic Smash Burger",
  },

  /* =========================
     BIRYANI
     ========================= */

  {
    name: "Karachi Chicken Biryani",
    description:
      "Spiced basmati rice, chicken, potato, and unmistakable Karachi-style flavor.",
    price: "$14.99",
    category: "Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Karachi Chicken Biryani",
    featured: true,
  },

  {
    name: "Karachi Beef Biryani",
    description:
      "Spiced sela rice, boneless beef and authentic Karachi-Style Flavor",
    price: "$16.99",
    category: "Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Karachi Beef Biryani",
  },

  /* =========================
     BBQ
     ========================= */

  {
    name: "Chicken Tikka (Leg)",
    description:
      "Juicy fire-grilled chicken leg marinated in traditional Karachi-style spices.",
    price: "$4.99",
    category: "BBQ",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Tikka Leg",
  },

  /* =========================
     DESSERTS
     ========================= */

  {
    name: "Biscoff Mango Mousse",
    description:
      "Biscoff crumbles, creamy mango mousse, mango chunks, and mango syrup.",
    price: "$4.99",
    category: "Desserts",
    imagePath: "/menu.jpg",
    imageAlt: "Biscoff Mango Mousse",
  },

  {
    name: "Chocolate Mousse",
    description:
      "Chocolate cake, creamy chocolate mousse, chocolate syrup, and chocolate chips.",
    price: "$4.99",
    category: "Desserts",
    imagePath: "/menu.jpg",
    imageAlt: "Chocolate Mousse",
  },

  /* =========================
     DRINKS
     ========================= */

  {
    name: "Soda",
    description: "Sprite, Pepsi, or Orange.",
    price: "$2.50",
    category: "Drinks",
    imagePath: "/menu.jpg",
    imageAlt: "Chilled soda",
  },
];

/* =========================================================
   FOOD PLACEHOLDER
   ========================================================= */

function FoodPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative flex h-full min-h-56 items-end overflow-hidden bg-[#211712] p-5 sm:min-h-64"
      aria-label={`${label} image coming soon`}
      role="img"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(198,90,36,.52), transparent 34%), linear-gradient(135deg, rgba(255,255,255,.07) 1px, transparent 1px)",
          backgroundSize: "auto, 13px 13px",
        }}
      />

      <div className="relative border-l border-[#d66528] pl-3">
        <p className="font-serif text-lg italic text-[#f5f2ec]">
          Karachi Flames
        </p>

        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8d3ca]/75">
          Food image coming soon
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   FOOD CARD
   ========================================================= */

function FoodCard({ item }: { item: MenuItem }) {
  const hasImage = false;

  return (
    <article className="group overflow-hidden rounded-[1.15rem] border border-white/[0.09] bg-[#171513] transition duration-300 motion-reduce:transition-none md:hover:-translate-y-1 md:hover:border-[#c65a24]/55 md:hover:shadow-[0_20px_46px_rgba(0,0,0,.32)]">
      <div className="relative overflow-hidden">
        {hasImage ? (
          <Image
            src={item.imagePath}
            alt={item.imageAlt}
            width={800}
            height={600}
            className="h-56 w-full object-cover transition duration-500 motion-reduce:transition-none md:group-hover:scale-[1.04]"
          />
        ) : (
          <FoodPlaceholder label={item.name} />
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[1.4rem] font-semibold leading-tight text-[#f5f2ec]">
            {item.name}
          </h3>

          <p className="shrink-0 font-serif text-lg font-semibold text-[#e67838]">
            {item.price}
          </p>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#d8d3ca]/78">
          {item.description}
        </p>

        {item.addon && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#e67838]">
            {item.addon}
          </p>
        )}
      </div>
    </article>
  );
}

/* =========================================================
   PLATTER COMING SOON
   ========================================================= */

function PlatterComingSoon() {
  return (
    <div className="col-span-full relative overflow-hidden rounded-[1.5rem] border border-[#c65a24]/25 bg-[#15110f] px-6 py-20 text-center sm:px-10 sm:py-28">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c75a24]/15 blur-[100px]"
        aria-hidden="true"
      />

      {/* Decorative rings */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c75a24]/10 sm:h-80 sm:w-80"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl">
        {/* Small badge */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c75a24]/40 bg-[#c75a24]/10">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-[#e67838]"
          >
            <path
              d="M12 3v18M5 7h14M5 17h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-[#e67838]">
          Platter Collection
        </p>

        <h3 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.03em] text-[#f5f2ec] sm:text-5xl">
          Coming Soon
        </h3>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#d8d3ca]/70 sm:text-base">
          Something special is being prepared. Our Karachi Flames platters
          are coming soon with bold flavors made for sharing.
        </p>

        <div className="mx-auto mt-8 h-px w-16 bg-[#c75a24]" />

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
          Stay tuned for the full platter menu
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   MENU PAGE
   ========================================================= */

export default function MenuPage() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

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

  const filteredMenu = useMemo(
    () =>
      activeCategory === "All"
        ? mainMenu
        : mainMenu.filter(
            (item) => item.category === activeCategory
          ),
    [activeCategory]
  );

  const isPlatter = activeCategory === "Platter";

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
                const active = item.href === "/menu";

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
                  const active = item.href === "/menu";

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
                href="/menu"
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
          MENU HERO
          ===================================================== */}

      <section className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pt-44">

        <div
          className="absolute left-1/2 top-0 h-[420px] w-[min(850px,100%)] -translate-x-1/2 rounded-full bg-[#c65a24]/[0.13] blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl">

          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#e67838]">
            Karachi Flames · Menu
          </p>

          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-[#f5f2ec] sm:text-6xl lg:text-7xl">
            Authentic flavor of Karachi.{" "}
            <em className="font-normal text-[#e67838]">
              Done right!
            </em>
          </h1>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <p className="max-w-xl text-base leading-7 text-[#d8d3ca]/80 sm:text-lg">
              Bold Karachi flavors, fire-grilled favorites, and comfort food made with passion.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          CATEGORY BAR
          ===================================================== */}

      <section
        className="sticky top-0 z-30 border-y border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-md"
        aria-label="Menu categories"
      >
        <div className="scrollbar-none mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e67838] ${
                activeCategory === category
                  ? "bg-[#c65a24] text-white shadow-[0_6px_18px_rgba(198,90,36,.22)]"
                  : "border border-white/[0.12] text-[#d8d3ca] hover:border-[#c65a24]/70 hover:text-white"
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}

        </div>
      </section>

      {/* =====================================================
          MAIN MENU
          ===================================================== */}

      <section
        className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
        aria-labelledby="main-menu-heading"
      >

        <div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">
              {isPlatter ? "Coming soon" : "The main menu"}
            </p>

            <h2
              id="main-menu-heading"
              className="mt-3 font-serif text-4xl tracking-[-0.025em] sm:text-5xl"
            >
              {isPlatter ? "Platter Collection." : "Made for the table."}
            </h2>
          </div>

          {!isPlatter && (
            <p className="text-sm text-[#d8d3ca]/60">
              {filteredMenu.length}{" "}
              {filteredMenu.length === 1 ? "item" : "items"}
            </p>
          )}

        </div>

        {isPlatter ? (
          <div className="grid grid-cols-1">
            <PlatterComingSoon />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredMenu.map((item) => (
              <FoodCard
                key={`${item.category}-${item.name}`}
                item={item}
              />
            ))}

            {filteredMenu.length === 0 && (
              <p className="col-span-full py-16 text-center text-sm text-[#d8d3ca]/55">
                No items in this category yet — check back soon.
              </p>
            )}

          </div>
        )}
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
                  <a
                    href="/location"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Locations
                  </a>
                </li>

                <li>
                  <a
                    href="/catering"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Catering
                  </a>
                </li>

                <li>
                  <a
                    href="/menu"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Menu
                  </a>
                </li>

                <li>
                  <a
                    href="/gallery"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Gallery
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    href="/contact"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>

              </ul>
            </div>

          </div>

          {/* HALAL BADGE */}

          <div className="mt-10 flex items-center justify-center gap-3 border-t border-dashed border-white/15 pt-8 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 sm:justify-start sm:text-left">

            <span className="relative h-8 w-10 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/halal.png"
                alt=""
                className="h-full w-full object-contain"
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
          GLOBAL ACCESSIBILITY / SCROLLBAR CSS
          ===================================================== */}

      <style jsx global>{`
        .scrollbar-none {
          scrollbar-width: none;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

    </main>
  );
}