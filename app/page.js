import ClientInteractions from "./components/ClientInteractions";
import ContactForm from "./components/ContactForm";
import VideoCard from "./components/VideoCard";
import ThemeToggle from "./components/ThemeToggle";
import HeroSection from "./components/HeroSection";
import StaggeredGrid from "./components/StaggeredGrid";
import ParallaxBackground from "./components/ParallaxBackground";

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
      <ParallaxBackground />

      <header className="site-header">
        <nav className="nav container">
          <a className="logo" href="#home" aria-label="versatileDOTmov home">
            <img src="/logo.png" alt="versatileDOTmov logo" />
            <span>versatileDOTmov</span>
          </a>
          <button
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul className="nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a className="btn btn-small" href="#contact">
            Book a Call
          </a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="home">
        <HeroSection />



        <section id="work" className="work container reveal">
          <div className="section-head">
            <p className="eyebrow">Featured Projects</p>
            <h2>Recent Ad Edits</h2>
          </div>
          <StaggeredGrid className="work-grid">
            {videos.map((v, i) => (
              <VideoCard key={i} {...v} />
            ))}
          </StaggeredGrid>
        </section>

        <section id="pop-edits" className="work container reveal">
          <div className="section-head">
            <p className="eyebrow">Pop Edits</p>
            <h2>Pop Edits</h2>
          </div>
          <StaggeredGrid className="work-grid pop-grid">
            {popVideos.map((v, i) => (
              <VideoCard key={i} src={v.src} poster={v.poster} />
            ))}
          </StaggeredGrid>
        </section>

        <section id="services" className="services container reveal">
          <div className="section-head">
            <p className="eyebrow">What I Offer</p>
            <h2>Editing Services</h2>
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

        <section id="results" className="results container reveal">
          <div className="section-head">
            <p className="eyebrow">Impact</p>
            <h2>Results Snapshot</h2>
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

        <section className="testimonials container reveal">
          <div className="section-head">
            <p className="eyebrow">Client Feedback</p>
            <h2>What Teams Say</h2>
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



        <section id="contact" className="contact container reveal">
          <div className="contact-card">
            <p className="eyebrow">Let&apos;s Work Together</p>
            <h2>Need ad creatives that convert?</h2>
            <p>
              Share your SaaS offer, target audience, and current ad style.
              I&apos;ll map out a creative approach in one call.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <p>&copy; 2026 Harish Sontakke. versatileDOTmov.</p>
      </footer>

      <ClientInteractions />
    </>
  );
}
