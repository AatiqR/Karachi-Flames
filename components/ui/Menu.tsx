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

type NavLink = { label: string; href: string };

const navigation: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/location" },
  { label: "Catering", href: "/catering" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const categories: Category[] = [
  "All",
  "Rolls",
  "Burgers",
  "Rice & Biryani",
  "Desserts",
  "Drinks",
];

// Set hasImage to true once the corresponding file is placed in /public/menu.
// Keeping it false gives the page an intentional premium placeholder rather than a broken image.
const mainMenu: MenuItem[] = [
  {
    name: "Beef Bihari Boti Roll",
    description: "Flaky paratha, beef bihari kabab, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$12.99",
    category: "Rolls",
    imagePath: "/public/menu.jpg",
    imageAlt: "Beef Bihari Boti Roll",
    featured: true,
  },
  {
    name: "Chicken Malai Boti Roll",
    description: "Flaky paratha, chicken malai boti, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$12.99",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Malai Boti Roll",
  },
  {
    name: "KF Flame House Smash Burger",
    description: "Potato bun, smashed beef patty, chopped jalapeños, white cheddar, pineapple, pickles, and KF Flame House sauce.",
    price: "$12.99",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "KF Flame House Smash Burger",
    featured: true,
  },
  {
    name: "Classic Smash Burger",
    description: "Potato bun, smashed beef patty, white cheddar, KF mild white sauce, pickles, jalapeños, lettuce, and red onions.",
    price: "$12.99",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "Classic Smash Burger",
  },
  {
    name: "Karachi Chicken Biryani",
    description: "Spiced basmati rice, chicken, potato, and unmistakable Karachi-style flavor.",
    price: "$14.99",
    category: "Rice & Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Karachi Chicken Biryani",
    featured: true,
  },
  {
    name: "Biscoff Mango Mousse",
    description: "Biscoff crumbles, creamy mango mousse, mango chunks, and mango syrup.",
    price: "$4.99",
    category: "Desserts",
    imagePath: "/menu.jpg",
    imageAlt: "Biscoff Mango Mousse",
  },
  {
    name: "Chocolate Mousse",
    description: "Chocolate cake, creamy chocolate mousse, chocolate syrup, and chocolate chips.",
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
    description: "Flaky paratha, beef bihari kabab, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$14",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Beef Bihari Roll",
  },
  {
    name: "Chicken Malai Boti Roll",
    description: "Flaky paratha, chicken malai boti, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$14",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Malai Boti Roll",
  },
  {
    name: "KF Flame House Smash Burger",
    description: "Brioche bun, smashed beef patty, chopped jalapeños, white cheddar, pineapple, pickles, and KF Flame House sauce.",
    price: "$13",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "KF Flame House Smash Burger",
    addon: "Add onion ring +$1",
  },
  {
    name: "Classic Smash Burger",
    description: "Brioche bun, smashed beef patty, white cheddar, KF mild white sauce, pickles, jalapeños, and lettuce.",
    price: "$13",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "Classic Smash Burger",
    addon: "Add onion ring +$1",
  },
  {
    name: "Karachi Beef Biryani",
    description: "Spiced sela rice, tender boneless beef boti, and authentic Karachi-style flavor.",
    price: "Ask in store",
    category: "Rice & Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Karachi Beef Biryani",
  },
  {
    name: "Chicken Yakhni Pulao",
    description: "Aromatic basmati rice with tender chicken pieces infused with authentic yakhni flavors.",
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
    description: "Flaky paratha, beef bihari kabab, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$14",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Beef Bihari Kabab Roll",
  },
  {
    name: "Chicken Tikka Boti Roll",
    description: "Flaky paratha, chicken tikka boti, red onions, and your choice of chutney or mayo-garlic sauce.",
    price: "$14",
    category: "Rolls",
    imagePath: "/menu.jpg",
    imageAlt: "Chicken Tikka Boti Roll",
  },
  {
    name: "BBQ Pulled Chicken Sliders",
    description: "Garlic-parmesan crusted slider buns, smoky BBQ pulled chicken, and crunchy lettuce.",
    price: "$10",
    category: "Burgers",
    imagePath: "/menu.jpg",
    imageAlt: "BBQ Pulled Chicken Sliders",
  },
  {
    name: "Karachi Beef Biryani",
    description: "Spiced sela rice, tender boneless beef boti, and authentic Karachi-style flavor.",
    price: "$17",
    category: "Rice & Biryani",
    imagePath: "/menu.jpg",
    imageAlt: "Karachi Beef Biryani",
  },
  {
    name: "KF Mango Fizz",
    description: "Mango pulp, lemonade, Sprite, and a splash of mint.",
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

function FoodPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex h-full min-h-56 items-end overflow-hidden bg-[#211712] p-5 sm:min-h-64" aria-label={`${label} image coming soon`} role="img">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(circle at 85% 0%, rgba(198,90,36,.52), transparent 34%), linear-gradient(135deg, rgba(255,255,255,.07) 1px, transparent 1px)", backgroundSize: "auto, 13px 13px" }} />
      <div className="relative border-l border-[#d66528] pl-3">
        <p className="font-serif text-lg italic text-[#f5f2ec]">Karachi Flames</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8d3ca]/75">Food image coming soon</p>
      </div>
    </div>
  );
}

function FoodCard({ item, showImage = true }: { item: MenuItem; showImage?: boolean }) {
  // Flip this to true after placing each referenced image under public/menu.
  const hasImage = false;
  return (
    <article className="group overflow-hidden rounded-[1.15rem] border border-white/[0.09] bg-[#171513] transition duration-300 motion-reduce:transition-none md:hover:-translate-y-1 md:hover:border-[#c65a24]/55 md:hover:shadow-[0_20px_46px_rgba(0,0,0,.32)]">
      {showImage && <div className="relative overflow-hidden">{hasImage ? <Image src={item.imagePath} alt={item.imageAlt} width={800} height={600} className="h-56 w-full object-cover transition duration-500 motion-reduce:transition-none md:group-hover:scale-[1.04]" /> : <FoodPlaceholder label={item.name} />}</div>}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[1.4rem] font-semibold leading-tight text-[#f5f2ec]">{item.name}</h3>
          <p className="shrink-0 font-serif text-lg font-semibold text-[#e67838]">{item.price}</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#d8d3ca]/78">{item.description}</p>
        {item.addon && <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#e67838]">{item.addon}</p>}
      </div>
    </article>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoMissing, setLogoMissing] = useState(false);
  const [halalLogoMissing, setHalalLogoMissing] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const filteredMenu = useMemo(
    () => activeCategory === "All" ? mainMenu : mainMenu.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="min-h-screen overflow-x-clip bg-[#0a0a0a] font-sans text-[#f5f2ec] selection:bg-[#c65a24] selection:text-white">
      <header className="relative z-40 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex min-h-11 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e67838]" aria-label="Karachi Flames home">
          {logoMissing ? <span className="rounded border border-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#d8d3ca]">Logo asset needed</span> : <Image src="/images/karachi-flames-logo.png" alt="Karachi Flames" width={210} height={70} priority className="h-10 w-auto object-contain" onError={() => setLogoMissing(true)} />}
        </Link>
        <button type="button" onClick={() => setIsMenuOpen(true)} className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition hover:border-[#c65a24] hover:bg-[#c65a24]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e67838]" aria-label="Open navigation menu" aria-expanded={isMenuOpen} aria-controls="site-navigation">
          <span className="grid gap-1.5" aria-hidden="true"><span className="block h-px w-5 bg-current" /><span className="block h-px w-5 bg-current" /><span className="block h-px w-3 justify-self-end bg-current" /></span>
        </button>
      </header>

      <div id="site-navigation" className={`fixed inset-0 z-50 transition ${isMenuOpen ? "visible" : "invisible"}`} aria-hidden={!isMenuOpen}>
        <button type="button" tabIndex={isMenuOpen ? 0 : -1} aria-label="Close navigation menu" onClick={() => setIsMenuOpen(false)} className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity motion-reduce:transition-none ${isMenuOpen ? "opacity-100" : "opacity-0"}`} />
        <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#11100f] px-7 py-6 shadow-2xl transition-transform duration-300 motion-reduce:transition-none sm:px-10 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`} role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8d3ca]/70">Explore</span><button type="button" tabIndex={isMenuOpen ? 0 : -1} onClick={() => setIsMenuOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl transition hover:border-[#c65a24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e67838]" aria-label="Close navigation menu">×</button></div>
          <nav className="mt-14" aria-label="Main navigation"><ul className="space-y-1">{navigation.map((link, index) => <li key={link.href}><Link href={link.href} tabIndex={isMenuOpen ? 0 : -1} onClick={() => setIsMenuOpen(false)} aria-current={link.href === "/menu" ? "page" : undefined} className={`group flex items-center gap-4 rounded-lg px-3 py-3 font-serif text-2xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e67838] ${link.href === "/menu" ? "text-[#e67838]" : "text-[#f5f2ec] hover:text-[#e67838]"}`}><span className="font-sans text-[10px] tracking-[0.16em] text-[#d8d3ca]/45">0{index + 1}</span>{link.label}</Link></li>)}</ul></nav>
          <div className="mt-auto border-t border-white/10 pt-6 text-sm text-[#d8d3ca]/65">Authentic flavor of Karachi. Done right!</div>
        </aside>
      </div>

      <section className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-10 sm:px-8 sm:pb-20 lg:px-12 lg:pt-16">
        <div className="absolute left-1/2 top-0 h-[420px] w-[min(850px,100%)] -translate-x-1/2 rounded-full bg-[#c65a24]/[0.13] blur-[120px]" aria-hidden="true" />
        <div className="relative max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#e67838]">Karachi Flames · Menu</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-[#f5f2ec] sm:text-6xl lg:text-7xl">Authentic flavor of Karachi. <em className="font-normal text-[#e67838]">Done right!</em></h1>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8"><p className="max-w-xl text-base leading-7 text-[#d8d3ca]/80 sm:text-lg">Bold Karachi flavors, fire-grilled favorites, and comfort food made with passion.</p><div className="flex items-center border-l border-[#c65a24] pl-4">{halalLogoMissing ? <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#d8d3ca]">Zabiha Halal logo asset needed</span> : <Image src="/images/zabiha-halal-logo.png" alt="Hand-slaughtered Zabiha Halal" width={138} height={54} className="h-12 w-auto object-contain" onError={() => setHalalLogoMissing(true)} />}</div></div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-y border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-md" aria-label="Menu categories"><div className="scrollbar-none mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e67838] ${activeCategory === category ? "bg-[#c65a24] text-white shadow-[0_6px_18px_rgba(198,90,36,.22)]" : "border border-white/[0.12] text-[#d8d3ca] hover:border-[#c65a24]/70 hover:text-white"}`} aria-pressed={activeCategory === category}>{category}</button>)}</div></section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12" aria-labelledby="main-menu-heading"><div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">The main menu</p><h2 id="main-menu-heading" className="mt-3 font-serif text-4xl tracking-[-0.025em] sm:text-5xl">Made for the table.</h2></div><p className="text-sm text-[#d8d3ca]/60">{filteredMenu.length} {filteredMenu.length === 1 ? "item" : "items"}</p></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredMenu.map((item) => <FoodCard key={item.name} item={item} />)}</div></section>

      <section className="border-y border-[#c65a24]/25 bg-[#15100d] py-16 sm:py-20" aria-labelledby="special-menu-heading"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="mb-9 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">A little extra heat</p><h2 id="special-menu-heading" className="mt-3 font-serif text-4xl tracking-[-0.025em] sm:text-5xl">Special Menu</h2><p className="mt-4 text-[#d8d3ca]/75">Limited-time Karachi Flames favorites, made when the moment calls for something memorable.</p></div><div className="grid grid-cols-1 gap-4 lg:grid-cols-2">{specialMenu.map((item) => <FoodCard key={item.name} item={item} showImage={false} />)}</div></div></section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12" aria-labelledby="friday-menu-heading"><div className="rounded-[1.5rem] border border-white/[0.1] bg-[#121110] p-6 sm:p-10"><div className="mb-9 flex flex-col justify-between gap-4 border-b border-white/[0.1] pb-7 lg:flex-row lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">AlTaqwa Foodie Fridays</p><h2 id="friday-menu-heading" className="mt-3 font-serif text-4xl tracking-[-0.025em] sm:text-5xl">Friday Special</h2></div><p className="max-w-sm text-sm leading-6 text-[#d8d3ca]/65">A rotating, Friday-only lineup. Availability is limited; please check with your local Karachi Flames location.</p></div><div className="grid gap-x-10 gap-y-7 md:grid-cols-2 xl:grid-cols-3">{fridayMenu.map((item) => <div key={item.name} className="border-b border-white/[0.08] pb-6"><div className="flex gap-4"><h3 className="font-serif text-xl leading-tight">{item.name}</h3><p className="ml-auto shrink-0 font-serif text-lg text-[#e67838]">{item.price}</p></div><p className="mt-2 text-sm leading-6 text-[#d8d3ca]/70">{item.description}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12"><div className="flex flex-col gap-4 rounded-xl border border-white/[0.1] bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:p-6"><span className="text-[#e67838]" aria-hidden="true">✦</span><p className="text-sm leading-6 text-[#d8d3ca]/75"><strong className="font-semibold text-[#f5f2ec]">Please note:</strong> All menu items contain dairy. Please let our team know about any dietary needs or allergies before ordering.</p></div></section>

      <section className="relative overflow-hidden border-t border-white/[0.09] bg-[#17110d] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12"><div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c65a24]/20 blur-[100px]" aria-hidden="true" /><div className="relative mx-auto max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e67838]">Karachi Flames</p><h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Come taste the flame.</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-[#d8d3ca]/78">Authentic Karachi flavor, made fresh and served with pride.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/location" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c65a24] px-6 text-sm font-bold text-white transition hover:bg-[#dc6c2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f2ec]">Order Now</Link><Link href="/location" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-bold text-[#f5f2ec] transition hover:border-[#e67838] hover:text-[#e67838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f2ec]">Find a Location</Link></div></div></section>

      <footer className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-7 text-xs text-[#d8d3ca]/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><p>© Karachi Flames. All rights reserved.</p><p>Authentic Karachi BBQ · Hand-slaughtered Zabiha Halal</p></footer>
      <style jsx global>{`.scrollbar-none{scrollbar-width:none}.scrollbar-none::-webkit-scrollbar{display:none}@media (prefers-reduced-motion: reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}`}</style>
    </main>
  );
}
