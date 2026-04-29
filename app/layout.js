import "./globals.css";
import JsonLd from "./components/JsonLd";
import { Analytics } from "@vercel/analytics/next";

/* ── 1. Full Next.js Metadata Object ── */
export const metadata = {
  // IMPORTANT: Pointing to your live Vercel URL so Google indexes the right site!
  metadataBase: new URL("https://versatiledotmovportfolio.vercel.app"),

  title: {
    default: "versatileDOTmov | Harish Sontakke — Motion Graphics & Video Editor",
    template: "%s | versatileDOTmov",
  },

  description:
    "Harish Sontakke is a freelance motion graphics artist and video editor specialising in SaaS ad creatives, product demos, and paid social campaigns using After Effects, Premiere Pro & DaVinci Resolve.",

  keywords: [
    "motion graphics artist",
    "video editor",
    "SaaS ad creative",
    "freelance video editor India",
    "After Effects editor",
    "Premiere Pro editor",
    "DaVinci Resolve editor",
    "motion design portfolio",
    "ad creative editor",
    "product demo video",
    "paid social video ads",
    "scroll-stopping ad creatives",
    "SaaS video editing",
    "video editor Maharashtra India",
    "versatileDOTmov",
    "Harish Sontakke",
  ],

  authors: [
    { name: "Harish Sontakke", url: "https://versatiledotmovportfolio.vercel.app" },
  ],
  creator: "Harish Sontakke",
  publisher: "versatileDOTmov",

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://versatiledotmovportfolio.vercel.app",
    siteName: "versatileDOTmov",
    title: "Harish Sontakke — Motion Graphics & Video Editor | versatileDOTmov",
    description:
      "Freelance motion graphics artist & video editor crafting high-converting SaaS ad creatives, product demos, and paid social campaigns.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "versatileDOTmov — Motion Graphics & Video Editing Portfolio",
        type: "image/png",
      },
    ],
  },

  /* ── Twitter / X ── */
  twitter: {
    card: "summary_large_image",
    title: "Harish Sontakke — Motion Graphics & Video Editor",
    description:
      "Scroll-stopping SaaS ad creatives, product demos & paid social videos. After Effects · Premiere Pro · DaVinci Resolve.",
    images: ["/og-image.png"],
    creator: "@versatiledotmov",
  },

  /* ── Technical SEO ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://versatiledotmovportfolio.vercel.app",
  },

  /* ── Icons ── */
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  /* ── Verification (add IDs once you register) ── */
  verification: {
    // When Google Search Console gives you an HTML Tag to verify ownership, 
    // grab the string of random letters/numbers and paste it right here:
    // google: "your-google-verification-code",
  },

  /* ── Other ── */
  category: "portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload logo as LCP resource so the browser fetches it immediately */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <JsonLd />
      </body>
    </html>
  );
}