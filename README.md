# versatileDOTmov Portfolio

Portfolio for Harish Sontakke, a video editor and motion graphics artist. Built with Next.js 16, React 19, Motion for React, and vanilla CSS.

## Highlights

- Responsive cinematic portfolio layout
- Local project videos served from `public/videos`
- Poster-first video cards without visible titles or descriptions
- Responsive vertical project grids
- Reduced-motion support
- Validated inquiry form that sends SMTP email to both portfolio inboxes
- Optional inquiry copy in Supabase/Lovable Cloud

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and add your private values. Never commit `.env.local`.

The contact form requires `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS`. For Gmail, use `smtp.gmail.com` on port `465` and a [Google App Password](https://support.google.com/mail/answer/185833), not the account's regular password. App Passwords require 2-Step Verification on the sending account. The server sends each inquiry to both `harishsontakke1606@gmail.com` and `versatiledotmov@gmail.com`, with the visitor's email as Reply-To. The message includes every form field.

The send is awaited before the form shows success. SMTP acceptance normally takes seconds, though final inbox delivery time is controlled by the mail providers and cannot be guaranteed within five minutes.

Set these optional variables to also store a copy in the database:

- `LOVABLE_SUPABASE_URL`
- `LOVABLE_SUPABASE_SERVICE_ROLE_KEY`

## Database

If using the database copy, run `supabase/migrations/20260907000000_create_inquiries.sql` against the connected Supabase/Lovable Cloud project. It creates the `inquiries` table.

## Videos

Deployable videos live in `public/videos` and are referenced as `/videos/<filename>.mp4`. The local `videos form drive` source folder is ignored so the repository does not contain duplicate copies.

The deployable videos total about 66 MiB. The Pop Edits are web-friendly H.264/AAC encodes with fast-start metadata. If the library grows substantially, use a media host or a deployment pipeline that materializes Git LFS files.
These deployable MP4 files are committed as ordinary Git files, not Git LFS pointers. Vercel otherwise serves the pointer text instead of playable video. The prebuild check rejects pointer files before deployment.

## Production checks

```bash
npm run build
npm run start
```

## Deploy

Push the repository to GitHub, import it into Vercel, and configure the SMTP variables in the Vercel project settings. Add the optional database variables there if needed. Redeploy after changing environment variables. The app uses the standard Next.js build command.

© 2026 Harish Sontakke. All rights reserved.
