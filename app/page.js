import Link from "next/link";
import Image from "next/image";
import ClientInteractions from "./components/ClientInteractions";
import ContactForm from "./components/ContactForm";
import VideoSection from "./components/VideoSection";
import ThemeToggle from "./components/ThemeToggle";
import HeroSection from "./components/HeroSection";
import ParallaxBackground from "./components/ParallaxBackground";
import ParticleBackground from "./components/ParticleBackground";

const videos = [
  {
    poster: "/thumbnail/thumbnail - 1.jpg",
    src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/Video%20-%201.mp4",
    title: 'FlowSprint: "Stop Losing Leads"',
    desc: "15s conversion ad with founder hook, UI zoom transitions, and social proof overlays.",
    tags: ["Hook rewrite + pacing", "Motion subtitles", "A/B cut variants"],
  },
  {
    poster: "/thumbnail/thumbnail - 2.png",
    src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/video%20-%202.mp4",
    title: "NimbusCRM: Product Launch Spot",
    desc: "30s launch edit for enterprise audience with premium motion language and CTA sequencing.",
    tags: ["Screen replacement", "Brand sound design", "Multi-format exports"],
  },
  {
    poster: "/thumbnail/thumbnail - 3.png",
    src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/video%20-%203.mp4",
    title: "CloudLoom: Demo-to-Ad Cutdown",
    desc: "Repurposed webinar demo into high-energy paid ad sequence with stronger narrative arc.",
    tags: [
      "Story restructure",
      "Visual rhythm mapping",
      "Performance-first edits",
    ],
  },
];

const popVideos = [
  { src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/pop-video-1.mp4", poster: "/thumbnail/thumbnail-pop-1.png" },
  { src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/pop-video-2.mp4", poster: "/thumbnail/thumbnail-pop-2.png" },
  { src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/pop-video-3.mp4", poster: "/thumbnail/thumbnail-pop-3.png" },
  { src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/pop-video-4.mp4", poster: "/thumbnail/thumbnail-pop-4.png" },
  { src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/pop-video-5.mp4", poster: "/thumbnail/thumbnail-pop-5.png" },
  { src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/pop-video-6.mp4", poster: "/thumbnail/thumbnail-pop-6.png" },
  { src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/pop-video-7.mp4", poster: "/thumbnail/thumbnail-pop-7.png" },
  { src: "https://fifuxlfkmnvipwqgnlny.supabase.co/storage/v1/object/public/videos/pop-video-8.mp4", poster: "/thumbnail/thumbnail-pop-8.png" },
];

export default function Home() {
  return (
    <>
      {/* Fixed particle network canvas — sits behind everything */}
      <ParticleBackground />
      <ParallaxBackground />

      <header className="site-header" role="banner">
        <nav className="nav container" aria-label="Main site navigation">
          <Link className="logo" href="#home" aria-label="versatileDOTmov — go to homepage">
            <Image
              src="/logo.png"
              alt="versatileDOTmov SaaS Video Editing Logo — Harish Sontakke"
              width={40}
              height={40}
              priority
            />
            <span>versatileDOTmov</span>
          </Link>
          <button
            className="menu-toggle"
            aria-label="Open site navigation menu"
            aria-expanded="false"
            aria-controls="nav-links"
          >
            Menu
          </button>
          <ul className="nav-links" id="nav-links" role="list">
            <li><Link href="#work">Work</Link></li>
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#results">Results</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
          <Link className="btn btn-small" href="#contact" aria-label="Book a discovery call with versatileDOTmov">
            Book a Call
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main id="home">
        <HeroSection />

        {/* ── Recent Ad Edits ── */}
        <section id="work" className="work container reveal" aria-labelledby="work-heading">
          <div className="section-head">
            <p className="eyebrow">Featured Projects</p>
            <h2 id="work-heading">Recent Ad Edits</h2>
          </div>
          <VideoSection videos={videos} gridClass="work-grid" />
        </section>

        {/* ── Pop Edits ── */}
        <section id="pop-edits" className="work container reveal" aria-labelledby="pop-heading">
          <div className="section-head">
            <p className="eyebrow">Pop Edits</p>
            <h2 id="pop-heading">Pop Edits</h2>
          </div>
          <VideoSection videos={popVideos} gridClass="work-grid pop-grid" />
        </section>

        {/* ── Services ── */}
        <section id="services" className="services container reveal" aria-labelledby="services-heading">
          <div className="section-head">
            <p className="eyebrow">What I Offer</p>
            <h2 id="services-heading">Video Editing Services</h2>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <h3>Ad Creative Editing</h3>
              <p>
                Short-form ad edits built for Meta, YouTube, TikTok, and
                LinkedIn performance campaigns.
              </p>
            </article>
            <article className="service-card">
              <h3>Product Demo Cutdowns</h3>
              <p>
                Transform long demos and webinars into concise conversion-focused
                video ads.
              </p>
            </article>
            <article className="service-card">
              <h3>Retention + Hooks</h3>
              <p>
                Hook testing, subtitle dynamics, and scene pacing to improve
                watch time and click-through.
              </p>
            </article>
          </div>
        </section>

        {/* ── Results ── */}
        <section id="results" className="results container reveal" aria-labelledby="results-heading">
          <div className="section-head">
            <p className="eyebrow">Impact</p>
            <h2 id="results-heading">Results Snapshot</h2>
          </div>
          <div className="result-grid">
            <article className="result-card">
              <h3>+42%</h3>
              <p>
                Click-through increase after ad creative refresh for a B2B SaaS
                onboarding campaign.
              </p>
            </article>
            <article className="result-card">
              <h3>-27%</h3>
              <p>
                Cost per lead reduction across 6 ad variants in a 4-week
                iteration cycle.
              </p>
            </article>
            <article className="result-card">
              <h3>3.1x</h3>
              <p>
                Higher average watch duration using stronger first 3-second hook
                formats.
              </p>
            </article>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="testimonials container reveal" aria-labelledby="testimonials-heading">
          <div className="section-head">
            <p className="eyebrow">Client Feedback</p>
            <h2 id="testimonials-heading">What Teams Say</h2>
          </div>
          <div className="quote-grid">
            <blockquote>
              &ldquo;Our paid team finally had creative that matched our product
              quality. Performance lifted in week one.&rdquo;
            </blockquote>
            <blockquote>
              &ldquo;Fast turnaround, clear creative logic, and edits that
              actually improve CAC. Exactly what we needed.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="contact container reveal" aria-labelledby="contact-heading">
          <div className="contact-card">
            <p className="eyebrow">Let&apos;s Work Together</p>
            <h2 id="contact-heading">Need ad creatives that convert?</h2>
            <p>
              Share your SaaS offer, target audience, and current ad style.
              I&apos;ll map out a creative approach in one call.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer container" role="contentinfo">
        <p>&copy; 2026 Harish Sontakke · versatileDOTmov · Motion Graphics &amp; Video Editor</p>
      </footer>

      <ClientInteractions />
    </>
  );
}
