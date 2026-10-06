import Link from "next/link";
import Image from "next/image";
import ClientInteractions from "./components/ClientInteractions";
import ContactForm from "./components/ContactForm";
import VideoSection from "./components/VideoSection";
import HeroSection from "./components/HeroSection";
import ParallaxBackground from "./components/ParallaxBackground";
import ScrollProgressBar from "./components/ScrollProgressBar";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import ResultsSection from "./components/ResultsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import AboutSection from "./components/AboutSection";

const videos = [
  {
    poster: "/thumbnail/thumbnail - 1.jpg",
    src: "/videos/video-2.mp4",
  },
  {
    poster: "/thumbnail/thumbnail - 2.png",
    src: "/videos/video-3.mp4",
  },
  {
    poster: "/thumbnail/thumbnail - 3.png",
    src: "/videos/video-2.mp4",
  },
  {
    poster: "/thumbnail/thumbnail - 3.png",
    src: "/videos/video-3.mp4",
  },
];

const popVideos = Array.from({ length: 8 }, (_, index) => {
  const number = index + 1;

  return {
    src: `/videos/pop-video-${number}.mp4`,
    poster: `/thumbnail/thumbnail-pop-${number}.png`,
  };
});

export default function Home() {
  return (
    <>
      {/* Fixed parallax background blobs */}
      <ParallaxBackground />

      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* ── Navigation ── */}
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
        </nav>
      </header>

      <main id="home">
        {/* ── 1. Hero (with About/tool badges integrated) ── */}
        <HeroSection />

        <AboutSection />

        {/* ── 2. Featured Projects — Recent Ad Edits grid ── */}
        <section id="work" className="project-section container" aria-labelledby="work-heading">
          <div className="section-head">
            <p className="section-number">02</p>
            <p className="eyebrow">Featured Projects</p>
            <h2 id="work-heading">Recent Ad Edits</h2>
          </div>
          <VideoSection videos={videos} gridClass="work-grid ad-grid" sectionLabel="Recent Ad Edit" />
        </section>

        {/* ── 3. Pop Edits grid ── */}
        <section id="pop-edits" className="project-section container" aria-labelledby="pop-heading">
          <div className="section-head">
            <p className="eyebrow">Pop Edits</p>
            <h2 id="pop-heading">Pop Edits</h2>
          </div>
          <VideoSection videos={popVideos} gridClass="work-grid pop-grid" sectionLabel="Pop Edit" />
        </section>

        {/* ── 4. Services ── */}
        <ServicesSection />

        {/* ── 5. Process ── */}
        <ProcessSection />

        {/* ── 6. Results Snapshot ── */}
        <ResultsSection />

        {/* ── 7. Client Feedback ── */}
        <TestimonialsSection />

        {/* ── 8. Contact ── */}
        <section id="contact" className="container" aria-labelledby="contact-heading">
          <div className="contact-card">
            <p className="eyebrow">Let&apos;s Work Together</p>
            <h2 id="contact-heading">Need creatives that convert?</h2>
            <p style={{ color: "var(--muted)" }}>
              Share your SaaS offer, target audience, and current ad style.
              I&apos;ll map out a creative approach in one call.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer container" role="contentinfo">
        <p>&copy; 2026 Harish Sontakke · versatileDOTmov</p>
      </footer>

      <ClientInteractions />
    </>
  );
}
