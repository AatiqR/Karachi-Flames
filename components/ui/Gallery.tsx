"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * KARACHI FLAMES — GALLERY
 *
 * Media is deliberately configured in this file. Add the matching files under
 * public/gallery (and the halal mark under public/branding), then change
 * `available` to true. Until then, the page renders polished local placeholders
 * instead of requesting missing files.
 */

const SEO_TITLE = "Gallery | Karachi Flames — BBQ, Food & Experiences";
const SEO_DESCRIPTION =
  "Explore the Karachi Flames gallery featuring authentic BBQ, bold Karachi flavors, restaurant moments, events, and more.";

const galleryCategories = [
  "All",
  "Food",
  "BBQ",
  "Restaurant",
  "People",
  "Events",
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

const videoLayoutClasses = {
  lead: "md:col-span-7",
  portrait: "md:col-span-5",
  wide: "md:col-span-12 lg:col-span-8",
} as const;

type GalleryLayout = keyof typeof galleryLayoutClasses;
type VideoLayout = keyof typeof videoLayoutClasses;

type BaseMedia = {
  src: string;
  alt: string;
  available: boolean;
  placeholderLabel: string;
  tone: PlaceholderTone;
};

type GalleryItem = BaseMedia & {
  id: string;
  title: string;
  eyebrow: string;
  category: MediaCategory;
  layout: GalleryLayout;
  radius: string;
};

type VideoItem = BaseMedia & {
  id: string;
  title: string;
  eyebrow: string;
  duration: string;
  category: string;
  videoSrc?: string;
  layout: VideoLayout;
  radius: string;
};

const heroMedia: GalleryItem = {
  id: "bbq-01",
  src: "/gallery/bbq-01.jpg",
  alt: "Karachi Flames BBQ over an open grill",
  title: "The First Sear",
  eyebrow: "Fire-grilled / Karachi-inspired",
  category: "BBQ",
  layout: "flame",
  radius: "rounded-[38px]",
  available: false,
  placeholderLabel: "BBQ / 01",
  tone: "ember",
};

// EDITABLE PHOTO CONFIGURATION — replace paths and set `available: true` when files are added.
const galleryItems: readonly GalleryItem[] = [
  heroMedia,
  {
    id: "food-01",
    src: "/gallery/food-01.jpg",
    alt: "A Karachi Flames biryani serving",
    title: "Layered With Memory",
    eyebrow: "Biryani / The long way round",
    category: "Food",
    layout: "portrait",
    radius: "rounded-[30px]",
    available: false,
    placeholderLabel: "FOOD / 01",
    tone: "spice",
  },
  {
    id: "food-02",
    src: "/gallery/food-02.jpg",
    alt: "A Karachi Flames burger close-up",
    title: "Built For The First Bite",
    eyebrow: "Food / Big flavor, close up",
    category: "Food",
    layout: "small",
    radius: "rounded-[22px]",
    available: false,
    placeholderLabel: "FOOD / 02",
    tone: "warm",
  },
  {
    id: "restaurant-01",
    src: "/gallery/restaurant-01.jpg",
    alt: "The Karachi Flames restaurant atmosphere",
    title: "The Room After Dark",
    eyebrow: "Restaurant / A seat at the story",
    category: "Restaurant",
    layout: "wide",
    radius: "rounded-[28px]",
    available: false,
    placeholderLabel: "RESTAURANT / 01",
    tone: "night",
  },
  {
    id: "people-01",
    src: "/gallery/people-01.jpg",
    alt: "Karachi Flames team preparing food",
    title: "Hands Behind The Heat",
    eyebrow: "People / Made with intention",
    category: "People",
    layout: "wide",
    radius: "rounded-[24px]",
    available: false,
    placeholderLabel: "PEOPLE / 01",
    tone: "smoke",
  },
  {
    id: "event-01",
    src: "/gallery/event-01.jpg",
    alt: "A Karachi Flames gathering",
    title: "Made For The Moment",
    eyebrow: "Events / Bring everyone closer",
    category: "Events",
    layout: "small",
    radius: "rounded-[30px]",
    available: false,
    placeholderLabel: "EVENT / 01",
    tone: "warm",
  },
  {
    id: "bbq-02",
    src: "/gallery/bbq-02.jpg",
    alt: "Food on the Karachi Flames grill",
    title: "The Language Of Smoke",
    eyebrow: "BBQ / Straight from the flame",
    category: "BBQ",
    layout: "cinema",
    radius: "rounded-[34px]",
    available: false,
    placeholderLabel: "BBQ / 02",
    tone: "ember",
  },
  {
    id: "food-03",
    src: "/gallery/food-03.jpg",
    alt: "A Karachi Flames chicken dish",
    title: "Heat, Held Back",
    eyebrow: "Food / Char, spice, balance",
    category: "Food",
    layout: "storyPortrait",
    radius: "rounded-[26px]",
    available: false,
    placeholderLabel: "FOOD / 03",
    tone: "spice",
  },
  {
    id: "event-02",
    src: "/gallery/event-02.jpg",
    alt: "A Karachi Flames celebration setting",
    title: "The Table Gets Longer",
    eyebrow: "Events / A reason to gather",
    category: "Events",
    layout: "storyWide",
    radius: "rounded-[32px]",
    available: false,
    placeholderLabel: "EVENT / 02",
    tone: "night",
  },
];

// This is intentionally separate from the filterable gallery: it is the cinematic visual break.
const featuredMedia: GalleryItem = {
  id: "feature-fire",
  src: "/gallery/featured-fire.jpg",
  alt: "Karachi Flames barbecue over fire",
  title: "Authentic Karachi Flavor",
  eyebrow: "Fire / Flavor",
  category: "BBQ",
  layout: "cinema",
  radius: "rounded-[40px]",
  available: false,
  placeholderLabel: "FEATURE / FIRE",
  tone: "ember",
};

// EDITABLE VIDEO CONFIGURATION — add thumbnail/video files, then set `available: true`.
const videoItems: readonly VideoItem[] = [
  {
    id: "video-01",
    src: "/gallery/video-01.jpg",
    videoSrc: "/gallery/video-01.mp4",
    alt: "Karachi Flames barbecue grilling video thumbnail",
    title: "The Grill Is Talking",
    eyebrow: "Behind the flame / BBQ",
    duration: "00:38",
    category: "BBQ",
    layout: "lead",
    radius: "rounded-[32px]",
    available: false,
    placeholderLabel: "VIDEO / 01",
    tone: "ember",
  },
  {
    id: "video-02",
    src: "/gallery/video-02.jpg",
    videoSrc: "/gallery/video-02.mp4",
    alt: "Karachi Flames kitchen preparation video thumbnail",
    title: "Before The First Bite",
    eyebrow: "Behind the flame / Kitchen",
    duration: "00:51",
    category: "Food",
    layout: "portrait",
    radius: "rounded-[28px]",
    available: false,
    placeholderLabel: "VIDEO / 02",
    tone: "spice",
  },
  {
    id: "video-03",
    src: "/gallery/video-03.jpg",
    videoSrc: "/gallery/video-03.mp4",
    alt: "Karachi Flames atmosphere video thumbnail",
    title: "The Room Comes Alive",
    eyebrow: "Behind the flame / Atmosphere",
    duration: "01:12",
    category: "Restaurant",
    layout: "wide",
    radius: "rounded-[30px]",
    available: false,
    placeholderLabel: "VIDEO / 03",
    tone: "night",
  },
];

const cateringMedia: BaseMedia = {
  src: "/gallery/catering-cta.jpg",
  alt: "Karachi Flames food prepared for an event",
  available: false,
  placeholderLabel: "CATERING / CTA",
  tone: "warm",
};

const halalMark = {
  src: "/branding/hand-slaughtered-zabihah-halal.svg",
  alt: "Hand-Slaughtered Zabihah Halal",
  available: false,
};

const allPhotoItems: readonly GalleryItem[] = [...galleryItems, featuredMedia];

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

function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.2 5.7c0-1.06 1.18-1.7 2.07-1.13l8.64 5.57a2.2 2.2 0 0 1 0 3.7l-8.64 5.57a1.34 1.34 0 0 1-2.07-1.13V5.7Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {open ? (
        <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      )}
    </svg>
  );
}

function GalleryMedia({
  media,
  priority = false,
  sizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 55vw",
  imageClassName = "object-cover",
}: {
  media: BaseMedia;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
}) {
  if (media.available) {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={imageClassName}
      />
    );
  }

  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${placeholderToneClasses[media.tone]}`}>
      <div className="absolute -right-[10%] -top-[26%] h-[78%] w-[76%] rounded-full bg-[#D66A2B]/30 blur-3xl" />
      <div className="absolute -bottom-[32%] left-[5%] h-[72%] w-[84%] rounded-full border border-[#F5F1E8]/10" />
      <div className="absolute inset-x-[12%] top-[19%] h-px bg-[#F5F1E8]/15" />
      <div className="absolute bottom-[15%] right-[12%] h-24 w-24 rounded-full border border-[#D66A2B]/35" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_18%,rgba(245,241,232,0.07)_18.25%,transparent_18.6%,transparent_58%,rgba(245,241,232,0.06)_58.2%,transparent_58.6%)]" />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.19em] text-[#F5F1E8]/70">
        <span>Local media</span>
        <span className="text-right text-[#D66A2B]">{media.placeholderLabel}</span>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
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

  const activeImage = useMemo(
    () => (activeImageId ? allPhotoItems.find((item) => item.id === activeImageId) ?? null : null),
    [activeImageId],
  );

  const activeVideo = useMemo(
    () => (activeVideoId ? videoItems.find((item) => item.id === activeVideoId) ?? null : null),
    [activeVideoId],
  );

  const lightboxItems = useMemo<readonly GalleryItem[]>(() => {
    if (activeImage?.id === featuredMedia.id) return [featuredMedia];
    return filteredItems;
  }, [activeImage, filteredItems]);

  const activeIndex = activeImage ? lightboxItems.findIndex((item) => item.id === activeImage.id) : -1;
  const previousImage =
    activeIndex >= 0 && lightboxItems.length > 1
      ? lightboxItems[(activeIndex - 1 + lightboxItems.length) % lightboxItems.length] ?? null
      : null;
  const nextImage =
    activeIndex >= 0 && lightboxItems.length > 1
      ? lightboxItems[(activeIndex + 1) % lightboxItems.length] ?? null
      : null;
  const modalIsOpen = Boolean(activeImage || activeVideo);

  const requestClose = useCallback(() => {
    if (closeTimerRef.current !== null) return;

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveImageId(null);
      setActiveVideoId(null);
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
    setActiveVideoId(null);
    setActiveImageId(id);
  }, []);

  const openVideo = useCallback((id: string, currentTarget: HTMLElement) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    openerRef.current = currentTarget;
    setIsClosing(false);
    setActiveImageId(null);
    setActiveVideoId(id);
  }, []);

  const moveImage = useCallback(
    (direction: -1 | 1) => {
      if (isClosing || !activeImage || lightboxItems.length < 2) return;

      const currentIndex = lightboxItems.findIndex((item) => item.id === activeImage.id);
      if (currentIndex < 0) return;

      const nextIndex = (currentIndex + direction + lightboxItems.length) % lightboxItems.length;
      const nextItem = lightboxItems[nextIndex];
      if (nextItem) setActiveImageId(nextItem.id);
    },
    [activeImage, isClosing, lightboxItems],
  );

  // The page is intentionally a client component for filters and modals. This keeps the
  // requested title/description in sync at runtime; server metadata can be added in a
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
  // restrained reveal as each editorial chapter enters the viewport.
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

  // Escape closes either dialog; arrow keys and swipe control the image lightbox.
  useEffect(() => {
    if (!modalIsOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (activeImage && event.key === "ArrowLeft") {
        event.preventDefault();
        moveImage(-1);
        return;
      }

      if (activeImage && event.key === "ArrowRight") {
        event.preventDefault();
        moveImage(1);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], video[controls], [tabindex]:not([tabindex="-1"])',
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
  }, [activeImage, modalIsOpen, moveImage, requestClose]);

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

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-white/10 bg-[#0a0a0a]/90 px-3 py-2 shadow-[0_12px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-4">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 rounded-full px-1 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B]"
            aria-label="Karachi Flames home"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#D66A2B]/60 bg-[#C65A24]/15 font-serif text-sm italic text-[#F5F1E8]">
              KF
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate text-[10px] font-bold uppercase tracking-[0.17em] text-[#F5F1E8] sm:text-[11px]">
                Karachi Flames
              </span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.2em] text-[#F5F1E8]/45">Gallery / 2026</span>
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
            {[
              ["Menu", "/menu"],
              ["Gallery", "/gallery"],
              ["Catering", "/catering"],
              ["Locations", "/locations"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className={`rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D66A2B] ${
                  label === "Gallery" ? "bg-white/8 text-[#F5F1E8]" : "text-[#F5F1E8]/62 hover:text-[#F5F1E8]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/catering"
              className="hidden items-center gap-2 rounded-full bg-[#C65A24] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#D66A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D66A2B] sm:flex"
            >
              Book an event <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-[#F5F1E8] transition-colors hover:border-[#D66A2B]/60 hover:text-[#D66A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D66A2B] md:hidden"
              aria-controls="mobile-navigation"
              aria-expanded={isNavOpen}
              aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setIsNavOpen((open) => !open)}
            >
              <MenuIcon open={isNavOpen} />
            </button>
          </div>
        </div>

        {isNavOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mx-auto mt-2 max-w-[1600px] rounded-[24px] border border-white/10 bg-[#0c0c0c]/95 p-2 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {[
              ["Menu", "/menu"],
              ["Gallery", "/gallery"],
              ["Catering", "/catering"],
              ["Locations", "/locations"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsNavOpen(false)}
                className="flex items-center justify-between rounded-[18px] px-4 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#F5F1E8]/80 transition-colors hover:bg-white/5 hover:text-[#F5F1E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D66A2B]"
              >
                {label}
                <ArrowUpRight className="h-4 w-4 text-[#D66A2B]" />
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content">
        <section className="relative isolate overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="pointer-events-none absolute left-[-12rem] top-20 h-[34rem] w-[34rem] rounded-full bg-[#C65A24]/10 blur-[120px]" />
          <div className="pointer-events-none absolute right-[4%] top-[11%] h-52 w-px bg-gradient-to-b from-transparent via-[#D66A2B]/65 to-transparent" />
          <div className="relative mx-auto max-w-[1600px]">
            <div className="mb-7 flex items-center gap-3" data-gallery-reveal>
              <span className="h-px w-10 bg-[#D66A2B]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5F1E8]/60">Karachi Flames / Gallery</p>
            </div>

            <div className="grid items-end gap-7 lg:grid-cols-12 lg:gap-10">
              <div className="relative z-10 lg:col-span-5" data-gallery-reveal>
                <h1 className="max-w-[8.5ch] font-serif text-[clamp(2.55rem,10.7vw,10.5rem)] leading-[0.83] tracking-[-0.075em] text-[#F5F1E8]">
                  <span className="block">THE FLAME.</span>
                  <span className="block pl-[0.08em] text-[#D66A2B]">THE FLAVOR.</span>
                  <span className="block pl-[0.16em] italic text-[#F5F1E8]/88">THE EXPERIENCE.</span>
                </h1>
                <div className="mt-8 max-w-md border-l border-[#D66A2B]/80 pl-4 sm:mt-10 sm:pl-5">
                  <p className="text-[15px] leading-7 text-[#F5F1E8]/70 sm:text-base">
                    A look behind the flame, the food, and the moments that make Karachi Flames what it is.
                  </p>
                </div>
                <a
                  href="#gallery-collection"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#F5F1E8]/80 transition-colors hover:text-[#D66A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[#F5F1E8]/20 transition-colors group-hover:border-[#D66A2B]">
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Scroll to explore
                </a>
              </div>

              <div className="lg:col-span-7" data-gallery-reveal>
                <button
                  type="button"
                  onClick={(event) => openImage(heroMedia.id, event.currentTarget)}
                  className="group relative isolate block min-h-[28rem] w-full overflow-hidden rounded-[40px] border border-white/10 bg-[#101010] text-left shadow-[0_30px_90px_rgba(0,0,0,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B] sm:min-h-[35rem] lg:min-h-[46rem]"
                  aria-label={`View ${heroMedia.title}`}
                  aria-haspopup="dialog"
                >
                  <div className="absolute inset-0 transition duration-500 motion-reduce:transition-none group-hover:scale-[1.025]">
                    <GalleryMedia media={heroMedia} priority sizes="(max-width: 1023px) 100vw, 58vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 backdrop-blur-sm sm:left-7 sm:top-7">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D66A2B] shadow-[0_0_14px_#D66A2B]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#F5F1E8]/80">01 / The flame</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7 lg:p-9">
                    <div className="max-w-sm">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D66A2B]">{heroMedia.eyebrow}</p>
                      <p className="mt-2 font-serif text-3xl italic tracking-[-0.04em] text-[#F5F1E8] sm:text-4xl">{heroMedia.title}</p>
                    </div>
                    <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-black/25 text-[10px] font-bold uppercase tracking-[0.08em] text-[#F5F1E8] transition duration-300 group-hover:scale-105 group-hover:border-[#D66A2B] group-hover:bg-[#C65A24] md:grid">
                      View
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-[#0b0b0b] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1600px] gap-7 md:grid-cols-12 md:items-end" data-gallery-reveal>
            <div className="md:col-span-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">Five chapters. One feeling.</p>
            </div>
            <div className="md:col-span-7">
              <p className="max-w-4xl font-serif text-[clamp(2rem,4.3vw,4.4rem)] leading-[0.95] tracking-[-0.06em] text-[#F5F1E8]">
                The fire. The food. The people. The room. <span className="italic text-[#F5F1E8]/55">The reason you come back.</span>
              </p>
            </div>
            <div className="md:col-span-2 md:justify-self-end">
              <p className="max-w-[16rem] text-sm leading-6 text-[#F5F1E8]/50 md:text-right">
                Follow the story at your own pace. Every frame is an invitation to look closer.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery-collection" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-7 border-b border-white/10 pb-8 md:grid-cols-12 md:items-end" data-gallery-reveal>
              <div className="md:col-span-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">01 / The visual table</p>
                <h2 className="mt-4 max-w-[10ch] font-serif text-[clamp(2.8rem,6.3vw,6.8rem)] leading-[0.82] tracking-[-0.07em] text-[#F5F1E8]">
                  LOOK <span className="italic text-[#F5F1E8]/60">CLOSER.</span>
                </h2>
              </div>
              <div className="md:col-span-7 md:justify-self-end">
                <p className="max-w-md text-[15px] leading-7 text-[#F5F1E8]/60 md:ml-auto md:text-right">
                  An editorial collection of heat, texture, welcome, and the moments built around the table.
                </p>
              </div>
            </div>

            <div className="mt-7" data-gallery-reveal>
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#F5F1E8]/45">Filter by chapter</p>
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
                      <GalleryMedia media={item} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 55vw" />
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
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-[1600px]" data-gallery-reveal>
            <div className="relative isolate min-h-[34rem] overflow-hidden rounded-[40px] border border-white/10 bg-[#111] sm:min-h-[42rem]">
              <button
                type="button"
                onClick={(event) => openImage(featuredMedia.id, event.currentTarget)}
                className="group absolute inset-0 block h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#D66A2B]"
                aria-label={`View ${featuredMedia.title}`}
                aria-haspopup="dialog"
              >
                <div className="absolute inset-0 transition duration-700 motion-reduce:transition-none group-hover:scale-[1.025]">
                  <GalleryMedia media={featuredMedia} sizes="100vw" />
                </div>
              </button>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="relative z-10 flex min-h-[34rem] max-w-2xl flex-col justify-end p-6 sm:min-h-[42rem] sm:p-10 lg:p-14">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">Fire / Flavor</p>
                <h2 className="mt-4 font-serif text-[clamp(3rem,6.5vw,7.4rem)] leading-[0.8] tracking-[-0.075em] text-[#F5F1E8]">
                  AUTHENTIC KARACHI FLAVOR. <span className="italic text-[#F5F1E8]/65">DONE RIGHT.</span>
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-7 text-[#F5F1E8]/68">
                  A fire-led point of view, built to be remembered long after the last bite.
                </p>
                <Link
                  href="/menu"
                  className="pointer-events-auto mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#F5F1E8] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#111] transition duration-300 hover:-translate-y-0.5 hover:bg-[#D66A2B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F1E8]"
                >
                  View menu <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-[#0c0c0c] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-12 lg:items-end" data-gallery-reveal>
            <div className="lg:col-span-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">02 / The food</p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[#F5F1E8]/50">
                Slow-cooked tradition. Bold Karachi flavor. Made to be remembered.
              </p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="max-w-[12ch] font-serif text-[clamp(3.1rem,8vw,9.5rem)] leading-[0.78] tracking-[-0.08em] text-[#F5F1E8]">
                GOOD FOOD <span className="italic text-[#D66A2B]">STARTS WITH</span> GOOD FIRE.
              </h2>
            </div>
          </div>
        </section>

        <section id="behind-the-flame" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-7 border-b border-white/10 pb-8 md:grid-cols-12 md:items-end" data-gallery-reveal>
              <div className="md:col-span-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">03 / Moving picture</p>
                <h2 className="mt-4 font-serif text-[clamp(3.1rem,7vw,8rem)] leading-[0.8] tracking-[-0.075em] text-[#F5F1E8]">
                  BEHIND <span className="italic text-[#F5F1E8]/60">THE FLAME.</span>
                </h2>
              </div>
              <div className="md:col-span-5 md:justify-self-end">
                <p className="max-w-md text-[15px] leading-7 text-[#F5F1E8]/60 md:ml-auto md:text-right">
                  See the fire, the food, and the people behind Karachi Flames.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 xl:gap-6" data-gallery-reveal>
              {videoItems.map((video) => (
                <article key={video.id} className={`min-w-0 ${videoLayoutClasses[video.layout]}`}>
                  <button
                    type="button"
                    onClick={(event) => openVideo(video.id, event.currentTarget)}
                    className={`group relative isolate flex min-h-[22rem] w-full overflow-hidden border border-white/10 bg-[#111] text-left shadow-[0_16px_45px_rgba(0,0,0,0.18)] transition duration-500 hover:border-[#D66A2B]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B] ${
                      video.layout === "portrait" ? "md:min-h-[31rem]" : "md:min-h-[27rem]"
                    } ${video.radius}`}
                    aria-label={`Play ${video.title}`}
                    aria-haspopup="dialog"
                  >
                    <div className="absolute inset-0 transition duration-500 motion-reduce:transition-none group-hover:scale-[1.03]">
                      <GalleryMedia media={video} sizes="(max-width: 767px) 100vw, 60vw" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />
                    <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/20 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[#F5F1E8]/80 backdrop-blur-sm">
                      {video.category}
                    </span>
                    <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/20 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.08em] text-[#F5F1E8]/70 backdrop-blur-sm">
                      {video.duration}
                    </span>
                    <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#C65A24] text-white shadow-[0_0_34px_rgba(198,90,36,0.5)] transition duration-300 group-hover:scale-110 group-hover:bg-[#D66A2B] motion-reduce:transition-none">
                      <PlayIcon className="h-5 w-5 translate-x-px" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-[#D66A2B]">{video.eyebrow}</span>
                      <span className="mt-2 block font-serif text-[clamp(1.8rem,3vw,3rem)] leading-none tracking-[-0.045em] text-[#F5F1E8]">{video.title}</span>
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-[1600px]" data-gallery-reveal>
            <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[#111]">
              <div className="grid lg:grid-cols-12">
                <div className="relative min-h-[28rem] overflow-hidden lg:col-span-7 lg:min-h-[34rem]">
                  <div className="absolute inset-0 transition duration-700 hover:scale-[1.025] motion-reduce:transition-none">
                    <GalleryMedia media={cateringMedia} sizes="(max-width: 1023px) 100vw, 58vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111]" />
                  <div className="absolute bottom-6 left-6 rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.17em] text-[#F5F1E8]/75 backdrop-blur-sm">
                    Gather around the flame
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5 lg:p-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">04 / Catering & events</p>
                  <h2 className="mt-5 max-w-[9ch] font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.82] tracking-[-0.07em] text-[#F5F1E8]">
                    BRING THE FLAME <span className="italic text-[#F5F1E8]/60">TO YOUR EVENT.</span>
                  </h2>
                  <p className="mt-6 max-w-md text-[15px] leading-7 text-[#F5F1E8]/62">
                    Planning a celebration, corporate gathering, or private event? Let Karachi Flames bring the food to you.
                  </p>
                  <Link
                    href="/catering"
                    className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-[#D66A2B]/60 bg-[#C65A24]/15 px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#F5F1E8] transition duration-300 hover:-translate-y-0.5 hover:border-[#D66A2B] hover:bg-[#C65A24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B]"
                  >
                    Explore catering <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.07] bg-[#0b0b0b] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1600px]" data-gallery-reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">05 / Your next frame</p>
                <h2 className="mt-5 max-w-[9ch] font-serif text-[clamp(3.4rem,8vw,9rem)] leading-[0.78] tracking-[-0.08em] text-[#F5F1E8]">
                  LIKE WHAT <span className="italic text-[#F5F1E8]/58">YOU SEE?</span>
                </h2>
                <p className="mt-7 max-w-lg text-[16px] leading-7 text-[#F5F1E8]/65">
                  Come experience Karachi Flames for yourself. The table is the best place to take it from here.
                </p>
              </div>
              <div className="lg:col-span-5 lg:pb-1">
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/menu"
                    className="group inline-flex flex-1 items-center justify-between rounded-[22px] bg-[#F5F1E8] px-5 py-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#111] transition duration-300 hover:-translate-y-1 hover:bg-[#D66A2B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F1E8]"
                  >
                    <span><span className="mr-2 text-[#C65A24] transition-colors group-hover:text-white/80">Hungry yet?</span> View menu</span>
                    <ArrowUpRight className="h-5 w-5 shrink-0" />
                  </Link>
                  <Link
                    href="/catering"
                    className="group inline-flex flex-1 items-center justify-between rounded-[22px] border border-white/15 bg-white/[0.035] px-5 py-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5F1E8] transition duration-300 hover:-translate-y-1 hover:border-[#D66A2B]/60 hover:bg-[#C65A24]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B]"
                  >
                    Catering & events
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-[#D66A2B]" />
                  </Link>
                </div>
                <Link
                  href="/locations"
                  className="group mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5F1E8]/55 transition-colors hover:text-[#D66A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B]"
                >
                  Find a Karachi Flames location <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#070707] px-5 pb-8 pt-12 sm:px-8 sm:pt-16 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-8 border-b border-white/10 pb-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {halalMark.available ? (
                <Image src={halalMark.src} alt={halalMark.alt} width={58} height={58} className="h-14 w-14 object-contain" />
              ) : (
                <div
                  role="img"
                  aria-label="Hand-Slaughtered Zabihah Halal"
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#D66A2B]/50 bg-[#C65A24]/10 font-serif text-xl italic text-[#D66A2B]"
                >
                  H
                </div>
              )}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.19em] text-[#F5F1E8]/55">Hand-Slaughtered</p>
                <p className="mt-1 font-serif text-xl tracking-[-0.04em] text-[#F5F1E8]">Zabihah Halal</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#F5F1E8]/45 sm:text-right">
              A gallery of the food, fire, and moments behind Karachi Flames.
            </p>
          </div>

          <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between">
            <Link href="/" className="w-fit font-serif text-3xl tracking-[-0.06em] text-[#F5F1E8] transition-colors hover:text-[#D66A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D66A2B]">
              Karachi Flames.
            </Link>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
              {[
                ["Menu", "/menu"],
                ["Gallery", "/gallery"],
                ["Catering", "/catering"],
                ["Locations", "/locations"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F5F1E8]/45 transition-colors hover:text-[#D66A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D66A2B]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>

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
                {activeImage.category} / {String(Math.max(activeIndex + 1, 1)).padStart(2, "0")}
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
                <GalleryMedia media={activeImage} sizes="100vw" imageClassName="object-contain" />
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
                {lightboxItems.length > 1 ? "Use arrow keys or swipe" : "Gallery frame"}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] grid overscroll-contain bg-black/95 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) requestClose();
          }}
        >
          <div
            ref={dialogRef}
            className={`gallery-dialog relative mx-auto grid h-full max-h-[900px] w-full max-w-[1360px] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d] shadow-2xl sm:rounded-[32px] ${
              isClosing ? "gallery-dialog-closing" : ""
            }`}
          >
            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <p className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-[#F5F1E8]/55">Behind the flame / Video</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={requestClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-[#F5F1E8] transition hover:border-[#D66A2B] hover:bg-[#C65A24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D66A2B]"
                aria-label="Close video modal"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="grid min-h-0 place-items-center bg-black p-3 sm:p-6">
              {activeVideo.available && activeVideo.videoSrc ? (
                <video controls autoPlay playsInline className="aspect-video max-h-full w-full max-w-6xl rounded-[18px] bg-[#111] sm:rounded-[24px]">
                  <source src={activeVideo.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-[18px] border border-white/10 bg-[#111] sm:rounded-[24px]">
                  <GalleryMedia media={activeVideo} sizes="100vw" />
                  <div className="absolute inset-0 bg-black/55" />
                  <div className="absolute inset-0 grid place-items-center p-6 text-center">
                    <div>
                      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#C65A24] text-white shadow-[0_0_34px_rgba(198,90,36,0.42)]">
                        <PlayIcon className="h-5 w-5 translate-x-px" />
                      </span>
                      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D66A2B]">Video media placeholder</p>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-[#F5F1E8]/70">
                        Replace <span className="font-mono text-[#F5F1E8]">{activeVideo.videoSrc}</span> and set <span className="font-mono text-[#F5F1E8]">available: true</span> when the video is ready.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 px-4 py-4 sm:px-6 sm:py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D66A2B]">{activeVideo.eyebrow}</p>
              <h2 id="video-modal-title" className="mt-1 font-serif text-2xl tracking-[-0.045em] text-[#F5F1E8] sm:text-3xl">
                {activeVideo.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
