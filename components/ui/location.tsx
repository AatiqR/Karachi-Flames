"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/*
 * KARACHI FLAMES — LOCATIONS
 *
 * Update the data blocks below when confirmed business information and imagery
 * are available. A null image intentionally renders the designed visual
 * placeholder, so this page never shows a broken image while assets are pending.
 */

type LocationType = "restaurant" | "food-truck" | "pop-up";
type LocationStatus = "open" | "closed" | "opening-soon" | "closing-soon" | "pending";
type LocationFilter = "all" | LocationType;

type HoursRow = {
  day: string;
  time: string;
};

type Location = {
  id: string;
  type: LocationType;
  name: string;
  image: string | null;
  imageAlt: string;
  imagePath: string;
  address: string[];
  phone: string | null;
  email: string | null;
  hours: HoursRow[];
  status: LocationStatus;
  description: string;
  directionsUrl: string | null;
  orderUrl: string | null;
  features: string[];
  mapPosition: { x: number; y: number };
};

type TruckScheduleEntry = {
  id: string;
  date: string;
  location: string;
  address: string;
  time: string;
  status: LocationStatus;
  directionsUrl: string | null;
  note?: string;
};

// Add the supplied Karachi Flames logo path here once available.
const brandLogoSrc: string | null = null;
// Use the supplied hand-slaughtered Zabiha Halal logo here. Leave null to use text only.
const halalLogoSrc: string | null = null;

// Replace every bracketed value only after it has been confirmed by the client.
const locations: Location[] = [
  {
    id: "restaurant-1",
    type: "restaurant",
    name: "[LOCATION NAME]",
    image: null,
    imageAlt: "Karachi Flames restaurant exterior placeholder",
    imagePath: "/images/location/restaurant-exterior.jpg",
    address: ["[STREET ADDRESS]", "[CITY, STATE ZIP]"],
    phone: null,
    email: null,
    hours: [
      { day: "Monday", time: "[OPENING HOURS]" },
      { day: "Tuesday", time: "[OPENING HOURS]" },
      { day: "Wednesday", time: "[OPENING HOURS]" },
      { day: "Thursday", time: "[OPENING HOURS]" },
      { day: "Friday", time: "[OPENING HOURS]" },
      { day: "Saturday", time: "[OPENING HOURS]" },
      { day: "Sunday", time: "[OPENING HOURS]" },
    ],
    status: "pending",
    description: "Full location details will be announced here.",
    directionsUrl: null,
    orderUrl: null,
    features: [],
    // Visual-only marker position for the map shell; replace when a real map is connected.
    mapPosition: { x: 31, y: 42 },
  },
  {
    id: "food-truck-1",
    type: "food-truck",
    name: "[FOOD TRUCK NAME]",
    image: null,
    imageAlt: "Karachi Flames food truck placeholder",
    imagePath: "/images/location/food-truck.jpg",
    address: ["[CURRENT ADDRESS]", "[CITY, STATE ZIP]"],
    phone: null,
    email: null,
    hours: [{ day: "Service hours", time: "[TRUCK HOURS]" }],
    status: "pending",
    description: "Route, service windows, and event information will appear here.",
    directionsUrl: null,
    orderUrl: null,
    features: [],
    mapPosition: { x: 69, y: 61 },
  },
];

// Keep dynamic truck stops in this array instead of adding schedule cards in JSX.
const foodTruckSchedule: TruckScheduleEntry[] = [
  {
    id: "truck-stop-1",
    date: "[DATE]",
    location: "[FOOD TRUCK LOCATION]",
    address: "[ADDRESS]",
    time: "[TIME]",
    status: "pending",
    directionsUrl: null,
    note: "Schedule details coming soon.",
  },
];

const locationFilterOptions: { id: LocationFilter; label: string }[] = [
  { id: "all", label: "All locations" },
  { id: "restaurant", label: "Restaurants" },
  { id: "food-truck", label: "Food trucks" },
  { id: "pop-up", label: "Pop-ups" },
];

const experiencePoints = [
  {
    number: "01",
    title: "Fire-grilled flavor",
    copy: "Bold BBQ prepared with care and served with the energy of Karachi.",
  },
  {
    number: "02",
    title: "Authentic Karachi style",
    copy: "Recipes rooted in the food culture that inspires every plate we serve.",
  },
  {
    number: "03",
    title: "Zabihah Halal",
    copy: "Hand-slaughtered Zabiha Halal quality is at the center of the Karachi Flames experience.",
  },
  {
    number: "04",
    title: "Warm hospitality",
    copy: "Come hungry, stay awhile, and make the visit part of the meal.",
  },
];

const locationTypeLabel: Record<LocationType, string> = {
  restaurant: "Restaurant",
  "food-truck": "Food truck",
  "pop-up": "Pop-up",
};

const statusMeta: Record<LocationStatus, { label: string; dot: string; text: string }> = {
  open: { label: "Open now", dot: "bg-[#8baf92]", text: "text-[#b7d4bd]" },
  closed: { label: "Closed", dot: "bg-[#a66b60]", text: "text-[#d2a49b]" },
  "opening-soon": { label: "Opening soon", dot: "bg-[#c65a24]", text: "text-[#e7a07b]" },
  "closing-soon": { label: "Closing soon", dot: "bg-[#c98758]", text: "text-[#e7bd9a]" },
  pending: { label: "Details coming soon", dot: "bg-[#8e8b83]", text: "text-[#c3c0b7]" },
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/location" },
  { label: "Catering", href: "/catering" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export default function LocationsPage() {
  const [activeFilter, setActiveFilter] = useState<LocationFilter>("all");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(locations[0]?.id ?? "");

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return locations.filter((location) => {
      const matchesFilter = activeFilter === "all" || location.type === activeFilter;
      const searchableText = [location.name, ...location.address, location.description]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, query]);

  useEffect(() => {
    if (filteredLocations.length && !filteredLocations.some((location) => location.id === selectedLocationId)) {
      setSelectedLocationId(filteredLocations[0].id);
    }
  }, [filteredLocations, selectedLocationId]);

  const selectedLocation =
    filteredLocations.find((location) => location.id === selectedLocationId) ?? filteredLocations[0];
  const restaurantLocation = locations.find((location) => location.type === "restaurant");
  const nextTruckStop = foodTruckSchedule[0];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808] text-[#f5f1e8] selection:bg-[#c65a24] selection:text-white">
      <title>Locations | Karachi Flames — Find Authentic Karachi BBQ</title>
      <meta name="description" content="Find Karachi Flames locations, restaurant hours, food truck locations, addresses, directions, and operating information." />
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-[#f5f1e8] px-5 py-3 text-sm font-bold text-[#080808] focus:not-sr-only"
      >
        Skip to content
      </a>

      <header className="relative z-40 mx-auto flex w-full max-w-[1540px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
        <Link href="/" aria-label="Karachi Flames home" className="group flex items-center gap-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]">
          {brandLogoSrc ? (
            <Image src={brandLogoSrc} alt="Karachi Flames" width={164} height={44} priority className="h-9 w-auto object-contain" />
          ) : (
            <>
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c65a24]/60 bg-[#c65a24]/10 text-lg text-[#e88b58] transition-transform duration-300 group-hover:-translate-y-0.5">✦</span>
              <span className="font-serif text-xl font-semibold uppercase tracking-[0.09em] text-[#f5f1e8] sm:text-2xl">Karachi Flames</span>
            </>
          )}
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[0.035] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#f5f1e8] transition hover:border-[#d76a2c]/70 hover:bg-[#c65a24]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c] sm:px-5"
        >
          <span>Menu</span>
          <span aria-hidden="true" className="grid gap-1.5">
            <i className="block h-px w-5 bg-current transition-transform duration-200 group-hover:translate-x-0.5" />
            <i className="block h-px w-5 bg-current" />
          </span>
        </button>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex min-h-screen flex-col bg-[#0d0d0c] px-5 py-5 sm:px-8 lg:px-12"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="mx-auto flex w-full max-w-[1540px] items-center justify-between">
            <span className="font-serif text-xl uppercase tracking-[0.09em] text-[#f5f1e8] sm:text-2xl">Karachi Flames</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              autoFocus
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 px-4 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-[#d76a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c] sm:px-5"
            >
              Close <span aria-hidden="true" className="text-lg leading-none">×</span>
            </button>
          </div>
          <nav className="mx-auto flex w-full max-w-[1540px] flex-1 flex-col justify-center py-12" aria-label="Main navigation">
            <ol className="grid gap-1 md:grid-cols-2 md:gap-x-14">
              {navItems.map((item, index) => {
                const current = item.label === "Locations";
                return (
                  <li key={item.href} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={current ? "page" : undefined}
                      className="group flex items-center justify-between py-4 font-serif text-3xl leading-none text-[#f5f1e8] transition hover:text-[#e88b58] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d76a2c] sm:py-5 sm:text-4xl lg:text-5xl"
                    >
                      <span className="flex items-start gap-4"><small className="mt-1.5 font-sans text-[10px] font-bold tracking-[0.2em] text-[#c65a24]">0{index + 1}</small>{item.label}</span>
                      <span aria-hidden="true" className="text-base opacity-0 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100">↗</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
          <p className="mx-auto w-full max-w-[1540px] text-xs uppercase tracking-[0.18em] text-[#918e87]">Authentic Karachi flavor, wherever the flame lands.</p>
        </div>
      )}

      <div id="main-content">
        <section className="relative isolate border-b border-white/10">
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_13%,rgba(198,90,36,0.24),transparent_28%),radial-gradient(circle_at_12%_90%,rgba(92,55,31,0.32),transparent_33%),linear-gradient(120deg,#080808_12%,#12110f_56%,#17120e_100%)]" />
            <div className="absolute -right-[10%] top-[6%] h-[24rem] w-[24rem] rounded-full border border-[#d76a2c]/20 sm:h-[35rem] sm:w-[35rem]" />
            <div className="absolute -right-[3%] top-[14%] h-[19rem] w-[19rem] rounded-full border border-white/10 sm:h-[28rem] sm:w-[28rem]" />
            <div className="absolute bottom-0 left-[8%] h-24 w-px bg-gradient-to-b from-transparent to-[#c65a24]" />
          </div>

          <div className="mx-auto grid max-w-[1540px] gap-10 px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.5fr)] lg:items-end lg:gap-16 lg:px-12 lg:pb-20 lg:pt-24">
            <div className="max-w-4xl">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e88b58]"><span className="h-px w-8 bg-[#c65a24]" />Find Karachi Flames</p>
              <h1 className="max-w-4xl font-serif text-[clamp(3.5rem,9.1vw,8.7rem)] font-medium leading-[0.84] tracking-[-0.06em] text-[#f5f1e8]">Come find<br /><em className="font-normal text-[#e88b58]">the flame.</em></h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#c9c4b9] sm:text-lg">Find your nearest Karachi Flames location, check today&apos;s hours, or track down our food truck.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#finder" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#c65a24] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#d76a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f1e8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]">Get directions <span aria-hidden="true">↘</span></a>
                <Link href="/menu" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#f5f1e8] transition hover:border-[#e88b58] hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c]">View menu</Link>
              </div>
            </div>

            <aside className="max-w-sm border-l border-[#c65a24]/70 pl-5 sm:pl-6 lg:mb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e88b58]">Plan your visit</p>
              <p className="mt-3 font-serif text-2xl leading-tight text-[#f5f1e8]">Restaurant and truck details, all in one place.</p>
              <a href="#truck" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c9c4b9] underline decoration-[#c65a24] underline-offset-8 transition hover:text-white">Follow the truck <span aria-hidden="true">→</span></a>
            </aside>
          </div>
        </section>

        <section id="finder" className="scroll-mt-6 bg-[#f5f1e8] py-16 text-[#12110f] sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-6 border-b border-[#1a1815]/15 pb-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a8481c]">Location finder</p>
                <h2 className="font-serif text-5xl leading-[0.9] tracking-[-0.045em] sm:text-6xl">Find your flame.</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#615c54]">Whether you&apos;re stopping by our restaurant or tracking down the truck, here&apos;s where to find us.</p>
              </div>
              <p aria-live="polite" className="text-sm text-[#615c54]">{filteredLocations.length} {filteredLocations.length === 1 ? "location" : "locations"} shown</p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="relative">
                <label htmlFor="location-search" className="sr-only">Search locations by city or ZIP code</label>
                <span aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg text-[#8e887d]">⌕</span>
                <input
                  id="location-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by city or ZIP code"
                  className="min-h-14 w-full rounded-sm border border-[#1a1815]/20 bg-white py-4 pl-12 pr-12 text-base text-[#12110f] outline-none placeholder:text-[#8e887d] focus:border-[#c65a24] focus:ring-2 focus:ring-[#c65a24]/25"
                />
                {query && <button type="button" onClick={() => setQuery("")} className="absolute right-3 top-1/2 min-h-10 -translate-y-1/2 rounded-full px-3 text-xs font-bold uppercase tracking-[0.13em] text-[#6e675e] hover:text-[#c65a24] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c65a24]">Clear</button>}
              </div>
              <button type="button" disabled className="min-h-14 rounded-full border border-[#1a1815]/15 px-5 text-xs font-bold uppercase tracking-[0.15em] text-[#837b70] disabled:cursor-not-allowed" title="Enable only after adding a clear geolocation consent flow">Use my location</button>
            </div>

            <div role="tablist" aria-label="Filter locations" className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
              {locationFilterOptions.map((filter) => {
                const active = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    id={`location-filter-${filter.id}`}
                    aria-selected={active}
                    aria-controls="location-results"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`min-h-11 shrink-0 rounded-full border px-4 text-xs font-bold uppercase tracking-[0.14em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c65a24] ${active ? "border-[#c65a24] bg-[#c65a24] text-white" : "border-[#1a1815]/15 bg-white text-[#5c554c] hover:border-[#c65a24]/60"}`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div id="location-results" role="tabpanel" aria-labelledby={`location-filter-${activeFilter}`} className="mt-8 grid gap-6 lg:grid-cols-[minmax(320px,0.84fr)_minmax(0,1.16fr)] lg:gap-8">
              <div className="space-y-4" aria-label="Location results">
                {filteredLocations.length ? (
                  filteredLocations.map((location, index) => {
                    const meta = statusMeta[location.status];
                    const selected = selectedLocation?.id === location.id;
                    return (
                      <article key={location.id} className={`overflow-hidden rounded-sm border bg-[#12110f] text-[#f5f1e8] transition duration-300 ${selected ? "border-[#c65a24] shadow-[0_18px_45px_rgba(51,23,9,0.18)]" : "border-[#2a2823] hover:border-[#6f3c25]"}`}>
                        <div className="relative h-40 overflow-hidden border-b border-white/10 sm:h-48">
                          {location.image ? (
                            <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 1024px) 100vw, 38vw" className="object-cover transition duration-700 hover:scale-105" />
                          ) : (
                            <div aria-label={`${location.name} image placeholder. Add image at ${location.imagePath}`} role="img" className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_72%_20%,rgba(215,106,44,0.48),transparent_17%),linear-gradient(125deg,#26160f_0%,#5d2d16_49%,#13100e_100%)]">
                              <span className="absolute -right-8 -top-14 h-48 w-48 rounded-full border border-[#e88b58]/35" />
                              <span className="absolute bottom-5 left-5 font-serif text-4xl italic text-white/90">The flame<br />awaits.</span>
                              <span className="absolute bottom-5 right-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">Image placeholder</span>
                            </div>
                          )}
                          <span className={`absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0e0e0d]/85 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur ${meta.text}`}><i aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />{meta.label}</span>
                        </div>
                        <div className="p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#e88b58]">{locationTypeLabel[location.type]}</p>
                              <h3 className="mt-2 font-serif text-3xl leading-none tracking-[-0.035em]">Karachi Flames<br /><span className="text-[#d7d1c6]">{location.name}</span></h3>
                            </div>
                            <span className="font-serif text-2xl text-white/25">0{index + 1}</span>
                          </div>
                          <p className="mt-4 text-sm leading-6 text-[#beb8ae]">{location.description}</p>
                          <dl className="mt-5 grid gap-4 border-t border-white/10 pt-5 text-sm sm:grid-cols-2">
                            <div>
                              <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8f897f]">Address</dt>
                              <dd className="mt-1.5 leading-5 text-[#f5f1e8]">{location.address.map((line) => <span key={line} className="block">{line}</span>)}</dd>
                            </div>
                            <div>
                              <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8f897f]">Hours</dt>
                              <dd className="mt-1.5 leading-5 text-[#f5f1e8]">{location.hours.slice(0, 2).map((hour) => <span key={hour.day} className="block">{hour.day}: {hour.time}</span>)}</dd>
                            </div>
                          </dl>
                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <button type="button" onClick={() => setSelectedLocationId(location.id)} className="min-h-11 rounded-full border border-white/20 px-4 text-xs font-bold uppercase tracking-[0.14em] transition hover:border-[#e88b58] hover:text-[#e88b58] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c]">Show on map</button>
                            {location.directionsUrl ? <Link href={location.directionsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-[#c65a24] px-4 text-xs font-bold uppercase tracking-[0.14em] transition hover:bg-[#d76a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f1e8]">Get directions <span aria-hidden="true" className="ml-2">↗</span></Link> : <span className="text-xs leading-5 text-[#9c968d]">Directions link ready to connect.</span>}
                            {location.orderUrl && <Link href={location.orderUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#e88b58]/60 px-4 text-xs font-bold uppercase tracking-[0.14em] text-[#f3c4ab] transition hover:bg-[#c65a24] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c]">Order now</Link>}
                          </div>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="rounded-sm border border-dashed border-[#1a1815]/25 bg-white p-8">
                    <p className="font-serif text-3xl">No locations found.</p>
                    <p className="mt-3 text-sm leading-6 text-[#615c54]">Try a different city, ZIP code, or location type.</p>
                    <button type="button" onClick={() => { setActiveFilter("all"); setQuery(""); }} className="mt-5 rounded-full bg-[#12110f] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c65a24]">Clear filters</button>
                  </div>
                )}
              </div>

              <div className="lg:sticky lg:top-6 lg:h-fit">
                <div className="overflow-hidden rounded-sm bg-[#12110f] p-3 shadow-[0_20px_65px_rgba(31,22,15,0.15)] sm:p-4">
                  <div className="relative h-[360px] overflow-hidden rounded-[2px] border border-white/10 bg-[#1b1d1b] sm:h-[430px]">
                    <div aria-hidden="true" className="absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(245,241,232,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,232,0.045)_1px,transparent_1px),radial-gradient(circle_at_18%_64%,rgba(198,90,36,0.22),transparent_23%),radial-gradient(circle_at_82%_24%,rgba(198,90,36,0.16),transparent_18%)] [background-size:64px_64px,64px_64px,auto,auto]" />
                    <div aria-hidden="true" className="absolute left-[-15%] top-[48%] h-[28%] w-[130%] -rotate-[15deg] border-y border-[#f5f1e8]/10 bg-[#f5f1e8]/[0.035]" />
                    <div aria-hidden="true" className="absolute left-[23%] top-[-10%] h-[125%] w-[19%] rotate-[34deg] border-x border-[#f5f1e8]/10 bg-[#f5f1e8]/[0.025]" />
                    <div aria-hidden="true" className="absolute bottom-5 left-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40"><span className="h-px w-7 bg-[#c65a24]" />Map integration ready</div>
                    {filteredLocations.map((location) => {
                      const isSelected = selectedLocation?.id === location.id;
                      return (
                        <button
                          key={location.id}
                          type="button"
                          onClick={() => setSelectedLocationId(location.id)}
                          aria-label={`Select ${location.name} on map`}
                          aria-pressed={isSelected}
                          style={{ left: `${location.mapPosition.x}%`, top: `${location.mapPosition.y}%` }}
                          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f1e8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#12110f]"
                        >
                          <span className={`relative flex h-10 w-10 items-center justify-center rounded-full border text-xs font-bold transition ${isSelected ? "border-[#f7b38e] bg-[#c65a24] text-white shadow-[0_0_0_8px_rgba(198,90,36,0.18)]" : "border-white/25 bg-[#12110f] text-[#f5f1e8] hover:border-[#e88b58]"}`}><span aria-hidden="true">✦</span></span>
                          <span className={`pointer-events-none absolute left-1/2 top-[calc(100%+10px)] w-max max-w-[130px] -translate-x-1/2 rounded-sm px-2 py-1.5 text-center text-[9px] font-bold uppercase tracking-[0.1em] transition ${isSelected ? "bg-[#f5f1e8] text-[#12110f]" : "bg-[#12110f]/80 text-white/60"}`}>{location.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  {selectedLocation && (
                    <div className="flex flex-col gap-4 px-2 pb-2 pt-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e88b58]">Selected location</p>
                        <p className="mt-1 font-serif text-2xl leading-tight text-[#f5f1e8]">{selectedLocation.name}</p>
                        <p className="mt-1 text-sm text-[#bdb7ad]">{selectedLocation.address.join(", ")}</p>
                      </div>
                      {selectedLocation.directionsUrl ? <Link href={selectedLocation.directionsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-[#e88b58]/70 px-4 text-xs font-bold uppercase tracking-[0.14em] text-[#f3c4ab] transition hover:bg-[#c65a24] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c]">Directions <span aria-hidden="true" className="ml-2">↗</span></Link> : <span className="text-xs text-[#a29b90]">Add a directions URL to activate.</span>}
                    </div>
                  )}
                </div>
                <p className="mt-3 text-xs leading-5 text-[#70695f]">A branded visual map shell is shown until a dark-styled Google Maps or Mapbox instance is connected. No API key is embedded.</p>
              </div>
            </div>
          </div>
        </section>

        {restaurantLocation && (
          <section className="border-y border-white/10 bg-[#10100f] py-16 sm:py-20 lg:py-28">
            <div className="mx-auto grid max-w-[1540px] gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(330px,0.94fr)] lg:items-stretch lg:gap-14 lg:px-12">
              <div className="relative min-h-[420px] overflow-hidden rounded-sm border border-white/10 bg-[radial-gradient(circle_at_70%_15%,rgba(215,106,44,0.42),transparent_19%),linear-gradient(135deg,#25140d_0%,#6c3519_48%,#12100f_100%)] sm:min-h-[560px]">
                {restaurantLocation.image ? (
                  <Image src={restaurantLocation.image} alt={restaurantLocation.imageAlt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
                ) : (
                  <>
                    <div aria-hidden="true" className="absolute -right-10 top-10 h-72 w-72 rounded-full border border-[#f4a275]/35 sm:h-[29rem] sm:w-[29rem]" />
                    <div aria-hidden="true" className="absolute bottom-0 left-[12%] h-[72%] w-px bg-gradient-to-t from-[#e88b58] to-transparent" />
                    <div aria-hidden="true" className="absolute bottom-[16%] left-[12%] h-px w-[70%] bg-gradient-to-r from-[#e88b58] to-transparent" />
                    <p className="absolute bottom-8 left-7 max-w-xs font-serif text-4xl leading-[0.9] tracking-[-0.04em] text-[#f5f1e8] sm:bottom-10 sm:left-10 sm:text-5xl">An exterior photo belongs here.</p>
                    <p className="absolute right-6 top-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">{restaurantLocation.imagePath}</p>
                  </>
                )}
              </div>
              <div className="flex flex-col py-2 lg:py-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e88b58]">Permanent location</p>
                <h2 className="mt-4 font-serif text-5xl leading-[0.88] tracking-[-0.05em] sm:text-6xl">Come to<br /><em className="font-normal text-[#e88b58]">the source.</em></h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-[#c1bbb1]">The full Karachi Flames location experience—address, hours, contact details, and visit information—in one thoughtful place.</p>

                <div className="mt-8 grid gap-6 border-y border-white/10 py-7 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#8e887f]">Address</p>
                    <p className="mt-2 text-sm leading-6 text-[#f5f1e8]">{restaurantLocation.address.map((line) => <span key={line} className="block">{line}</span>)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#8e887f]">Contact</p>
                    {restaurantLocation.phone ? <a href={`tel:${restaurantLocation.phone.replace(/[^+\d]/g, "")}`} className="mt-2 block text-sm text-[#f5f1e8] underline decoration-[#c65a24] underline-offset-4">{restaurantLocation.phone}</a> : <p className="mt-2 text-sm leading-6 text-[#c1bbb1]">Phone details coming soon.</p>}
                    {restaurantLocation.email && <a href={`mailto:${restaurantLocation.email}`} className="mt-2 block text-sm text-[#f5f1e8] underline decoration-[#c65a24] underline-offset-4">{restaurantLocation.email}</a>}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#8e887f]">Hours</p>
                  <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                    {restaurantLocation.hours.map((hour) => <div key={hour.day} className="flex justify-between gap-4 border-b border-white/[0.08] py-2 text-[#ded9d0]"><dt>{hour.day}</dt><dd className="text-right text-[#aaa399]">{hour.time}</dd></div>)}
                  </dl>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {restaurantLocation.features.length ? restaurantLocation.features.map((feature) => <span key={feature} className="rounded-full border border-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#d9d3c8]">{feature}</span>) : <span className="text-sm text-[#aaa399]">Confirmed service and accessibility details will appear here.</span>}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {restaurantLocation.directionsUrl && <Link href={restaurantLocation.directionsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-[#c65a24] px-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#d76a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f1e8]">Get directions <span aria-hidden="true" className="ml-2">↗</span></Link>}
                  {restaurantLocation.orderUrl && <Link href={restaurantLocation.orderUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-5 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-[#e88b58] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c]">Order now</Link>}
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="truck" className="scroll-mt-6 bg-[#c65a24] py-16 text-[#fff8f1] sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1540px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,1.08fr)] lg:items-center lg:gap-16 lg:px-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2b130a]/70">Food truck schedule</p>
              <h2 className="mt-4 max-w-xl font-serif text-6xl leading-[0.85] tracking-[-0.055em] sm:text-7xl">The flame is<br /><em className="font-normal">on the move.</em></h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#fff0e8]/85">Our food truck brings Karachi Flames to the streets. Check where we&apos;re serving next, then head our way.</p>
              <div className="mt-8 min-h-[220px] overflow-hidden rounded-sm border border-[#3e1a0b]/35 bg-[#210e07] p-6 sm:p-8">
                <div aria-hidden="true" className="relative h-[150px] overflow-hidden">
                  <span className="absolute bottom-4 left-0 h-[52px] w-[82%] rounded-l-md border-2 border-[#f3b18c]/85 bg-[#7d3116] shadow-[inset_0_-16px_0_rgba(0,0,0,0.17)]" />
                  <span className="absolute bottom-[54px] left-[8%] h-[44px] w-[32%] rounded-t-sm border-2 border-[#f3b18c]/85 bg-[#9d431e]" />
                  <span className="absolute bottom-[67px] left-[12%] h-[13px] w-[9%] rounded-sm bg-[#f9d2bb]/75" />
                  <span className="absolute bottom-[67px] left-[25%] h-[13px] w-[9%] rounded-sm bg-[#f9d2bb]/75" />
                  <span className="absolute bottom-[-1px] left-[12%] h-8 w-8 rounded-full border-4 border-[#f3b18c]/85 bg-[#1b0d08]" />
                  <span className="absolute bottom-[-1px] right-[27%] h-8 w-8 rounded-full border-4 border-[#f3b18c]/85 bg-[#1b0d08]" />
                  <span className="absolute bottom-[20px] left-[50%] text-[10px] font-bold uppercase tracking-[0.18em] text-[#f8c1a0]">Karachi Flames</span>
                  <span className="absolute right-[4%] top-2 font-serif text-4xl italic text-[#f7b38e]">On route.</span>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-[#3e1a0b]/35 bg-[#170b07] p-5 shadow-[0_24px_65px_rgba(69,24,7,0.24)] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2a77d]">Next truck stop</p>
                  <h3 className="mt-2 font-serif text-4xl leading-none tracking-[-0.035em]">{nextTruckStop.location}</h3>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] ${statusMeta[nextTruckStop.status].text}`}><i aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${statusMeta[nextTruckStop.status].dot}`} />{statusMeta[nextTruckStop.status].label}</span>
              </div>
              <dl className="grid gap-5 py-6 text-sm sm:grid-cols-3">
                <div><dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bd8165]">Date</dt><dd className="mt-2 text-[#fff8f1]">{nextTruckStop.date}</dd></div>
                <div><dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bd8165]">Time</dt><dd className="mt-2 text-[#fff8f1]">{nextTruckStop.time}</dd></div>
                <div><dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bd8165]">Address</dt><dd className="mt-2 leading-5 text-[#fff8f1]">{nextTruckStop.address}</dd></div>
              </dl>
              {nextTruckStop.note && <p className="border-t border-white/10 pt-5 text-sm leading-6 text-[#deb2a0]">{nextTruckStop.note}</p>}
              {nextTruckStop.directionsUrl ? <Link href={nextTruckStop.directionsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#f5f1e8] px-5 text-xs font-bold uppercase tracking-[0.15em] text-[#6c290f] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Get directions <span aria-hidden="true" className="ml-2">↗</span></Link> : <span className="mt-6 inline-flex min-h-12 items-center rounded-full border border-white/20 px-5 text-xs font-bold uppercase tracking-[0.15em] text-[#dba990]">Directions will appear once scheduled.</span>}

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#bd8165]">Upcoming schedule</p>
                <ol className="mt-3 divide-y divide-white/10">
                  {foodTruckSchedule.map((entry) => <li key={entry.id} className="flex items-start justify-between gap-4 py-3 text-sm"><div><p className="font-semibold text-[#fff8f1]">{entry.date} · {entry.location}</p><p className="mt-1 text-[#deb2a0]">{entry.time} · {entry.address}</p></div><span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[#f2a77d]">{statusMeta[entry.status].label}</span></li>)}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f1e8] py-16 text-[#12110f] sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 border-b border-[#1a1815]/15 pb-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a8481c]">Wherever you find us</p>
                <h2 className="mt-4 max-w-xl font-serif text-5xl leading-[0.88] tracking-[-0.05em] sm:text-6xl">Authentic flavor.<br /><em className="font-normal text-[#a8481c]">Real hospitality.</em></h2>
              </div>
              <div className="border-l-2 border-[#c65a24] pl-5 sm:pl-7">
                {halalLogoSrc ? <Image src={halalLogoSrc} alt="Hand-slaughtered Zabiha Halal" width={190} height={72} className="h-12 w-auto object-contain" /> : <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#a8481c]">Hand-slaughtered Zabiha Halal</p>}
                <p className="mt-3 max-w-2xl text-base leading-7 text-[#615c54]">Wherever you find Karachi Flames, you can expect the same commitment to bold flavor and Zabiha Halal quality.</p>
              </div>
            </div>

            <div className="grid divide-y divide-[#1a1815]/15 md:grid-cols-2 md:divide-x md:divide-y-0">
              {experiencePoints.map((point, index) => <article key={point.number} className={`py-8 ${index % 2 === 0 ? "md:pr-10" : "md:pl-10"} ${index > 1 ? "md:pt-10" : ""}`}><p className="text-[10px] font-bold tracking-[0.18em] text-[#c65a24]">{point.number}</p><h3 className="mt-4 font-serif text-3xl tracking-[-0.035em]">{point.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#615c54]">{point.copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#10100f] py-20 sm:py-24 lg:py-32">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_73%_58%,rgba(198,90,36,0.28),transparent_22%),linear-gradient(118deg,#10100f,#1d1510_60%,#10100f)]" />
          <div aria-hidden="true" className="absolute -right-20 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full border border-[#c65a24]/20" />
          <div className="mx-auto max-w-[1540px] px-5 text-center sm:px-8 lg:px-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e88b58]">Your next visit starts here</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-serif text-6xl leading-[0.86] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Ready for<br /><em className="font-normal text-[#e88b58]">some flame?</em></h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#c1bbb1]">Find your nearest Karachi Flames location and come taste authentic Karachi flavor.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/menu" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#c65a24] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#d76a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">View menu</Link>
              {locations.some((location) => location.orderUrl) && <Link href={locations.find((location) => location.orderUrl)?.orderUrl ?? "/"} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-[#e88b58] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c]">Order now</Link>}
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-white/10 bg-[#080808] py-10 sm:py-12">
        <div className="mx-auto grid max-w-[1540px] gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] lg:px-12">
          <div>
            <Link href="/" className="font-serif text-2xl uppercase tracking-[0.08em] text-[#f5f1e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c]">Karachi Flames</Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#a7a096]">Authentic Karachi flavor, fired with care.</p>
            <div className="mt-5">
              {halalLogoSrc ? <Image src={halalLogoSrc} alt="Hand-slaughtered Zabiha Halal" width={170} height={64} className="h-9 w-auto object-contain" /> : <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#d7a087]">Hand-slaughtered Zabiha Halal</p>}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e88b58]">Explore</p>
            <nav className="mt-4" aria-label="Footer navigation"><ul className="grid gap-3 text-sm text-[#c5beb3]">{navItems.map((item) => <li key={item.href}><Link href={item.href} aria-current={item.label === "Locations" ? "page" : undefined} className="transition hover:text-[#e88b58] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d76a2c]">{item.label}</Link></li>)}</ul></nav>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e88b58]">Visit & contact</p>
            <p className="mt-4 text-sm leading-6 text-[#c5beb3]">Restaurant hours and contact details will be listed here once confirmed.</p>
            <a href="#finder" className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.15em] text-[#f5f1e8] underline decoration-[#c65a24] underline-offset-8 transition hover:text-[#e88b58]">Find a location <span aria-hidden="true" className="ml-2">→</span></a>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1540px] flex-col gap-3 border-t border-white/10 px-5 pt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#716c64] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span>© Karachi Flames. All rights reserved.</span><span>Built for good food and good company.</span></div>
      </footer>

      <style jsx global>{`
        html { scroll-behavior: smooth; background: #080808; }
        body { margin: 0; background: #080808; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </main>
  );
}
