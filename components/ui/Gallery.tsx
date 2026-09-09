"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * KARACHI FLAMES — GALLERY
 *
 * Media is deliberately configured in this file. Add the matching files under
 * public/gallery, then change `available` to true. Until then, the page renders
 * polished local placeholders instead of requesting missing files.
 *
 * The lightbox below (open → prev/next → close) is already built as a self-
 * contained slideshow: it loops through whatever `lightboxItems` is at the
 * time, responds to arrow keys and swipe, and keeps its own index. To turn it
 * into an autoplaying slideshow later, add a `setInterval` in the modal-open
 * effect that calls `moveImage(1)` on a timer and clears it on close/hover —
 * no other structural changes are needed.
 */

const SEO_TITLE = "Gallery | Karachi Flames — Pop-Ups, Events, Catering & Food Truck";
const SEO_DESCRIPTION =
  "See Karachi Flames in action — pop-ups, private events, catering spreads, and the food truck on the move.";

// Top navbar — unchanged.
const navbarLinks = [
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

const imagePaths = {
  logo: "/logo.png",
};

// EDITABLE CATEGORY CONFIGURATION
const galleryCategories = [
  "All",
  "Pop-Ups",
  "Private Events",
  "Catering",
  "Food Truck Location",
] as const;

type GalleryCategory = (typeof galleryCategories)[number];
type MediaCategory = Exclude<GalleryCategory, "All">;
type PlaceholderTone = "ember" | "spice" | "night" | "smoke" | "warm";

const galleryLayoutClasses = {
  flame: "md:col-span-7 md:row-span-2",
  portrait: "md:col-span-5 md:row-span-2",
  small: "md:col-span-4 md:row-span-1",
  wide: "md:col-span-8 md:row-span-1",
  cinema: "md:col-span-12 md:row-span-2",
  storyPortrait: "md:col-span-5 md:row-span-2",
  storyWide: "md:col-span-7 md:row-span-2",
} as const;

type GalleryLayout = keyof typeof galleryLayoutClasses;

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  available: boolean;
  placeholderLabel: string;
  tone: PlaceholderTone;
  title: string;
  eyebrow: string;
  category: MediaCategory;
  layout: GalleryLayout;
  radius: string;
};

// EDITABLE PHOTO CONFIGURATION — replace paths and set `available: true` when files are added.
const galleryItems: readonly GalleryItem[] = [
  {
    id: "popup-01",
    src: "/hero.jpg",
    alt: "Karachi Flames pop-up grill set up at an outdoor event",
    title: "Wherever The Fire Goes",
    eyebrow: "Pop-Ups / On location",
    category: "Pop-Ups",
    layout: "flame",
    radius: "rounded-[38px]",
    available: false,
    placeholderLabel: "POP-UPS / 01",
    tone: "ember",
  },
  {
    id: "popup-02",
    src: "/about.jpg",
    alt: "A crowd gathered at a Karachi Flames pop-up",
    title: "Drawing The Crowd",
    eyebrow: "Pop-Ups / Street-side heat",
    category: "Pop-Ups",
    layout: "small",
    radius: "rounded-[22px]",
    available: false,
    placeholderLabel: "POP-UPS / 02",
    tone: "warm",
  },
  {
    id: "private-01",
    src: "/menu2.jpg",
    alt: "A private Karachi Flames dinner event setting",
    title: "An Evening, Reserved",
    eyebrow: "Private Events / Just for your guests",
    category: "Private Events",
    layout: "portrait",
    radius: "rounded-[30px]",
    available: false,
    placeholderLabel: "PRIVATE EVENTS / 01",
    tone: "night",
  },
  {
    id: "private-02",
    src: "/gallery/private-02.jpg",
    alt: "A set table at a Karachi Flames private event",
    title: "The Table Is Set",
    eyebrow: "Private Events / Details that matter",
    category: "Private Events",
    layout: "wide",
    radius: "rounded-[28px]",
    available: false,
    placeholderLabel: "PRIVATE EVENTS / 02",
    tone: "smoke",
  },
  {
    id: "catering-01",
    src: "/menu1.jpg",
    alt: "A full Karachi Flames catering spread",
    title: "Fed, Properly",
    eyebrow: "Catering / Built for the whole crowd",
    category: "Catering",
    layout: "cinema",
    radius: "rounded-[34px]",
    available: false,
    placeholderLabel: "CATERING / 01",
    tone: "spice",
  },
  {
    id: "catering-02",
    src: "/gallery/catering-02.jpg",
    alt: "Catering trays of Karachi Flames food ready to serve",
    title: "Trays Ready To Travel",
    eyebrow: "Catering / Straight from the flame",
    category: "Catering",
    layout: "small",
    radius: "rounded-[22px]",
    available: false,
    placeholderLabel: "CATERING / 02",
    tone: "warm",
  },
  {
    id: "truck-01",
    src: "/menu.jpg",
    alt: "The Karachi Flames food truck parked and serving",
    title: "Find The Truck",
    eyebrow: "Food Truck Location / Follow the smoke",
    category: "Food Truck Location",
    layout: "storyWide",
    radius: "rounded-[32px]",
    available: false,
    placeholderLabel: "FOOD TRUCK / 01",
    tone: "night",
  },
  {
    id: "truck-02",
    src: "/gallery/truck-02.jpg",
    alt: "Guests lined up at the Karachi Flames food truck window",
    title: "Parked And Ready",
    eyebrow: "Food Truck Location / Wherever we roll up",
    category: "Food Truck Location",
    layout: "storyPortrait",
    radius: "rounded-[26px]",
    available: false,
    placeholderLabel: "FOOD TRUCK / 02",
    tone: "ember",
  },
];

const placeholderToneClasses: Record<PlaceholderTone, string> = {
  ember: "bg-gradient-to-br from-[#4b1e0f] via-[#1b110d] to-[#070707]",
  spice: "bg-gradient-to-br from-[#3e2116] via-[#21130e] to-[#080807]",
  night: "bg-gradient-to-br from-[#171513] via-[#0c0c0c] to-[#020202]",
  smoke: "bg-gradient-to-br from-[#2b221e] via-[#141311] to-[#070707]",
  warm: "bg-gradient-to-br from-[#4a2515] via-[#23150e] to-[#090807]",
};

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 17 17 7" strokeLinecap="round" />
      <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeft({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M19 12H5" strokeLinecap="round" />
      <path d="m11 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

/* ===== Navbar icon components — unchanged ===== */

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
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

function GalleryMedia({
  item,
  priority = false,
  sizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 55vw",
  imageClassName = "object-cover",
}: {
  item: GalleryItem;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
}) {
  if (item.available) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={imageClassName}
      />
    );
  }

  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${placeholderToneClasses[item.tone]}`}>
      <div className="absolute -right-[10%] -top-[26%] h-[78%] w-[76%] rounded-full bg-[#D66A2B]/30 blur-3xl" />
      <div className="absolute -bottom-[32%] left-[5%] h-[72%] w-[84%] rounded-full border border-[#F5F1E8]/10" />
      <div className="absolute inset-x-[12%] top-[19%] h-px bg-[#F5F1E8]/15" />
      <div className="absolute bottom-[15%] right-[12%] h-24 w-24 rounded-full border border-[#D66A2B]/35" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_18%,rgba(245,241,232,0.07)_18.25%,transparent_18.6%,transparent_58%,rgba(245,241,232,0.06)_58.2%,transparent_58.6%)]" />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.19em] text-[#F5F1E8]/70">
        <span>Local media</span>
        <span className="text-right text-[#D66A2B]">{item.placeholderLabel}</span>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  // `filteredItems` doubles as the slideshow's playlist — whatever is currently
  // filtered is what prev/next/autoplay will cycle through.
  const activeImage = useMemo(
    () => (activeImageId ? galleryItems.find((item) => item.id === activeImageId) ?? null : null),
    [activeImageId],
  );

  const activeIndex = activeImage ? filteredItems.findIndex((item) => item.id === activeImage.id) : -1;
  const previousImage =
    activeIndex >= 0 && filteredItems.length > 1
      ? filteredItems[(activeIndex - 1 + filteredItems.length) % filteredItems.length] ?? null
      : null;
  const nextImage =
    activeIndex >= 0 && filteredItems.length > 1
      ? filteredItems[(activeIndex + 1) % filteredItems.length] ?? null
      : null;
  const modalIsOpen = Boolean(activeImage);

  const requestClose = useCallback(() => {
    if (closeTimerRef.current !== null) return;

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveImageId(null);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, 220);
  }, []);

  const openImage = useCallback((id: string, currentTarget: HTMLElement) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    openerRef.current = currentTarget;
    setIsClosing(false);
    setActiveImageId(id);
  }, []);

  const moveImage = useCallback(
    (direction: -1 | 1) => {
      if (isClosing || !activeImage || filteredItems.length < 2) return;

      const currentIndex = filteredItems.findIndex((item) => item.id === activeImage.id);
      if (currentIndex < 0) return;

      const nextIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
      const nextItem = filteredItems[nextIndex];
      if (nextItem) setActiveImageId(nextItem.id);
    },
    [activeImage, filteredItems, isClosing],
  );

  function closeMenu() {
    setIsNavOpen(false);
  }

  // Client component to keep filters and the lightbox interactive. Keeps the
  // title/description in sync at runtime; server metadata can be added in a
  // route layout later if the single-file requirement is relaxed.
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = existingDescription?.content;
    const description = existingDescription ?? document.createElement("meta");

    if (!existingDescription) {
      description.name = "description";
      document.head.appendChild(description);
    }

    document.title = SEO_TITLE;
    description.content = SEO_DESCRIPTION;

    return () => {
      document.title = previousTitle;
      if (existingDescription) {
        existingDescription.content = previousDescription ?? "";
      } else {
        description.remove();
      }
    };
  }, []);

  // Sections stay visible without JavaScript. Once the page hydrates, this adds only a
  // restrained reveal as the gallery enters the viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gallery-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    root.classList.add("gallery-motion-ready");
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("gallery-motion-ready");
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Lock background scroll and return focus to the card that opened the dialog.
  useEffect(() => {
    if (!modalIsOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      openerRef.current?.focus();
    };
  }, [modalIsOpen]);

  // Body scroll lock while the mobile navbar drawer is open — unchanged.
  useEffect(() => {
    if (!isNavOpen) {
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
  }, [isNavOpen]);

  // Escape closes the lightbox; arrow keys and swipe move through the slideshow.
  useEffect(() => {
    if (!modalIsOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveImage(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveImage(1);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalIsOpen, moveImage, requestClose]);

  const chooseCategory = (category: GalleryCategory) => {
    setActiveCategory(category);
    setActiveImageId(null);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#070707] text-[#F5F1E8] selection:bg-[#C65A24] selection:text-white">
      <style jsx global>{`
        html.gallery-motion-ready [data-gallery-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        html.gallery-motion-ready [data-gallery-reveal].gallery-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes gallery-dialog-in {
          from { opacity: 0; transform: scale(0.985); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gallery-dialog-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.985); }
        }
        @keyframes gallery-media-in {
          from { opacity: 0.45; transform: scale(0.992); }
          to { opacity: 1; transform: scale(1); }
        }
        .gallery-dialog {
          animation: gallery-dialog-in 360ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .gallery-dialog.gallery-dialog-closing {
          animation: gallery-dialog-out 220ms cubic-bezier(0.7, 0, 0.84, 0) both;
        }
        .gallery-lightbox-media {
          animation: gallery-media-in 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[110] -translate-y-20 rounded-full bg-[#F5F1E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-[#070707] transition-transform focus:translate-y-0"
      >
        Skip to gallery
      </a>

      {/* ========================= NAVBAR (unchanged) ========================= */}

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
              {navbarLinks.map((item) => {
                const active = item.href === "/gallery";

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
            aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isNavOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsNavOpen((value) => !value)}
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
            <MenuIcon open={isNavOpen} />
          </button>
        </nav>

        {/* ================= MOBILE MENU (unchanged) ================= */}

        <div
          id="mobile-navigation"
          aria-hidden={!isNavOpen}
          className={[
            "fixed inset-0 z-[120] h-[100dvh] w-full lg:hidden",
            "bg-[#080808]",
            "transition-all duration-500 ease-out",
            isNavOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-full opacity-0",
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
                {navbarLinks.map((item, index) => {
                  const active = item.href === "/gallery";

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
                        style={{
                          transitionDelay: isNavOpen ? `${index * 35}ms` : "0ms",
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

      {/* ========================= MAIN — GALLERY ONLY ========================= */}

      <main id="main-content">
        <section className="scroll-mt-28 px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="pointer-events-none absolute left-[-12rem] top-20 h-[34rem] w-[34rem] -z-10 rounded-full bg-[#C65A24]/10 blur-[120px]" />
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-7 border-b border-white/10 pb-8 md:grid-cols-12 md:items-end" data-gallery-reveal>
              <div className="md:col-span-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">Karachi Flames / Gallery</p>
                <h1 className="mt-4 max-w-[10ch] font-serif text-[clamp(2.8rem,6.3vw,6.8rem)] leading-[0.82] tracking-[-0.07em] text-[#F5F1E8]">
                  LOOK <span className="italic text-[#F5F1E8]/60">CLOSER.</span>
                </h1>
              </div>
              <div className="md:col-span-7 md:justify-self-end">
                <p className="max-w-md text-[15px] leading-7 text-[#F5F1E8]/60 md:ml-auto md:text-right">
                  Pop-ups, private events, catering spreads, and the food truck on the move — a look at Karachi Flames wherever it shows up.
                </p>
              </div>
            </div>

            <div className="mt-7" data-gallery-reveal>
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#F5F1E8]/45">Filter by category</p>
              <div
                className="-mx-5 flex flex-nowrap gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
                role="group"
                aria-label="Gallery categories"
              >
                {galleryCategories.map((category) => {
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => chooseCategory(category)}
                      aria-pressed={active}
                      className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D66A2B] ${
                        active
                          ? "border-[#D66A2B]/70 bg-[#C65A24]/20 text-[#F5F1E8] shadow-[inset_0_0_0_1px_rgba(214,106,43,0.12)]"
                          : "border-white/10 bg-white/[0.025] text-[#F5F1E8]/55 hover:border-white/25 hover:text-[#F5F1E8]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
              <p className="sr-only" aria-live="polite">
                Showing {filteredItems.length} {activeCategory === "All" ? "gallery items" : `${activeCategory} gallery items`}.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[12rem] md:grid-cols-12 md:gap-5 xl:auto-rows-[15rem] xl:gap-6" data-gallery-reveal>
              {filteredItems.map((item, index) => (
                <article key={item.id} className={`min-w-0 ${galleryLayoutClasses[item.layout]}`}>
                  <button
                    type="button"
                    onClick={(event) => openImage(item.id, event.currentTarget)}
                    className={`group relative isolate flex min-h-[22rem] h-full w-full overflow-hidden border border-white/10 bg-[#111] text-left shadow-[0_16px_45px_rgba(0,0,0,0.18)] transition duration-500 hover:border-[#D66A2B]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B] ${item.radius}`}
                    aria-label={`View ${item.title}`}
                    aria-haspopup="dialog"
                  >
                    <div className="absolute inset-0 transition duration-500 motion-reduce:transition-none group-hover:scale-[1.03]">
                      <GalleryMedia
                        item={item}
                        priority={index < 2}
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 55vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/5" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/20 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[#F5F1E8]/75 backdrop-blur-sm sm:left-5 sm:top-5">
                      {String(index + 1).padStart(2, "0")} / {item.category}
                    </span>
                    <span className="absolute right-4 top-4 hidden h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/25 text-[#F5F1E8] opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 md:grid sm:right-5 sm:top-5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-[#D66A2B] md:translate-y-3 md:opacity-0 md:transition md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                        {item.eyebrow}
                      </span>
                      <span className="mt-2 block font-serif text-[clamp(1.7rem,3vw,2.75rem)] leading-none tracking-[-0.045em] text-[#F5F1E8] md:translate-y-3 md:transition md:duration-300 md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0">
                        {item.title}
                      </span>
                    </span>
                  </button>
                </article>
              ))}

              {filteredItems.length === 0 && (
                <p className="col-span-full py-16 text-center text-sm text-[#F5F1E8]/50">
                  No photos in this category yet — check back soon.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ========================= FOOTER (unchanged) ========================= */}

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
      <p>Charcoal-Fired Halal BBQ &amp; Catering</p>
    </div>

  </div>
</footer>

      {/* ========================= LIGHTBOX / SLIDESHOW ========================= */}

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] grid overscroll-contain bg-black/95 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="image-lightbox-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) requestClose();
          }}
        >
          <div
            ref={dialogRef}
            className={`gallery-dialog relative mx-auto grid h-full w-full max-w-[1500px] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d] shadow-2xl sm:rounded-[32px] ${
              isClosing ? "gallery-dialog-closing" : ""
            }`}
          >
            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <p className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-[#F5F1E8]/55">
                {activeImage.category} / {String(Math.max(activeIndex + 1, 1)).padStart(2, "0")} of{" "}
                {String(filteredItems.length).padStart(2, "0")}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={requestClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-[#F5F1E8] transition hover:border-[#D66A2B] hover:bg-[#C65A24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D66A2B]"
                aria-label="Close image lightbox"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div
              className="relative min-h-0 overflow-hidden bg-black"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const startX = touchStartX.current;
                const endX = event.changedTouches[0]?.clientX;
                touchStartX.current = null;
                if (startX === null || endX === undefined || Math.abs(startX - endX) < 48) return;
                moveImage(startX > endX ? 1 : -1);
              }}
            >
              <div key={activeImage.id} className="gallery-lightbox-media relative h-full min-h-[18rem] w-full">
                <GalleryMedia item={activeImage} sizes="100vw" imageClassName="object-contain" />
              </div>

              {previousImage && (
                <button
                  type="button"
                  onClick={() => moveImage(-1)}
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-[#F5F1E8] transition hover:border-[#D66A2B] hover:bg-[#C65A24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D66A2B] sm:left-5 sm:h-12 sm:w-12"
                  aria-label={`Previous image: ${previousImage.title}`}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              {nextImage && (
                <button
                  type="button"
                  onClick={() => moveImage(1)}
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-[#F5F1E8] transition hover:border-[#D66A2B] hover:bg-[#C65A24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D66A2B] sm:right-5 sm:h-12 sm:w-12"
                  aria-label={`Next image: ${nextImage.title}`}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D66A2B]">{activeImage.eyebrow}</p>
                <h2 id="image-lightbox-title" className="mt-1 font-serif text-2xl tracking-[-0.045em] text-[#F5F1E8] sm:text-3xl">
                  {activeImage.title}
                </h2>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F5F1E8]/45">
                {filteredItems.length > 1 ? "Use arrow keys or swipe" : "Gallery frame"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}