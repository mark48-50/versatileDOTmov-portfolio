import "./globals.css";
import JsonLd from "./components/JsonLd";

/* ── 1. Full Next.js Metadata Object ── */
export const metadata = {
  metadataBase: new URL("https://versatiledotmov.com"),

  title: {
    default:
      "Harish Sontakke — Motion Graphics & Video Editor | versatileDOTmov",
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
    { name: "Harish Sontakke", url: "https://versatiledotmov.com" },
  ],
  creator: "Harish Sontakke",
  publisher: "versatileDOTmov",

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://versatiledotmov.com",
    siteName: "versatileDOTmov",
    title:
      "Harish Sontakke — Motion Graphics & Video Editor | versatileDOTmov",
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
    canonical: "https://versatiledotmov.com",
  },

  /* ── Icons ── */
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  /* ── Verification (add IDs once you register) ── */
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  /* ── Other ── */
  category: "portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
        <JsonLd />
      </body>
    </html>
  );
}
