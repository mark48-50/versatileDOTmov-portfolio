import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function escapeText(value) {
  return String(value ?? "").replace(/[<>]/g, "");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = escapeText(body.name).trim();
    const email = escapeText(body.email).trim();
    const number = escapeText(body.number).trim();
    const services = escapeText(body.services).trim();

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
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
      auth: { user: smtpUser, pass: smtpPass },
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
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err);

    const isProd = process.env.NODE_ENV === "production";
    const message = isProd
      ? "Failed to send email."
      : err?.message || "Failed to send email.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
