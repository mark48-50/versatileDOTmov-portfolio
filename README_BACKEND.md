# Contact Form Email Backend

This project includes a small Node.js backend that receives the contact form and emails you the submission.

## 1) Install deps

Run:

`npm install`

## 2) Configure SMTP

Create a `.env` file (same folder as `server.js`) using `.env.example` as a template.

For Gmail:
- Turn on 2-step verification on your Google account
- Create an App Password
- Use that App Password as `SMTP_PASS`

## 3) Run the server

`npm run dev`

Open:
- `http://localhost:3000`

The form submits to:
- `POST /api/contact`

## Deployment notes

If you deploy, set the same env vars on your hosting platform.
