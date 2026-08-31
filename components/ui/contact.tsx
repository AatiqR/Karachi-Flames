"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

/*
 * KARACHI FLAMES — CONTACT PAGE
 *
 * Keep all editable business content and image paths in this block. No contact
 * details have been invented. Add the supplied image/logo paths to /public and
 * update the empty strings below when the final brand assets are available.
 */
const content = {
  eyebrow: "LET'S TALK",
  title: "WE'D LOVE TO HEAR FROM YOU.",
  description:
    "Questions about our food, locations, catering, or events? Reach out to the Karachi Flames team.",
  contactTitle: "HAVE A QUESTION?",
  contactDescription: "We're here to help, and we'd be delighted to hear from you.",
  formTitle: "SEND US A MESSAGE.",
  formDescription: "Tell us a little about what you need and the right member of our team will be in touch.",
  locationTitle: "COME FIND US.",
  locationDescription:
    "Want to visit us in person? Find your nearest Karachi Flames location.",
  cateringTitle: "PLANNING SOMETHING SPECIAL?",
  cateringDescription:
    "From intimate gatherings to large celebrations, bring Karachi Flames to your next event.",
  closingTitle: "LET'S TALK.",
  closingDescription:
    "Whether you have a question, an idea, or simply want to say hello, we're here.",
};

const contactInfo = {
  phone: "[PHONE NUMBER]",
  email: "[EMAIL ADDRESS]",
  address: "[ADDRESS]",
  hours: "[OPERATING HOURS]",
};

const assets = {
  // e.g. "/images/contact-fire.jpg" — leave empty to use the built-in art direction.
  heroImage: "",
  locationImage: "",
  // Use the supplied Hand-Slaughtered Zabiha Halal mark; it is intentionally not recreated here.
  halalLogo: "",
};

// Footer nav list — unchanged from before.
const navigation = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/location" },
  { label: "Catering", href: "/catering" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];


// Top navbar links — copied exactly from the Catering page navbar (no "Home").
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

type FieldName = "name" | "phone" | "email" | "message";
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = { name: "", phone: "", email: "", message: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.phone.trim()) errors.phone = "Please enter your phone number.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

function Visual({ src, alt, className }: { src: string; alt: string; className: string }) {
  if (src) {
    return (
      <Image
        className={className}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 760px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <div className={`${className} kf-art`} aria-label={alt} role="img">
      <span className="kf-art__sun" />
      <span className="kf-art__smoke kf-art__smoke--one" />
      <span className="kf-art__smoke kf-art__smoke--two" />
      <span className="kf-art__grill" />
      <span className="kf-art__ember kf-art__ember--one" />
      <span className="kf-art__ember kf-art__ember--two" />
      <span className="kf-art__ember kf-art__ember--three" />
      <span className="kf-art__caption">KARACHI · AFTER DARK</span>
    </div>
  );
}

/* ===== Navbar icon components — copied exactly from the Catering page ===== */

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

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  useEffect(() => {
    document.title = "Contact Us | Karachi Flames";
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute(
      "content",
      "Get in touch with Karachi Flames for questions about our menu, locations, catering, events, and more.",
    );
  }, []);

  // Body scroll lock while the mobile navbar drawer is open — from the Catering page navbar.
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

  const updateField = (field: FieldName, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    // TODO: Connect to backend/email service
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setStatus("success");
  };

  const contactItems = [
    { label: "Call us", value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
    { label: "Email us", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    {
      label: "Visit us",
      value: contactInfo.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`,
      external: true,
    },
    { label: "Hours", value: contactInfo.hours },
  ];

  return (
    <main className="kf-page">
      {/* ========================= NAVBAR (copied exactly from the Catering page) ========================= */}

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
              {navbarLinks.map((item) => {
                const active = item.href === "/contact";

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

        {/* ================= MOBILE MENU ================= */}

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
                  const active = item.href === "/contact";

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
                          transitionDelay: menuOpen ? `${index * 35}ms` : "0ms",
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

      {/* ========================= REST OF PAGE — UNCHANGED ========================= */}

      <section className="kf-hero" aria-labelledby="contact-heading">
        <div className="kf-grid kf-hero__grid">
          <div className="kf-hero__copy kf-reveal">
            <p className="kf-eyebrow"><span />{content.eyebrow}</p>
            <h1 id="contact-heading">{content.title}</h1>
            <p className="kf-intro">{content.description}</p>
            <a className="kf-scroll-link" href="#message-form"><span>Write to us</span><b>↓</b></a>
          </div>
          <div className="kf-hero__visual kf-reveal kf-reveal--delay">
            <Visual src={assets.heroImage} alt="Cinematic Karachi Flames restaurant visual" className="kf-visual-image" />
            <div className="kf-hero__stamp" aria-hidden="true"><span>EST.</span><strong>KF</strong><span>WITH FIRE</span></div>
            <p className="kf-vertical-note">AUTHENTIC KARACHI STYLE BBQ</p>
          </div>
        </div>
      </section>

      <section className="kf-contact" aria-labelledby="contact-experience-heading">
        <div className="kf-grid kf-contact__grid">
          <aside className="kf-contact__details">
            <p className="kf-eyebrow"><span />AT YOUR SERVICE</p>
            <h2 id="contact-experience-heading">{content.contactTitle}</h2>
            <p className="kf-body-copy">{content.contactDescription}</p>
            <div className="kf-details-list">
              {contactItems.map((item) => (
                <div className="kf-detail" key={item.label}>
                  <p>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>
                      <span>{item.value}</span><b aria-hidden="true">↗</b>
                    </a>
                  ) : <span className="kf-detail__plain">{item.value}</span>}
                </div>
              ))}
            </div>
            {assets.halalLogo && (
              <Image className="kf-halal" src={assets.halalLogo} alt="Hand-Slaughtered Zabiha Halal" width={116} height={60} />
            )}
          </aside>

          <div className="kf-form-panel" id="message-form">
            {status === "success" ? (
              <div className="kf-success" role="status" aria-live="polite" tabIndex={-1}>
                <span className="kf-success__mark">✓</span>
                <p className="kf-eyebrow"><span />MESSAGE RECEIVED</p>
                <h2>THANK YOU FOR REACHING OUT.</h2>
                <p>We&apos;ll get back to you soon.</p>
                <button type="button" onClick={() => { setValues(initialValues); setStatus("idle"); }}>Send another message <b>→</b></button>
              </div>
            ) : (
              <>
                <p className="kf-eyebrow"><span />YOUR NOTE</p>
                <h2>{content.formTitle}</h2>
                <p className="kf-body-copy">{content.formDescription}</p>
                <form noValidate onSubmit={handleSubmit} aria-describedby="form-notice">
                  <p id="form-notice" className="kf-visually-hidden">All fields are required.</p>
                  <div className="kf-field-row">
                    <div className={`kf-field ${errors.name ? "is-invalid" : ""}`}>
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" autoComplete="name" placeholder="Your name" value={values.name} onChange={(e) => updateField("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
                      {errors.name && <p id="name-error" className="kf-error" role="alert">{errors.name}</p>}
                    </div>
                    <div className={`kf-field ${errors.phone ? "is-invalid" : ""}`}>
                      <label htmlFor="phone">Phone</label>
                      <input id="phone" name="phone" autoComplete="tel" inputMode="tel" placeholder="Your phone number" value={values.phone} onChange={(e) => updateField("phone", e.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
                      {errors.phone && <p id="phone-error" className="kf-error" role="alert">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className={`kf-field ${errors.email ? "is-invalid" : ""}`}>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder="Your email address" value={values.email} onChange={(e) => updateField("email", e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
                    {errors.email && <p id="email-error" className="kf-error" role="alert">{errors.email}</p>}
                  </div>
                  <div className={`kf-field ${errors.message ? "is-invalid" : ""}`}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={5} placeholder="Tell us how we can help..." value={values.message} onChange={(e) => updateField("message", e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
                    {errors.message && <p id="message-error" className="kf-error" role="alert">{errors.message}</p>}
                  </div>
                  <button className="kf-button kf-button--full" type="submit" disabled={status === "sending"}>
                    <span>{status === "sending" ? "SENDING..." : "SEND MESSAGE"}</span><b aria-hidden="true">{status === "sending" ? "···" : "→"}</b>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="kf-find" aria-labelledby="find-heading">
        <div className="kf-grid kf-find__grid">
          <div className="kf-find__visual">
            <Visual src={assets.locationImage} alt="Karachi Flames location visual" className="kf-visual-image" />
            <span className="kf-map-pin" aria-hidden="true">●</span>
          </div>
          <div className="kf-find__copy">
            <p className="kf-eyebrow"><span />MEET US HERE</p>
            <h2 id="find-heading">{content.locationTitle}</h2>
            <p>{content.locationDescription}</p>
            <Link className="kf-button" href="/location"><span>FIND A LOCATION</span><b>→</b></Link>
          </div>
        </div>
      </section>

      <section className="kf-catering" aria-labelledby="catering-heading">
        <div className="kf-grid">
          <p className="kf-eyebrow"><span />EVENTS BY KARACHI FLAMES</p>
          <div className="kf-catering__layout">
            <h2 id="catering-heading">{content.cateringTitle}</h2>
            <div>
              <p>{content.cateringDescription}</p>
              <Link className="kf-text-link" href="/catering">EXPLORE CATERING <b>↗</b></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="kf-manifesto" aria-labelledby="manifesto-heading">
        <div className="kf-grid">
          <p className="kf-manifesto__kicker">KARACHI FLAMES / MADE FOR THE TABLE</p>
          <h2 id="manifesto-heading"><span>GOOD FOOD.</span><span>GOOD PEOPLE.</span><span>GOOD TIMES.</span></h2>
          <p>That&apos;s what Karachi Flames is all about.</p>
        </div>
      </section>

      <section className="kf-closing" aria-labelledby="closing-heading">
        <div className="kf-grid kf-closing__inner">
          <p className="kf-eyebrow"><span />THE DOOR IS OPEN</p>
          <h2 id="closing-heading">{content.closingTitle}</h2>
          <p>{content.closingDescription}</p>
          <a className="kf-button" href="#message-form"><span>SEND US A MESSAGE</span><b>↓</b></a>
        </div>
      </section>

      <footer className="kf-footer">
        <div className="kf-grid kf-footer__grid">
          <div><Link className="kf-wordmark" href="/" aria-label="Karachi Flames home"><span>KARACHI</span><strong>FLAMES</strong></Link></div>
          <nav aria-label="Footer navigation" className="kf-footer__nav">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <div className="kf-footer__contact">
            <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            <span>{contactInfo.address}</span>
          </div>
        </div>
        <div className="kf-grid kf-footer__bottom">
          <span>© {new Date().getFullYear()} KARACHI FLAMES</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </footer>

      <style jsx global>{`
        :root { --kf-black: #070707; --kf-charcoal: #0d0d0d; --kf-panel: #151515; --kf-warm: #f5f1e8; --kf-orange: #c65a24; --kf-orange-bright: #d66a2b; --kf-line: rgba(245, 241, 232, .18); }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; background: var(--kf-black); }
        body { margin: 0; background: var(--kf-black); color: var(--kf-warm); font-family: Arial, Helvetica, sans-serif; }
        button, input, textarea { font: inherit; }
        button { cursor: pointer; }
        a { color: inherit; text-decoration: none; }
        .kf-page { overflow: hidden; background: var(--kf-black); }
        .kf-grid { width: min(100% - 48px, 1320px); margin-inline: auto; }
        .kf-hero { position: relative; min-height: min(850px, 100svh); padding: 153px 0 74px; background: #090909; }
        .kf-hero::after { position: absolute; right: 0; bottom: 0; left: 0; height: 20%; background: linear-gradient(transparent, var(--kf-black)); content: ''; pointer-events: none; }
        .kf-hero__grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.03fr .97fr; gap: clamp(34px, 7vw, 118px); align-items: center; min-height: calc(min(850px, 100svh) - 227px); }
        .kf-hero__copy { max-width: 635px; padding-bottom: 4px; }
        .kf-eyebrow { display: flex; gap: 10px; align-items: center; margin: 0 0 24px; color: #e6d9c9; font-size: 10px; font-weight: 700; letter-spacing: .18em; line-height: 1.2; text-transform: uppercase; }
        .kf-eyebrow span { display: inline-block; width: 26px; height: 1px; background: var(--kf-orange-bright); }
        h1, h2, p { margin-top: 0; }
        h1, h2 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; }
        .kf-hero h1 { max-width: 610px; margin-bottom: 27px; font-size: clamp(52px, 7vw, 108px); letter-spacing: -.065em; line-height: .91; }
        .kf-intro { max-width: 425px; margin-bottom: 42px; color: rgba(245,241,232,.72); font-size: 16px; line-height: 1.65; }
        .kf-scroll-link { display: inline-flex; gap: 18px; align-items: center; border-bottom: 1px solid rgba(245,241,232,.35); padding-bottom: 10px; color: var(--kf-warm); font-size: 10px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; transition: border-color .2s, color .2s; }
        .kf-scroll-link b { color: var(--kf-orange-bright); font-size: 17px; font-weight: 400; transition: transform .2s ease; }
        .kf-scroll-link:hover { border-color: var(--kf-orange-bright); color: var(--kf-orange-bright); }
        .kf-scroll-link:hover b { transform: translateY(4px); }
        .kf-hero__visual { position: relative; height: clamp(380px, 51vw, 615px); min-height: 380px; }
        .kf-visual-image { position: absolute; inset: 0; width: 100%; height: 100%; }
        .kf-art { overflow: hidden; background: radial-gradient(ellipse at 72% 70%, #8d351b 0 2%, #38150d 18%, transparent 43%), linear-gradient(130deg, #111 6%, #20120e 56%, #080909); }
        .kf-art::after { position: absolute; inset: 0; background: linear-gradient(125deg, rgba(6,6,6,.48), transparent 42%, rgba(6,6,6,.22)), repeating-linear-gradient(110deg, transparent 0 9px, rgba(245,241,232,.025) 10px 11px); content: ''; mix-blend-mode: screen; }
        .kf-art__sun { position: absolute; top: 16%; right: 17%; width: 22%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, #f4a04b 0, #cb5925 24%, rgba(198,90,36,.45) 45%, transparent 69%); filter: blur(1px); opacity: .82; }
        .kf-art__smoke { position: absolute; width: 58%; height: 56%; border: 34px solid rgba(229,221,206,.09); border-radius: 46% 55% 38% 64%; filter: blur(15px); transform: rotate(-20deg); }
        .kf-art__smoke--one { top: 9%; left: -15%; }
        .kf-art__smoke--two { top: 32%; right: -24%; transform: rotate(18deg) scale(.72); }
        .kf-art__grill { position: absolute; bottom: -10%; left: -12%; width: 125%; height: 44%; border-top: 3px solid rgba(245,241,232,.44); background: repeating-linear-gradient(109deg, transparent 0 28px, rgba(245,241,232,.26) 29px 31px); transform: perspective(350px) rotateX(64deg) rotateZ(-5deg); }
        .kf-art__ember { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: #fcac56; box-shadow: 0 0 12px #ea6025; }
        .kf-art__ember--one { top: 39%; left: 54%; }.kf-art__ember--two { top: 61%; left: 34%; width: 3px; height: 3px; }.kf-art__ember--three { top: 27%; left: 70%; width: 3px; height: 3px; }
        .kf-art__caption { position: absolute; z-index: 1; right: 23px; bottom: 21px; color: rgba(245,241,232,.75); font-size: 8px; font-weight: 700; letter-spacing: .18em; }
        .kf-hero__visual::after { position: absolute; inset: 10px; border: 1px solid rgba(245,241,232,.15); content: ''; pointer-events: none; }
        .kf-hero__stamp { position: absolute; z-index: 2; bottom: -30px; left: -29px; display: grid; place-items: center; width: 112px; height: 112px; border: 1px solid rgba(245,241,232,.55); border-radius: 50%; background: var(--kf-black); color: var(--kf-warm); text-align: center; }
        .kf-hero__stamp strong { display: block; color: var(--kf-orange-bright); font-family: Georgia, 'Times New Roman', serif; font-size: 32px; font-weight: 400; line-height: .9; }
        .kf-hero__stamp span { font-size: 7px; font-weight: 700; letter-spacing: .13em; }
        .kf-vertical-note { position: absolute; top: 30px; right: -34px; margin: 0; color: rgba(245,241,232,.48); font-size: 8px; font-weight: 700; letter-spacing: .16em; writing-mode: vertical-rl; }
        .kf-reveal { animation: kf-enter .8s cubic-bezier(.22,1,.36,1) both; }.kf-reveal--delay { animation-delay: .13s; }
        @keyframes kf-enter { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .kf-contact { padding: clamp(92px, 12vw, 180px) 0; background: var(--kf-black); }
        .kf-contact__grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: clamp(46px, 10vw, 160px); align-items: start; }
        .kf-contact h2, .kf-form-panel h2 { margin-bottom: 17px; font-size: clamp(39px, 4.2vw, 65px); letter-spacing: -.06em; line-height: .94; }
        .kf-body-copy { max-width: 390px; color: rgba(245,241,232,.64); font-size: 15px; line-height: 1.7; }
        .kf-details-list { margin-top: 58px; border-top: 1px solid var(--kf-line); }
        .kf-detail { padding: 18px 0 19px; border-bottom: 1px solid var(--kf-line); }
        .kf-detail p { margin: 0 0 8px; color: rgba(245,241,232,.48); font-size: 9px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .kf-detail a { display: inline-flex; justify-content: space-between; width: 100%; gap: 16px; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(16px, 1.55vw, 21px); line-height: 1.25; transition: color .2s; }
        .kf-detail a b { color: var(--kf-orange-bright); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; transition: transform .2s; }
        .kf-detail a:hover { color: var(--kf-orange-bright); }.kf-detail a:hover b { transform: translate(4px, -4px); }
        .kf-detail__plain { display: block; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(16px, 1.55vw, 21px); line-height: 1.25; }
        .kf-halal { display: block; width: auto; height: auto; margin-top: 44px; opacity: .85; }
        .kf-form-panel { position: relative; padding: clamp(30px, 4.5vw, 66px); background: var(--kf-panel); }
        .kf-form-panel::before { position: absolute; top: 0; right: 0; width: 90px; height: 1px; background: var(--kf-orange-bright); content: ''; }
        .kf-form-panel form { margin-top: 41px; }
        .kf-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .kf-field { position: relative; margin-bottom: 30px; }
        .kf-field label { display: block; margin-bottom: 11px; color: #ede3d7; font-size: 9px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .kf-field input, .kf-field textarea { display: block; width: 100%; border: 0; border-bottom: 1px solid rgba(245,241,232,.28); border-radius: 0; outline: 0; background: transparent; padding: 0 0 13px; color: var(--kf-warm); font-size: 15px; line-height: 1.4; transition: border-color .2s, box-shadow .2s; }
        .kf-field textarea { min-height: 118px; resize: vertical; }
        .kf-field input::placeholder, .kf-field textarea::placeholder { color: rgba(245,241,232,.38); }
        .kf-field input:hover, .kf-field textarea:hover { border-color: rgba(245,241,232,.62); }
        .kf-field input:focus, .kf-field textarea:focus { border-color: var(--kf-orange-bright); box-shadow: 0 8px 15px -13px var(--kf-orange-bright); }
        .kf-field.is-invalid input, .kf-field.is-invalid textarea { border-color: #e78064; }
        .kf-error { display: flex; gap: 7px; align-items: center; margin: 8px 0 0; color: #f4a791; font-size: 11px; line-height: 1.35; }.kf-error::before { content: '!'; display: grid; place-items: center; width: 13px; height: 13px; border: 1px solid currentColor; border-radius: 50%; font-size: 9px; font-weight: 700; }
        .kf-button { display: inline-flex; gap: 25px; align-items: center; justify-content: space-between; min-height: 53px; border: 1px solid var(--kf-orange-bright); background: var(--kf-orange-bright); padding: 0 20px; color: var(--kf-black); font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; transition: background .25s, color .25s, transform .25s; }
        .kf-button b { font-size: 19px; font-weight: 400; transition: transform .25s; }.kf-button:hover { background: transparent; color: var(--kf-warm); }.kf-button:hover b { transform: translateX(5px); }.kf-button:disabled { cursor: wait; opacity: .72; }.kf-button:disabled:hover { background: var(--kf-orange-bright); color: var(--kf-black); }.kf-button:disabled b { transform: none; }
        .kf-button--full { width: 100%; margin-top: 3px; }
        .kf-success { display: grid; place-items: start; min-height: 462px; align-content: center; outline: none; }.kf-success__mark { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 25px; border: 1px solid var(--kf-orange-bright); border-radius: 50%; color: var(--kf-orange-bright); font-size: 20px; }.kf-success h2 { max-width: 420px; margin-bottom: 14px; font-size: clamp(40px, 5vw, 60px); letter-spacing: -.06em; line-height: .93; }.kf-success > p:not(.kf-eyebrow) { margin-bottom: 33px; color: rgba(245,241,232,.68); }.kf-success button { border: 0; border-bottom: 1px solid var(--kf-orange-bright); background: transparent; padding: 0 0 8px; color: var(--kf-warm); font-size: 10px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }.kf-success button b { margin-left: 14px; color: var(--kf-orange-bright); font-size: 17px; }
        .kf-find { padding: clamp(80px, 10vw, 150px) 0; background: #ece7dc; color: #111; }.kf-find__grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: clamp(40px, 9vw, 140px); align-items: center; }.kf-find__visual { position: relative; height: clamp(290px, 42vw, 540px); overflow: hidden; background: #1c1713; }.kf-find__visual .kf-art { filter: saturate(.6) contrast(1.15); }.kf-find__visual::after { position: absolute; inset: 17px; border: 1px solid rgba(245,241,232,.28); content: ''; pointer-events: none; }.kf-map-pin { position: absolute; z-index: 2; top: 50%; left: 54%; display: grid; place-items: center; width: 42px; height: 42px; border: 1px solid var(--kf-orange-bright); border-radius: 50% 50% 50% 0; background: var(--kf-orange-bright); color: var(--kf-warm); font-size: 16px; transform: rotate(-45deg); }.kf-map-pin::first-letter { transform: rotate(45deg); }.kf-find .kf-eyebrow { color: #4e443c; }.kf-find h2 { margin-bottom: 21px; font-size: clamp(47px, 5.5vw, 82px); letter-spacing: -.075em; line-height: .9; }.kf-find__copy > p:not(.kf-eyebrow) { max-width: 355px; margin-bottom: 34px; color: #514a44; font-size: 16px; line-height: 1.65; }.kf-find .kf-button:hover { color: #111; }
        .kf-catering { padding: clamp(80px, 10vw, 150px) 0; background: #14100e; }.kf-catering__layout { display: grid; grid-template-columns: 1.15fr .65fr; gap: clamp(44px, 10vw, 180px); align-items: end; }.kf-catering h2 { max-width: 700px; margin: 0; font-size: clamp(48px, 6vw, 92px); letter-spacing: -.075em; line-height: .9; }.kf-catering__layout p { margin-bottom: 29px; color: rgba(245,241,232,.7); font-size: 16px; line-height: 1.65; }.kf-text-link { display: inline-flex; gap: 15px; border-bottom: 1px solid var(--kf-orange-bright); padding-bottom: 10px; color: var(--kf-warm); font-size: 10px; font-weight: 700; letter-spacing: .14em; }.kf-text-link b { color: var(--kf-orange-bright); font-size: 15px; transition: transform .2s; }.kf-text-link:hover b { transform: translate(4px,-4px); }
        .kf-manifesto { position: relative; padding: clamp(100px, 15vw, 230px) 0; background: radial-gradient(circle at 70% 55%, rgba(198,90,36,.25), transparent 28%), #070707; }.kf-manifesto::before { position: absolute; top: 10%; left: 11%; width: 29vw; max-width: 400px; aspect-ratio: 1; border: 1px solid rgba(245,241,232,.1); border-radius: 50%; content: ''; }.kf-manifesto__kicker { position: relative; margin-bottom: 28px; color: var(--kf-orange-bright); font-size: 9px; font-weight: 700; letter-spacing: .16em; }.kf-manifesto h2 { position: relative; max-width: 940px; margin-bottom: 27px; font-size: clamp(48px, 8vw, 124px); letter-spacing: -.08em; line-height: .79; }.kf-manifesto h2 span { display: block; }.kf-manifesto h2 span:nth-child(2) { padding-left: min(9vw, 136px); color: rgba(245,241,232,.72); }.kf-manifesto h2 span:nth-child(3) { padding-left: min(3.5vw, 54px); color: var(--kf-orange-bright); }.kf-manifesto > .kf-grid > p:last-child { position: relative; margin: 0; color: rgba(245,241,232,.63); font-size: 15px; }
        .kf-closing { padding: clamp(84px, 12vw, 180px) 0; background: var(--kf-warm); color: #14110f; text-align: center; }.kf-closing__inner { display: grid; place-items: center; max-width: 765px; }.kf-closing .kf-eyebrow { color: #49413b; }.kf-closing h2 { margin-bottom: 18px; font-size: clamp(62px, 9vw, 130px); letter-spacing: -.09em; line-height: .8; }.kf-closing__inner > p:not(.kf-eyebrow) { max-width: 450px; margin-bottom: 35px; color: #4c453f; font-size: 16px; line-height: 1.65; }
        .kf-footer { padding: 62px 0 23px; background: #090909; }.kf-footer__grid { display: grid; grid-template-columns: .7fr 1fr 1fr; gap: 36px; padding-bottom: 61px; }.kf-footer__nav { display: grid; grid-template-columns: 1fr 1fr; gap: 13px 20px; }.kf-footer__nav a, .kf-footer__contact a, .kf-footer__contact span { color: rgba(245,241,232,.65); font-size: 11px; line-height: 1.4; transition: color .2s; }.kf-footer__nav a:hover, .kf-footer__contact a:hover { color: var(--kf-orange-bright); }.kf-footer__contact { display: grid; justify-items: start; gap: 10px; }.kf-footer__bottom { display: flex; justify-content: space-between; border-top: 1px solid var(--kf-line); padding-top: 20px; color: rgba(245,241,232,.4); font-size: 8px; font-weight: 700; letter-spacing: .12em; }
        .kf-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
        @media (max-width: 760px) { .kf-grid { width: min(100% - 32px, 1320px); }.kf-hero { min-height: auto; padding: 127px 0 65px; }.kf-hero__grid, .kf-contact__grid, .kf-find__grid, .kf-catering__layout, .kf-footer__grid { grid-template-columns: 1fr; }.kf-hero__grid { gap: 47px; }.kf-hero__copy { padding: 0; }.kf-hero h1 { font-size: clamp(48px, 14vw, 71px); }.kf-intro { margin-bottom: 31px; font-size: 15px; }.kf-hero__visual { height: 96vw; min-height: 330px; max-height: 500px; margin-left: 8vw; }.kf-hero__stamp { bottom: -22px; left: -19px; width: 88px; height: 88px; }.kf-hero__stamp strong { font-size: 26px; }.kf-hero__stamp span { font-size: 6px; }.kf-vertical-note { right: -24px; }.kf-contact { padding: 93px 0; }.kf-contact__grid { gap: 64px; }.kf-details-list { margin-top: 39px; }.kf-form-panel { margin-inline: -16px; padding: 38px 24px; }.kf-field-row { grid-template-columns: 1fr; gap: 0; }.kf-field { margin-bottom: 28px; }.kf-field input, .kf-field textarea { font-size: 16px; }.kf-find { padding: 72px 0; }.kf-find__grid { gap: 40px; }.kf-find__visual { height: 81vw; }.kf-find__copy { padding-right: 20px; }.kf-catering { padding: 78px 0; }.kf-catering__layout { gap: 32px; }.kf-catering h2 { font-size: clamp(48px, 14vw, 72px); }.kf-manifesto { padding: 110px 0; }.kf-manifesto h2 { font-size: clamp(47px, 13.5vw, 70px); line-height: .84; }.kf-manifesto h2 span:nth-child(2) { padding-left: 8vw; }.kf-manifesto h2 span:nth-child(3) { padding-left: 2vw; }.kf-closing { padding: 88px 0; }.kf-closing h2 { font-size: clamp(63px, 19vw, 94px); }.kf-footer { padding-top: 49px; }.kf-footer__grid { gap: 37px; padding-bottom: 46px; }.kf-footer__nav { max-width: 350px; }.kf-footer__bottom { gap: 12px; align-items: flex-start; font-size: 7px; }.kf-success { min-height: 470px; } }
        @media (max-width: 370px) { .kf-grid { width: min(100% - 28px, 1320px); }.kf-hero__visual { margin-left: 6vw; }.kf-form-panel { margin-inline: -14px; padding: 33px 20px; }.kf-hero h1 { font-size: 47px; }.kf-find h2 { font-size: 45px; }.kf-detail a, .kf-detail__plain { font-size: 16px; } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
      `}</style>
    </main>
  );
}