import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://karachiflames.com"; // TODO: replace with your live domain
const SITE_NAME = "Karachi Flames";
const SITE_DESCRIPTION =
  "Karachi Flames is a premium charcoal BBQ brand serving authentic, hand slaughtered Zabiha Halal seekh, boti and karahi — grilled the Karachi way. Order online or find a location near you.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Karachi Flames | Authentic Charcoal BBQ, Zabiha Halal",
    template: "%s | Karachi Flames",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Karachi Flames",
    "charcoal BBQ",
    "Zabiha Halal",
    "Halal BBQ",
    "Pakistani BBQ",
    "Karachi grill",
    "seekh kebab",
    "boti",
    "karahi",
    "halal restaurant",
    "BBQ catering",
  ],
  authors: [{ name: "Karachi Flames" }],
  creator: "Karachi Flames",
  publisher: "Karachi Flames",

  // Browser tab icon + home-screen icons — see notes below on where the
  // actual files should live.
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Karachi Flames | Authentic Charcoal BBQ, Zabiha Halal",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logo.png", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "Karachi Flames — Authentic Charcoal BBQ",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Karachi Flames | Authentic Charcoal BBQ, Zabiha Halal",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}