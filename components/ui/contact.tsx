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

// Web3Forms — form submissions go straight to your inbox, no backend needed.
// Get/replace this key at https://web3forms.com if you ever need a new one.
const WEB3FORMS_ACCESS_KEY = "e87a4e60-2501-4887-b07b-6efc58f51748";

const content = {
  contactTitle: "HAVE A QUESTION?",
  contactDescription: "We're here to help, and we'd be delighted to hear from you.",
  formTitle: "SEND US A MESSAGE.",
  formDescription: "Tell us a little about what you need and the right member of our team will be in touch.",
  reviewsTitle: "WHAT OUR GUESTS ARE SAYING.",
  reviewsDescription:
    "See what people are saying about Karachi Flames, and let us know about your own visit.",
};

const contactInfo = {
  phone: "443-430-5800",
  email: "Karachiflamesdmv@gmail.com",
  address: "8411 Baltimore National Pike, Ellicott City, MD, 21043",
  hours: (
    <>
      Monday – Thursday: Closed
      <br />
      Friday – Saturday: 4 PM – 12 AM
      <br />
      Sunday: 4 PM – 11 PM
    </>
  ),
};
const assets = {
  // Use the supplied Hand-Slaughtered Zabiha Halal mark; it is intentionally not recreated here.
  halalLogo: "",
};

/*
 * REVIEWS — TODO: connect to the Karachi Flames Google Business Profile.
 * Once the profile's Place ID is available, replace the two placeholder
 * URLs below:
 *   - googleReviewsUrl: link to the profile's reviews tab
 *       e.g. "https://search.google.com/local/reviews?placeid=YOUR_PLACE_ID"
 *   - leaveReviewUrl: link that opens the "write a review" flow
 *       e.g. "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
 */
const reviewsLinks = {
  googleReviewsUrl: "",
  leaveReviewUrl: "",
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
type SubmitStatus = "idle" | "sending" | "success" | "error";

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

/* ===== 3D-style flame icon — used in place of the arrow on the contact detail rows ===== */

function FlameIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
    >
      <defs>
        <linearGradient id="kfFlameOuter" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B83D08" />
          <stop offset="45%" stopColor="#D4600E" />
          <stop offset="100%" stopColor="#F0A040" />
        </linearGradient>
        <linearGradient id="kfFlameInner" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#E08A2B" />
          <stop offset="100%" stopColor="#FFD98A" />
        </linearGradient>
      </defs>
      <path
        d="M12.5 2c.3 2.1-.6 3.4-1.9 4.7-1.6 1.6-3.4 3.4-3.4 6.2a4.8 4.8 0 0 0 4.8 4.8 4.4 4.4 0 0 0 4.4-4.4c0-1-.3-1.8-.7-2.6.9.4 1.6 1.1 2.1 2 .6 1 .9 2.2.7 3.5-.4 3-3 5.3-6.5 5.3A7.4 7.4 0 0 1 4.6 14a8 8 0 0 1 2-5.3c1-1.2 2.3-2.1 3.1-3.4.6-1 .9-2.1.8-3.3Z"
        fill="url(#kfFlameOuter)"
        stroke="#8A2C05"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      <path
        d="M12.1 9.6c.2 1-.3 1.7-1 2.4-.7.8-1.4 1.6-1.4 2.7a2.4 2.4 0 0 0 2.4 2.4 2.2 2.2 0 0 0 2.1-2.9c.5.4.8.9.8 1.6 0 1.3-1.1 2.4-2.6 2.4a3.3 3.3 0 0 1-3.3-3.3c0-1.6.9-2.7 1.8-3.6.5-.5 1-1 1.2-1.7Z"
        fill="url(#kfFlameInner)"
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

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.6L12 16.9l-5.9 3.5 1.3-6.6-4.9-4.5 6.6-.7L12 2.5Z" />
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
  const [status, setStatus] = useState<SubmitStatus>("idle");

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
      "Get in touch with Karachi Flames for questions, feedback, and reviews.",
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

  // ===== Web3Forms submission =====
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("message", values.message);
      // Nice-to-haves so the email you receive is easy to scan and reply to.
      formData.append("subject", `New website message from ${values.name}`);
      formData.append("from_name", "Karachi Flames Website");
      formData.append("replyto", values.email);
      // Honeypot field — leave this out of the visible UI; if a bot fills it,
      // Web3Forms silently discards the submission.
      formData.append("botcheck", "");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setValues(initialValues);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
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
              href="/order"
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
                href="/order"
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

      {/* ========================= HAVE A QUESTION? / SEND US A MESSAGE ========================= */}

      <section className="kf-contact kf-contact--top" aria-labelledby="contact-experience-heading">
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
                      <span>{item.value}</span><FlameIcon aria-hidden="true" className="kf-detail__flame" />
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

                  {status === "error" && (
                    <p className="kf-error kf-error--form" role="alert">
                      Something went wrong sending your message. Please try again, or call us at{" "}
                      <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>.
                    </p>
                  )}

                  <button className="kf-button kf-button--full" type="submit" disabled={status === "sending"}>
                    <span>{status === "sending" ? "SENDING..." : "SEND MESSAGE"}</span><b aria-hidden="true">{status === "sending" ? "···" : "→"}</b>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ========================= REVIEWS ========================= */}

      <section className="kf-reviews" aria-labelledby="reviews-heading">
        <div className="kf-grid kf-reviews__inner">
          <p className="kf-eyebrow"><span />TOLD BY OUR GUESTS</p>
          <div className="kf-reviews__stars" aria-hidden="true">
            <StarIcon className="kf-reviews__star" />
            <StarIcon className="kf-reviews__star" />
            <StarIcon className="kf-reviews__star" />
            <StarIcon className="kf-reviews__star" />
            <StarIcon className="kf-reviews__star" />
          </div>
          <h2 id="reviews-heading">{content.reviewsTitle}</h2>
          <p>{content.reviewsDescription}</p>
          <div className="kf-reviews__actions">
            {/* TODO: point these at the real Google Business Profile links — see reviewsLinks above */}
            <a
              className="kf-button"
              href={reviewsLinks.googleReviewsUrl || "#"}
              target={reviewsLinks.googleReviewsUrl ? "_blank" : undefined}
              rel={reviewsLinks.googleReviewsUrl ? "noreferrer" : undefined}
            >
              <span>READ OUR GOOGLE REVIEWS</span><b>↗</b>
            </a>
            <a
              className="kf-button kf-button--ghost"
              href={reviewsLinks.leaveReviewUrl || "#"}
              target={reviewsLinks.leaveReviewUrl ? "_blank" : undefined}
              rel={reviewsLinks.leaveReviewUrl ? "noreferrer" : undefined}
            >
              <span>LEAVE A REVIEW</span><b>↗</b>
            </a>
          </div>
        </div>
      </section>

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
      
    </div>

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
        .kf-eyebrow { display: flex; gap: 10px; align-items: center; margin: 0 0 24px; color: #e6d9c9; font-size: 10px; font-weight: 700; letter-spacing: .18em; line-height: 1.2; text-transform: uppercase; }
        .kf-eyebrow span { display: inline-block; width: 26px; height: 1px; background: var(--kf-orange-bright); }
        h1, h2, p { margin-top: 0; }
        h1, h2 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; }
        .kf-contact { padding: clamp(150px, 15vw, 220px) 0 clamp(92px, 12vw, 180px); background: var(--kf-black); }
        .kf-contact--top { padding-top: clamp(150px, 16vw, 230px); }
        .kf-contact__grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: clamp(46px, 10vw, 160px); align-items: start; }
        .kf-contact h2, .kf-form-panel h2 { margin-bottom: 17px; font-size: clamp(39px, 4.2vw, 65px); letter-spacing: -.06em; line-height: .94; }
        .kf-body-copy { max-width: 390px; color: rgba(245,241,232,.64); font-size: 15px; line-height: 1.7; }
        .kf-details-list { margin-top: 58px; border-top: 1px solid var(--kf-line); }
        .kf-detail { padding: 18px 0 19px; border-bottom: 1px solid var(--kf-line); }
        .kf-detail p { margin: 0 0 8px; color: rgba(245,241,232,.48); font-size: 9px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .kf-detail a { display: inline-flex; justify-content: space-between; align-items: center; width: 100%; gap: 16px; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(16px, 1.55vw, 21px); line-height: 1.25; transition: color .2s; }
        .kf-detail__flame { width: 20px; height: 20px; flex-shrink: 0; filter: drop-shadow(0 2px 4px rgba(216,90,20,0.45)); transition: transform .25s ease, filter .25s ease; }
        .kf-detail a:hover { color: var(--kf-orange-bright); }
        .kf-detail a:hover .kf-detail__flame { transform: translateY(-3px) scale(1.12) rotate(-4deg); filter: drop-shadow(0 6px 10px rgba(216,90,20,0.65)); }
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
        .kf-error { display: flex; gap: 7px; align-items: center; margin: 8px 0 0; color: #f4a791; font-size: 11px; line-height: 1.35; }.kf-error::before { content: '!'; display: grid; place-items: center; width: 13px; height: 13px; border: 1px solid currentColor; border-radius: 50%; font-size: 9px; font-weight: 700; flex-shrink: 0; }
        .kf-error--form { margin-bottom: 20px; }
        .kf-error--form a { color: inherit; text-decoration: underline; }
        .kf-button { display: inline-flex; gap: 25px; align-items: center; justify-content: space-between; min-height: 53px; border: 1px solid var(--kf-orange-bright); background: var(--kf-orange-bright); padding: 0 20px; color: var(--kf-black); font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; transition: background .25s, color .25s, transform .25s; }
        .kf-button b { font-size: 19px; font-weight: 400; transition: transform .25s; }.kf-button:hover { background: transparent; color: var(--kf-warm); }.kf-button:hover b { transform: translateX(5px); }.kf-button:disabled { cursor: wait; opacity: .72; }.kf-button:disabled:hover { background: var(--kf-orange-bright); color: var(--kf-black); }.kf-button:disabled b { transform: none; }
        .kf-button--full { width: 100%; margin-top: 3px; }
        .kf-button--ghost { background: transparent; color: var(--kf-warm); }.kf-button--ghost:hover { background: var(--kf-orange-bright); color: var(--kf-black); }
        .kf-success { display: grid; place-items: start; min-height: 462px; align-content: center; outline: none; }.kf-success__mark { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 25px; border: 1px solid var(--kf-orange-bright); border-radius: 50%; color: var(--kf-orange-bright); font-size: 20px; }.kf-success h2 { max-width: 420px; margin-bottom: 14px; font-size: clamp(40px, 5vw, 60px); letter-spacing: -.06em; line-height: .93; }.kf-success > p:not(.kf-eyebrow) { margin-bottom: 33px; color: rgba(245,241,232,.68); }.kf-success button { border: 0; border-bottom: 1px solid var(--kf-orange-bright); background: transparent; padding: 0 0 8px; color: var(--kf-warm); font-size: 10px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }.kf-success button b { margin-left: 14px; color: var(--kf-orange-bright); font-size: 17px; }
        .kf-reviews { padding: clamp(80px, 11vw, 160px) 0; background: #ece7dc; color: #111; text-align: center; }
        .kf-reviews__inner { display: grid; place-items: center; max-width: 720px; }
        .kf-reviews .kf-eyebrow { color: #4e443c; }
        .kf-reviews__stars { display: flex; gap: 6px; margin-bottom: 22px; }
        .kf-reviews__star { width: 20px; height: 20px; color: var(--kf-orange-bright); }
        .kf-reviews h2 { margin-bottom: 18px; font-size: clamp(46px, 6vw, 82px); letter-spacing: -.07em; line-height: .92; }
        .kf-reviews__inner > p:not(.kf-eyebrow) { max-width: 460px; margin-bottom: 38px; color: #514a44; font-size: 16px; line-height: 1.65; }
        .kf-reviews__actions { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
        .kf-reviews .kf-button:hover { color: #111; }
        .kf-footer { padding: 62px 0 23px; background: #090909; }.kf-footer__grid { display: grid; grid-template-columns: .7fr 1fr 1fr; gap: 36px; padding-bottom: 61px; }.kf-footer__nav { display: grid; grid-template-columns: 1fr 1fr; gap: 13px 20px; }.kf-footer__nav a, .kf-footer__contact a, .kf-footer__contact span { color: rgba(245,241,232,.65); font-size: 11px; line-height: 1.4; transition: color .2s; }.kf-footer__nav a:hover, .kf-footer__contact a:hover { color: var(--kf-orange-bright); }.kf-footer__contact { display: grid; justify-items: start; gap: 10px; }.kf-footer__bottom { display: flex; justify-content: space-between; border-top: 1px solid var(--kf-line); padding-top: 20px; color: rgba(245,241,232,.4); font-size: 8px; font-weight: 700; letter-spacing: .12em; }
        .kf-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
        @media (max-width: 760px) { .kf-grid { width: min(100% - 32px, 1320px); }.kf-contact__grid, .kf-footer__grid { grid-template-columns: 1fr; }.kf-contact { padding: 127px 0 93px; }.kf-contact__grid { gap: 64px; }.kf-details-list { margin-top: 39px; }.kf-form-panel { margin-inline: -16px; padding: 38px 24px; }.kf-field-row { grid-template-columns: 1fr; gap: 0; }.kf-field { margin-bottom: 28px; }.kf-field input, .kf-field textarea { font-size: 16px; }.kf-reviews { padding: 78px 0; }.kf-reviews h2 { font-size: clamp(42px, 12vw, 60px); }.kf-reviews__actions { flex-direction: column; width: 100%; }.kf-reviews__actions .kf-button { width: 100%; justify-content: center; }.kf-footer { padding-top: 49px; }.kf-footer__grid { gap: 37px; padding-bottom: 46px; }.kf-footer__nav { max-width: 350px; }.kf-footer__bottom { gap: 12px; align-items: flex-start; font-size: 7px; }.kf-success { min-height: 470px; } }
        @media (max-width: 370px) { .kf-grid { width: min(100% - 28px, 1320px); }.kf-form-panel { margin-inline: -14px; padding: 33px 20px; }.kf-detail a, .kf-detail__plain { font-size: 16px; } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
      `}</style>
    </main>
  );
}