# versatileDOTmov — SaaS Ad Video Editor Portfolio

A modern portfolio site for **versatileDOTmov**, a SaaS ad video editor specializing in scroll-stopping ad creatives. Built with **Next.js 16** (App Router).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Vanilla CSS with CSS custom properties
- **Fonts:** Sora, IBM Plex Mono (Google Fonts)
- **Email:** Nodemailer (contact form API route)

## Features

- **Dark / Light Theme** — Manual toggle with circle-wipe transition animation (View Transitions API)
- **3D Tilt Cards** — Interactive hover effects on cards with glow follow
- **Scroll Reveal** — Sections animate in on scroll via IntersectionObserver
- **Custom Cursor** — Accent-colored cursor effect on desktop
- **Video Showcase** — Play/mute controls on portfolio video cards
- **Contact Form** — Server-side email via Next.js Route Handler + Nodemailer
- **Responsive** — Fully responsive with mobile menu

## Project Structure

```
├── app/
│   ├── api/contact/route.js   # POST handler for contact form
│   ├── components/
│   │   ├── ClientInteractions.js  # Cursor, scroll reveal, tilt, mobile menu
│   │   ├── ContactForm.js         # Contact form with validation
│   │   ├── ThemeToggle.js         # Dark/light toggle with circle-wipe
│   │   └── VideoCard.js           # Video player card
│   ├── globals.css             # All styles + theme variables
│   ├── layout.js               # Root layout with fonts & metadata
│   └── page.js                 # Main page (Server Component)
├── public/
│   ├── logo.png
│   ├── thumbnail/              # Video poster images
│   └── videos/                 # Portfolio video files
├── next.config.mjs
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file for the contact form email functionality:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your-app-password
CONTACT_TO=recipient@example.com
```

## Deployment

Deploy on [Vercel](https://vercel.com) — push to GitHub and import the repo. Set environment variables in the Vercel dashboard.

## License

© 2026 Harish Sontakke. All rights reserved.
