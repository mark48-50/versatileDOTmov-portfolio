# versatileDOTmov Portfolio

Portfolio for Harish Sontakke, a video editor and motion graphics artist. Built with Next.js 16, React 19, Motion for React, and vanilla CSS.

## Highlights

- Responsive cinematic portfolio layout
- Local project videos served from `public/videos`
- Poster-first video cards with play, mute, and full-size controls
- Responsive vertical project grids
- Reduced-motion support
- Validated inquiry form backed by Supabase/Lovable Cloud
- Optional inquiry email notifications through Resend

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and add your private values. Never commit `.env.local`.

The contact form requires:

- `LOVABLE_SUPABASE_URL`
- `LOVABLE_SUPABASE_SERVICE_ROLE_KEY`

Resend variables are optional. Without them, inquiries are still saved to the database.

## Database

Run the SQL migration in `supabase/migrations/20260831190000_create_inquiries.sql` against the connected Supabase/Lovable Cloud project. It creates the `inquiries` table used by the contact form.

## Videos

Deployable videos live in `public/videos` and are referenced as `/videos/<filename>.mp4`. The local `videos form drive` source folder is ignored so the repository does not contain duplicate copies.

The current video assets total about 280 MB. Each file is below GitHub's 100 MB per-file limit, but Git LFS or external media hosting may be preferable later if the library grows substantially.

## Production checks

```bash
npm run build
npm run start
```

## Deploy

Push the repository to GitHub, import it into Vercel, and configure the same environment variables in the Vercel project settings. The app uses the standard Next.js build command.

© 2026 Harish Sontakke. All rights reserved.
