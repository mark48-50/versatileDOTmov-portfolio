/**
 * JsonLd — Reusable JSON-LD structured data component.
 *
 * Renders a <script type="application/ld+json"> tag with combined
 * Person + ProfessionalService + WebSite schema for maximum
 * search-engine visibility.
 *
 * Usage:  Import in layout.js and place inside <body>:
 *
 *   import JsonLd from "./components/JsonLd";
 *   ...
 *   <body>
 *     {children}
 *     <JsonLd />
 *   </body>
 */

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      /* ── Person (primary entity) ── */
      {
        "@type": "Person",
        "@id": "https://versatiledotmov.com/#person",
        name: "Harish Sontakke",
        alternateName: "versatileDOTmov",
        url: "https://versatiledotmov.com",
        image: "https://versatiledotmov.com/logo.png",
        description:
          "Freelance motion graphics artist and video editor specialising in SaaS ad creatives, product demos, and paid social campaigns using Adobe After Effects, Premiere Pro, and DaVinci Resolve.",
        jobTitle: "Motion Graphics Artist & Video Editor",
        knowsAbout: [
          "Motion Graphics",
          "Video Editing",
          "Adobe After Effects",
          "Adobe Premiere Pro",
          "DaVinci Resolve",
          "SaaS Ad Creatives",
          "Product Demo Videos",
          "Paid Social Video Ads",
          "Visual Effects",
          "Color Grading",
        ],
        address: {
          "@type": "PostalAddress",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        sameAs: [
          // Add your social profiles here:
          // "https://www.linkedin.com/in/harish-sontakke",
          // "https://twitter.com/versatiledotmov",
          // "https://www.instagram.com/versatiledotmov",
          // "https://www.youtube.com/@versatiledotmov",
          // "https://www.behance.net/harishsontakke",
        ],
      },

      /* ── ProfessionalService ── */
      {
        "@type": "ProfessionalService",
        "@id": "https://versatiledotmov.com/#service",
        name: "versatileDOTmov",
        url: "https://versatiledotmov.com",
        logo: "https://versatiledotmov.com/logo.png",
        description:
          "Professional motion graphics and video editing services for SaaS companies — ad creatives, product demos, and paid social campaigns.",
        founder: { "@id": "https://versatiledotmov.com/#person" },
        areaServed: "Worldwide",
        priceRange: "$600 – Custom",
        serviceType: [
          "Motion Graphics Design",
          "Video Editing",
          "Ad Creative Production",
          "Product Demo Editing",
        ],
        address: {
          "@type": "PostalAddress",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },

      /* ── WebSite ── */
      {
        "@type": "WebSite",
        "@id": "https://versatiledotmov.com/#website",
        url: "https://versatiledotmov.com",
        name: "versatileDOTmov",
        description:
          "Portfolio of Harish Sontakke — motion graphics artist and video editor.",
        publisher: { "@id": "https://versatiledotmov.com/#person" },
        inLanguage: "en-IN",
      },

      /* ── CreativeWork (Portfolio) ── */
      {
        "@type": "CreativeWork",
        "@id": "https://versatiledotmov.com/#portfolio",
        name: "versatileDOTmov Portfolio",
        url: "https://versatiledotmov.com",
        creator: { "@id": "https://versatiledotmov.com/#person" },
        description:
          "A curated collection of SaaS ad creatives, product demo cutdowns, and paid social video campaigns.",
        genre: [
          "Motion Graphics",
          "Video Editing",
          "Ad Creative",
        ],
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
