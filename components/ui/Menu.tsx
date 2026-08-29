
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Category =
  | "All"
  | "Rolls"
  | "Burgers"
  | "Rice & Biryani"
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
   EXACT CATERING NAVBAR DATA
   ========================================================= */

const imagePaths = {
  logo: "/logo.png",
  halal: "/halal.png",
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

/* =========================================================
   EXACT CATERING NAVBAR ICONS
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
   MENU DATA
   ========================================================= */

const categories: Category[] = [
  "All",
  "Rolls",
  "Burgers",
  "Rice & Biryani",
  "Desserts",
  "Drinks",
];

const mainMenu: MenuItem[] = [
  {
    name: "Beef Bihari Boti Roll",
    description:
      "Flaky paratha, beef bihari kabab, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$12.99",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Beef Bihari Boti Roll",
    featured: true,
  },
  {
    name: "Chicken Malai Boti Roll",
    description:
      "Flaky paratha, chicken malai boti, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$12.99",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Malai Boti Roll",
  },
  {
    name: "KF Flame House Smash Burger",
    description:
      "Potato bun, smashed beef patty, chopped jalapeños, white cheddar, pineapple, pickles, and KF Flame House sauce.",
    price: "$12.99",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "KF Flame House Smash Burger",
    featured: true,
  },
  {
    name: "Classic Smash Burger",
    description:
      "Potato bun, smashed beef patty, white cheddar, KF mild white sauce, pickles, jalapeños, lettuce, and red onions.",
    price: "$12.99",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "Classic Smash Burger",
  },
  {
    name: "Karachi Chicken Biryani",
    description:
      "Spiced basmati rice, chicken, potato, and unmistakable Karachi-style flavor.",
    price: "$14.99",
    category: "Rice & Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Karachi Chicken Biryani",
    featured: true,
  },
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
  {
    name: "Soda",
    description: "Sprite, Pepsi, or Orange.",
    price: "$2.50",
    category: "Drinks",
    imagePath: "/menu.jpg",
    imageAlt: "Chilled soda",
  },
];

const specialMenu: MenuItem[] = [
  {
    name: "Beef Bihari Roll",
    description:
      "Flaky paratha, beef bihari kabab, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$14",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Beef Bihari Roll",
  },
  {
    name: "Chicken Malai Boti Roll",
    description:
      "Flaky paratha, chicken malai boti, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$14",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Malai Boti Roll",
  },
  {
    name: "KF Flame House Smash Burger",
    description:
      "Brioche bun, smashed beef patty, chopped jalapeños, white cheddar, pineapple, pickles, and KF Flame House sauce.",
    price: "$13",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "KF Flame House Smash Burger",
    addon: "Add onion ring +$1",
  },
  {
    name: "Classic Smash Burger",
    description:
      "Brioche bun, smashed beef patty, white cheddar, KF mild white sauce, pickles, jalapeños, and lettuce.",
    price: "$13",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "Classic Smash Burger",
    addon: "Add onion ring +$1",
  },
  {
    name: "Karachi Beef Biryani",
    description:
      "Spiced sela rice, tender boneless beef boti, and authentic Karachi-style flavor.",
    price: "Ask in store",
    category: "Rice & Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Karachi Beef Biryani",
  },
  {
    name: "Chicken Yakhni Pulao",
    description:
      "Aromatic basmati rice with tender chicken pieces infused with authentic yakhni flavors.",
    price: "$15",
    category: "Rice & Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Yakhni Pulao",
  },
  {
    name: "Chilled Soda",
    description: "Your choice of cold, refreshing soda.",
    price: "$2",
    category: "Drinks",
    imagePath: "/menu.jpg",
    imageAlt: "Chilled soda",
  },
];

const fridayMenu: MenuItem[] = [
  {
    name: "Beef Bihari Kabab Roll",
    description:
      "Flaky paratha, beef bihari kabab, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$14",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Beef Bihari Kabab Roll",
  },
  {
    name: "Chicken Tikka Boti Roll",
    description:
      "Flaky paratha, chicken tikka boti, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$14",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Tikka Boti Roll",
  },
  {
    name: "BBQ Pulled Chicken Sliders",
    description:
      "Garlic-parmesan crusted slider buns, smoky BBQ pulled chicken, and crunchy lettuce.",
    price: "$10",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "BBQ Pulled Chicken Sliders",
  },
  {
    name: "Karachi Beef Biryani",
    description:
      "Spiced sela rice, tender boneless beef boti, and authentic Karachi-style flavor.",
    price: "$17",
    category: "Rice & Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Karachi Beef Biryani",
  },
  {
    name: "KF Mango Fizz",
    description:
      "Mango pulp, lemonade, Sprite, and a splash of mint.",
    price: "$4",
    category: "Drinks",
    imagePath: "/menu.jpg",
    imageAlt: "KF Mango Fizz",
  },
  {
    name: "Drinks",
    description: "Chilled soda or water.",
    price: "$2",
    category: "Drinks",
    imagePath: "/menu.jpg",
    imageAlt: "Chilled drinks",
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

function FoodCard({
  item,
  showImage = true,
}: {
  item: MenuItem;
  showImage?: boolean;
}) {
  const hasImage = false;

  return (
    <article className="group overflow-hidden rounded-[1.15rem] border border-white/[0.09] bg-[#171513] transition duration-300 motion-reduce:transition-none md:hover:-translate-y-1 md:hover:border-[#c65a24]/55 md:hover:shadow-[0_20px_46px_rgba(0,0,0,.32)]">
      {showImage && (
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
      )}

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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b0b0b] text-[#f5f1e8] selection:bg-[#c75a24] selection:text-white">

      {/* =====================================================
          EXACT CATERING NAVBAR
          ONLY ACTIVE PAGE CHANGED TO /menu
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
            EXACT CATERING MOBILE MENU
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
          MENU CONTENT
          EVERYTHING BELOW THE NAVBAR REMAINS MENU CONTENT
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

            <div className="flex items-center border-l border-[#c65a24] pl-4">
              <Image
                src={imagePaths.halal}
                alt="Hand-slaughtered Zabiha Halal"
                width={138}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}

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

      {/* MAIN MENU */}

      <section
        className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
        aria-labelledby="main-menu-heading"
      >
        <div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">
              The main menu
            </p>

            <h2
              id="main-menu-heading"
              className="mt-3 font-serif text-4xl tracking-[-0.025em] sm:text-5xl"
            >
              Made for the table.
            </h2>
          </div>

          <p className="text-sm text-[#d8d3ca]/60">
            {filteredMenu.length}{" "}
            {filteredMenu.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMenu.map((item) => (
            <FoodCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* SPECIAL MENU */}

      <section
        className="border-y border-[#c65a24]/25 bg-[#15100d] py-16 sm:py-20"
        aria-labelledby="special-menu-heading"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

          <div className="mb-9 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">
              A little extra heat
            </p>

            <h2
              id="special-menu-heading"
              className="mt-3 font-serif text-4xl tracking-[-0.025em] sm:text-5xl"
            >
              Special Menu
            </h2>

            <p className="mt-4 text-[#d8d3ca]/75">
              Limited-time Karachi Flames favorites, made when the moment calls for something memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {specialMenu.map((item) => (
              <FoodCard
                key={item.name}
                item={item}
                showImage={false}
              />
            ))}
          </div>

        </div>
      </section>

      {/* FRIDAY SPECIAL */}

      <section
        className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
        aria-labelledby="friday-menu-heading"
      >
        <div className="rounded-[1.5rem] border border-white/[0.1] bg-[#121110] p-6 sm:p-10">

          <div className="mb-9 flex flex-col justify-between gap-4 border-b border-white/[0.1] pb-7 lg:flex-row lg:items-end">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">
                AlTaqwa Foodie Fridays
              </p>

              <h2
                id="friday-menu-heading"
                className="mt-3 font-serif text-4xl tracking-[-0.025em] sm:text-5xl"
              >
                Friday Special
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#d8d3ca]/65">
              A rotating, Friday-only lineup. Availability is limited; please check with your local Karachi Flames location.
            </p>

          </div>

          <div className="grid gap-x-10 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
            {fridayMenu.map((item) => (
              <div
                key={item.name}
                className="border-b border-white/[0.08] pb-6"
              >
                <div className="flex gap-4">
                  <h3 className="font-serif text-xl leading-tight">
                    {item.name}
                  </h3>

                  <p className="ml-auto shrink-0 font-serif text-lg text-[#e67838]">
                    {item.price}
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-[#d8d3ca]/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* NOTE */}

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 rounded-xl border border-white/[0.1] bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:p-6">
          <span className="text-[#e67838]" aria-hidden="true">
            ✦
          </span>

          <p className="text-sm leading-6 text-[#d8d3ca]/75">
            <strong className="font-semibold text-[#f5f2ec]">
              Please note:
            </strong>{" "}
            All menu items contain dairy. Please let our team know about any dietary needs or allergies before ordering.
          </p>
        </div>
      </section>

      {/* CTA */}

      <section className="relative overflow-hidden border-t border-white/[0.09] bg-[#17110d] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12">

        <div
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c65a24]/20 blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-2xl">

          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">
            Karachi Flames
          </p>

          <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
            Come taste the flame.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#d8d3ca]/78">
            Authentic Karachi flavor, made fresh and served with pride.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/location"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c65a24] px-6 text-sm font-bold text-white transition hover:bg-[#dc6c2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f2ec]"
            >
              Order Now
            </Link>

            <Link
              href="/location"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-bold text-[#f5f2ec] transition hover:border-[#e67838] hover:text-[#e67838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f2ec]"
            >
              Find a Location
            </Link>

          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-7 text-xs text-[#d8d3ca]/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© Karachi Flames. All rights reserved.</p>

        <p>
          Authentic Karachi BBQ · Hand-slaughtered Zabiha Halal
        </p>
      </footer>

      {/* GLOBAL ACCESSIBILITY / SCROLLBAR CSS */}

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
