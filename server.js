import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import path from "path";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));

// Serve the static site from the project root.
app.use(express.static(process.cwd()));

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function escapeText(value) {
  return String(value ?? "").replace(/[<>]/g, "");
}

app.post("/api/contact", async (req, res) => {
  try {
    const name = escapeText(req.body.name).trim();
    const email = escapeText(req.body.email).trim();
    const number = escapeText(req.body.number).trim();
    const services = escapeText(req.body.services).trim();

    if (!name || !email) {
      return res.status(400).json({ ok: false, error: "Name and email are required." });
    }

    const smtpHost = requireEnv("SMTP_HOST");
    const smtpPort = Number(requireEnv("SMTP_PORT"));
    const smtpUser = requireEnv("SMTP_USER");
    const smtpPass = requireEnv("SMTP_PASS");
    const toEmail = process.env.CONTACT_TO || "versatileDOTmov@gmail.com";
    const fromEmail = process.env.CONTACT_FROM || smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const subject = `New inquiry from ${name}`;
    const text =
      `New inquiry received:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Number: ${number || "-"}\n` +
      `Services: ${services || "-"}\n`;

    await transporter.sendMail({
      to: toEmail,
      from: fromEmail,
      replyTo: email,
      subject,
      text
    });

    return res.json({ ok: true });
  } catch (err) {
    // Surface the real failure in server logs for debugging.
    console.error("Contact email failed:", err);

    const isProd = process.env.NODE_ENV === "production";
    const message = isProd ? "Failed to send email." : (err?.message || "Failed to send email.");
    return res.status(500).json({ ok: false, error: message });
  }
});

// SPA-ish fallback (optional): serve index.html for unknown routes.
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
});
