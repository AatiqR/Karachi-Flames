import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Karachi Flames — Authentic Karachi BBQ",
  description:
    "Discover the story behind Karachi Flames, our connection to Karachi, our passion for bold BBQ flavor, and the people behind the flame.",
};

type StorySection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: string | null;
  imageLabel: string;
};

type GalleryImage = {
  src: string | null;
  label: string;
  alt: string;
  className: string;
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/location" },
  { label: "Catering & Private Events", href: "/catering" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

// Replace placeholder copy and add local files under /public/images/about when assets are ready.
const storySections: StorySection[] = [
  {
    eyebrow: "Our Story",
    title: "It started with a love for Karachi.",
    paragraphs: [
      "[HOW KARACHI FLAMES STARTED — Add the beginning of the brand story here. This editorial reading area is intentionally built to support a few paragraphs or a full, detailed history.]",
      "[WHY KARACHI — Share the memories, food culture, family gatherings, or feeling of the city that inspired Karachi Flames. Keep the voice personal, specific, and true to the people behind the restaurant.]",
      "[WHAT WE WANTED TO SHARE — Explain what guests are invited to discover at Karachi Flames, without needing to reduce the story to a few short lines.]",
    ],
    image: null, // "/images/about/about-story.jpg"
    imageLabel: "About story image",
  },
  {
    eyebrow: "Rooted in Karachi",
    title: "A city with flavor in its pulse.",
    paragraphs: [
      "[OUR CONNECTION TO KARACHI — Add approved copy about the city, its food culture, and the energy that informs Karachi Flames.]",
      "[THE INSPIRATION — This space can hold additional context about the flavors, hospitality, and food memories that shaped the menu.]",
    ],
    image: null, // "/images/about/about-karachi.jpg"
    imageLabel: "Karachi-inspired food or city image",
  },
];

const values = [
  {
    number: "01",
    title: "Authenticity",
    description: "[Add the principle that keeps Karachi Flames connected to its point of view.]",
  },
  {
    number: "02",
    title: "Family",
    description: "[Add approved family or people-first brand copy here.]",
  },
  {
    number: "03",
    title: "Flavor",
    description: "[Add the food philosophy that guides every plate.]",
  },
  {
    number: "04",
    title: "Hospitality",
    description: "[Describe the welcome and experience guests should feel.]",
  },
  {
    number: "05",
    title: "Quality",
    description: "[Add only client-confirmed standards and commitments.]",
  },
  {
    number: "06",
    title: "Community",
    description: "[Optional: add confirmed community story or remove this value.]",
  },
];

const galleryImages: GalleryImage[] = [
  {
    src: null, // "/images/about/about-food.jpg"
    label: "Signature food",
    alt: "Karachi Flames food photography",
    className: "md:col-span-7 md:aspect-[1.28/1]",
  },
  {
    src: null, // "/images/about/about-restaurant.jpg"
    label: "The restaurant",
    alt: "Karachi Flames restaurant interior",
    className: "md:col-span-5 md:aspect-[.84/1]",
  },
  {
    src: null, // "/images/about/about-team.jpg"
    label: "The people behind the flame",
    alt: "Karachi Flames team",
    className: "md:col-span-4 md:aspect-[.85/1]",
  },
  {
    src: null, // "/images/about/about-fire.jpg"
    label: "The fire",
    alt: "Karachi Flames grill or fire",
    className: "md:col-span-8 md:aspect-[1.62/1]",
  },
];

// Add only verified names, roles, biographies, and quotes. Leave empty to hide this optional section.
const teamMembers: Array<{
  name: string;
  role: string;
  bio: string;
  quote?: string;
  image: string | null;
}> = [];

// Add only real milestones. This optional section is intentionally hidden while empty.
const milestones: Array<{ label: string; title: string; description: string }> = [];

const halalLogo: string | null = null; // "/images/zabiha-halal-logo.svg"

function FlameMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 50 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 61C12.3 61 3 51.5 3 39.5c0-12.3 8.2-18.1 13-27.2.7 7.7 4.1 11.3 8.8 14.5C24.3 16.6 30.6 8 39.6 3c-.1 10.4 7.4 17.6 7.4 29.9C47 48.3 37.5 61 25 61Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M25.3 52c-5.3 0-9.2-4-9.2-9.1 0-4.8 3.1-7.7 6.7-11.9.1 4.8 2.4 7.1 4.9 8.6.5-4.8 3.1-8.2 6.7-10.6-.2 5.8 3.1 8.5 3.1 14.1 0 5.1-4.1 8.9-9.2 8.9h-3Z" fill="currentColor" />
    </svg>
  );
}

function Visual({
  src,
  alt,
  label,
  className = "",
  priority = false,
}: {
  src: string | null;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
        <Image
          alt={alt}
          className="object-cover transition duration-700 ease-out motion-safe:group-hover:scale-105"
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1280px) 70vw, 50vw"
          src={src}
        />
      </div>
    );
  }

  return (
    <div
      aria-label={`${label} placeholder`}
      className={`relative isolate overflow-hidden bg-[#151310] ${className}`}
      role="img"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(198,90,36,0.35),transparent_26%),radial-gradient(circle_at_22%_88%,rgba(115,63,34,0.35),transparent_37%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(125deg,transparent_0%,transparent_47%,#fff_48%,transparent_49%,transparent_100%)] [background-size:13px_13px]" />
      <div className="absolute inset-x-5 top-5 h-px bg-white/15" />
      <div className="absolute bottom-6 left-6 flex items-center gap-3 text-[#F5F1E8] sm:bottom-8 sm:left-8">
        <span className="grid size-10 place-items-center rounded-full border border-[#C65A24]/60 bg-black/20 text-[#D76A2C]">
          <FlameMark className="h-5 w-4" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">{label}</span>
      </div>
      <span className="absolute -right-6 -top-10 font-serif text-[160px] leading-none text-white/[0.045]" aria-hidden="true">K</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main id="page-top" className="min-h-screen overflow-x-clip bg-[#080808] font-sans text-[#F5F1E8] selection:bg-[#C65A24] selection:text-white">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
          <Link aria-label="Karachi Flames home" className="group flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D76A2C]" href="/">
            <FlameMark className="h-9 w-7 text-[#D76A2C] transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="font-serif text-xl tracking-[-0.04em] sm:text-2xl">Karachi <em className="font-normal text-[#D76A2C]">Flames</em></span>
          </Link>
          <a aria-label="Open navigation menu" className="group flex items-center gap-3 rounded-sm py-2 text-xs font-medium uppercase tracking-[0.17em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D76A2C]" href="#site-menu">
            <span className="hidden sm:block">Menu</span>
            <span className="flex w-7 flex-col gap-1.5" aria-hidden="true"><i className="h-px w-full bg-current transition group-hover:translate-x-1" /><i className="h-px w-4/6 bg-[#D76A2C] transition group-hover:w-full" /></span>
          </a>
        </div>
      </header>

      <nav aria-label="Primary navigation" className="pointer-events-none invisible fixed inset-0 z-50 grid place-items-center bg-[#080808]/98 px-6 opacity-0 transition-opacity duration-300 target:pointer-events-auto target:visible target:opacity-100" id="site-menu">
        <a aria-label="Close navigation menu" className="absolute right-6 top-6 grid size-12 place-items-center rounded-full border border-white/20 text-2xl text-[#F5F1E8] transition hover:border-[#D76A2C] hover:text-[#D76A2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D76A2C] sm:right-10 sm:top-9" href="#page-top">×</a>
        <div className="w-full max-w-3xl">
          <p className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-[#D76A2C]"><span className="h-px w-9 bg-[#D76A2C]" />Navigate</p>
          <ul className="grid gap-2 sm:grid-cols-2 sm:gap-x-16">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <Link aria-current={item.href === "/about" ? "page" : undefined} className={`group flex items-baseline gap-5 rounded-sm py-2 font-serif text-3xl tracking-[-0.045em] transition hover:text-[#D76A2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D76A2C] sm:text-5xl ${item.href === "/about" ? "text-[#D76A2C]" : ""}`} href={item.href}>
                  <span className="font-mono text-[10px] tracking-normal text-white/35">0{index + 1}</span>{item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section aria-labelledby="hero-heading" className="relative isolate min-h-[760px] overflow-hidden border-b border-white/10 sm:min-h-[820px]">
        <Visual alt="Karachi Flames hero" className="absolute inset-0 h-full w-full" label="Hero: family, fire, or food photography" priority src={null} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.93)_0%,rgba(8,8,8,.64)_46%,rgba(8,8,8,.15)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,.85)_0%,transparent_42%)]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-32 sm:min-h-[820px] sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <p className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#D76A2C]"><span className="h-px w-10 bg-[#D76A2C]" />The Karachi Flames story</p>
          <h1 id="hero-heading" className="max-w-5xl font-serif text-[clamp(3.15rem,9.2vw,8.7rem)] leading-[0.83] tracking-[-0.065em] text-[#F5F1E8]">Born from<br /><em className="font-normal text-[#D76A2C]">Karachi.</em> Built<br />around the flame.</h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-[#F5F1E8]/80 sm:text-lg sm:leading-8">Karachi Flames brings the bold, unmistakable flavors of Karachi to every plate — rooted in tradition, family, fire, and the belief that great food brings people together.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="inline-flex min-h-12 items-center justify-center bg-[#C65A24] px-6 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#D76A2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F1E8]" href="/menu">Explore our menu <span className="ml-3 text-lg leading-none">↗</span></Link>
            <Link className="inline-flex min-h-12 items-center justify-center border border-white/30 px-6 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:border-[#D76A2C] hover:text-[#D76A2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D76A2C]" href="/catering">Cater your event</Link>
          </div>
        </div>
        <div className="absolute bottom-7 right-5 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/55 sm:flex sm:right-8 lg:right-12"><span className="h-8 w-px bg-[#D76A2C]" />Scroll to discover</div>
      </section>

      <section aria-labelledby="our-story-heading" className="bg-[#F5F1E8] px-5 py-20 text-[#101010] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.7fr)] lg:gap-20">
            <div><p className="sticky top-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#A3451D]"><span className="h-px w-9 bg-[#C65A24]" />{storySections[0].eyebrow}</p></div>
            <div>
              <h2 id="our-story-heading" className="max-w-3xl font-serif text-5xl leading-[.9] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{storySections[0].title}</h2>
              <div className="mt-12 max-w-2xl space-y-7 text-[1.05rem] leading-8 text-[#26221d] sm:text-lg sm:leading-9">
                {storySections[0].paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </div>
          </div>
          <div className="group mt-16 overflow-hidden sm:mt-24"><Visual alt="Karachi Flames brand story" className="aspect-[1.1/1] sm:aspect-[1.75/1]" label={storySections[0].imageLabel} src={storySections[0].image} /></div>
        </div>
      </section>

      <section aria-labelledby="karachi-heading" className="bg-[#101010] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="group order-2 lg:order-1"><Visual alt="Karachi image" className="aspect-[.88/1] sm:aspect-[1.15/1]" label={storySections[1].imageLabel} src={storySections[1].image} /></div>
          <div className="order-1 lg:order-2">
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#D76A2C]"><span className="h-px w-9 bg-[#D76A2C]" />{storySections[1].eyebrow}</p>
            <h2 id="karachi-heading" className="mt-7 max-w-xl font-serif text-5xl leading-[.9] tracking-[-0.055em] sm:text-6xl">{storySections[1].title}</h2>
            <div className="mt-9 max-w-xl space-y-6 text-base leading-8 text-white/70 sm:text-lg sm:leading-9">{storySections[1].paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            <p className="mt-10 border-l-2 border-[#C65A24] pl-5 font-serif text-2xl leading-tight text-[#F5F1E8] sm:text-3xl">From Karachi. Served with pride.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="flame-heading" className="relative isolate overflow-hidden border-y border-white/10 bg-[#080808] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="absolute inset-y-0 right-0 w-2/3 opacity-60"><Visual alt="BBQ fire photography" className="h-full w-full" label="BBQ and fire image" src={null} /><div className="absolute inset-0 bg-[linear-gradient(90deg,#080808_0%,rgba(8,8,8,.82)_30%,rgba(8,8,8,.05)_100%)]" /></div>
        <div className="relative mx-auto max-w-[1280px]">
          <FlameMark className="h-12 w-10 text-[#D76A2C]" />
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[#D76A2C]">The flame</p>
          <h2 id="flame-heading" className="mt-5 max-w-3xl font-serif text-5xl leading-[.88] tracking-[-0.055em] sm:text-6xl lg:text-8xl">Fire is part<br />of the <em className="font-normal text-[#D76A2C]">flavor.</em></h2>
          <p className="mt-8 max-w-lg text-base leading-8 text-white/75 sm:text-lg sm:leading-9">[OUR BBQ / FIRE PHILOSOPHY — Add client-confirmed copy about preparation, flavor, care, or the role of fire. No unverified cooking claims have been made here.]</p>
        </div>
      </section>

      <section aria-labelledby="belief-heading" className="bg-[#F5F1E8] px-5 py-20 text-[#101010] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1280px]">
          <div className="max-w-2xl"><p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#A3451D]"><span className="h-px w-9 bg-[#C65A24]" />Food philosophy</p><h2 id="belief-heading" className="mt-6 font-serif text-5xl leading-[.9] tracking-[-0.055em] sm:text-6xl">What we believe.</h2></div>
          <div className="mt-14 divide-y divide-black/15 border-t border-black/15">
            {values.map((value) => <article className="grid gap-4 py-7 sm:grid-cols-[70px_minmax(0,1fr)_minmax(0,.8fr)] sm:gap-8 sm:py-9" key={value.title}><p className="font-mono text-[10px] tracking-[0.15em] text-[#A3451D]">{value.number}</p><h3 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">{value.title}</h3><p className="max-w-md text-sm leading-7 text-black/65 sm:text-base">{value.description}</p></article>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="family-heading" className="bg-[#191512] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <div><p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#D76A2C]"><span className="h-px w-9 bg-[#D76A2C]" />The people behind the flame</p><h2 id="family-heading" className="mt-7 max-w-2xl font-serif text-5xl leading-[.9] tracking-[-0.055em] sm:text-6xl">Family at the heart of it.</h2><div className="mt-9 max-w-xl space-y-6 text-base leading-8 text-white/70 sm:text-lg sm:leading-9"><p>[FAMILY STORY — If Karachi Flames is family-owned, add the client-approved story here. This section is written to hold more than a short paragraph.]</p><p>[THE PEOPLE — Add the values, care, and human side that guests should know about. If family ownership is not confirmed, update this heading and copy to reflect the team.]</p></div></div>
            <div className="group"><Visual alt="Karachi Flames family or team" className="aspect-[.9/1]" label="Family or team image" src={null} /></div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-12 md:items-end">
            {galleryImages.map((image) => <div className={`group ${image.className}`} key={image.label}><Visual alt={image.alt} className="aspect-[1.2/1] md:h-full md:aspect-auto" label={image.label} src={image.src} /></div>)}
          </div>
        </div>
      </section>

      <section aria-label="Karachi Flames brand statement" className="relative isolate overflow-hidden bg-[#C65A24] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_30%_40%,#fff_0%,transparent_1.5%),radial-gradient(circle_at_70%_70%,#000_0%,transparent_1%)] [background-size:23px_23px]" />
        <blockquote className="relative mx-auto max-w-5xl text-center"><p className="font-serif text-5xl leading-[.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl">“Great food doesn&apos;t just fill a table. It brings people together.”</p><footer className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-white/75">Karachi Flames brand belief</footer></blockquote>
      </section>

      <section aria-labelledby="halal-heading" className="border-b border-white/10 bg-[#101010] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          <div className="grid size-24 shrink-0 place-items-center rounded-full border border-[#D76A2C]/50 bg-[#17130f]">
            {halalLogo ? <Image alt="Hand-slaughtered Zabiha Halal" height={70} src={halalLogo} width={70} /> : <><FlameMark className="h-8 w-6 text-[#D76A2C]" /><span className="mt-1 font-mono text-[7px] uppercase tracking-[0.15em] text-white/65">Halal logo</span></>}
          </div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D76A2C]">Hand-slaughtered Zabiha Halal</p><h2 id="halal-heading" className="mt-3 font-serif text-3xl tracking-[-0.045em] sm:text-4xl">Food you can feel good about.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Karachi Flames is committed to serving food aligned with our values and standards. [Replace with confirmed client-approved halal statement when provided.]</p></div>
        </div>
      </section>

      {teamMembers.length > 0 && <section aria-labelledby="team-heading" className="bg-[#F5F1E8] px-5 py-20 text-[#101010] sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto max-w-[1280px]"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#A3451D]">The people</p><h2 id="team-heading" className="mt-6 font-serif text-5xl tracking-[-0.055em] sm:text-6xl">Meet the people behind Karachi Flames.</h2><div className="mt-12 grid gap-10 md:grid-cols-2">{teamMembers.map((member) => <article key={member.name}><Visual alt={member.name} className="aspect-[1/1]" label={`${member.name} portrait`} src={member.image} /><h3 className="mt-5 font-serif text-3xl">{member.name}</h3><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#A3451D]">{member.role}</p><p className="mt-4 max-w-xl leading-8 text-black/70">{member.bio}</p>{member.quote && <blockquote className="mt-5 border-l-2 border-[#C65A24] pl-4 font-serif text-xl">“{member.quote}”</blockquote>}</article>)}</div></div></section>}

      {milestones.length > 0 && <section aria-labelledby="timeline-heading" className="bg-[#101010] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto max-w-[1100px]"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D76A2C]">Our journey</p><h2 id="timeline-heading" className="mt-6 font-serif text-5xl tracking-[-0.055em] sm:text-6xl">The story so far.</h2><ol className="mt-12 border-l border-white/20 pl-7 sm:pl-10">{milestones.map((milestone) => <li className="relative pb-12 last:pb-0" key={milestone.title}><span className="absolute -left-[33px] top-1 size-3 rounded-full border-2 border-[#101010] bg-[#D76A2C] sm:-left-[45px]" /><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D76A2C]">{milestone.label}</p><h3 className="mt-2 font-serif text-3xl">{milestone.title}</h3><p className="mt-3 max-w-2xl leading-8 text-white/65">{milestone.description}</p></li>)}</ol></div></section>}

      <section aria-labelledby="taste-heading" className="relative isolate overflow-hidden bg-[#080808] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44">
        <div className="absolute inset-0 opacity-30"><Visual alt="Karachi Flames food image" className="h-full w-full" label="Closing food image" src={null} /><div className="absolute inset-0 bg-[#080808]/65" /></div>
      </section>

      <footer className="bg-[#080808] px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-5 border-t border-white/15 pt-8 text-center sm:flex-row sm:text-left"><Link aria-label="Karachi Flames home" className="flex items-center gap-2 rounded-sm font-serif text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D76A2C]" href="/"><FlameMark className="h-6 w-5 text-[#D76A2C]" />Karachi Flames</Link><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">Authentic Karachi BBQ · [City, State]</p><Link className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/60 transition hover:text-[#D76A2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D76A2C]" href="/contact">Get in touch ↗</Link></div></footer>
    </main>
  );
}
