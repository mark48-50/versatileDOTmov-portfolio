"use server";

import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?\d[\d\s().-]{6,19}$/;
const clean = (value) => String(value ?? "").replace(/[<>]/g, "").trim();
const recipients = ["harishsontakke1606@gmail.com", "versatiledotmov@gmail.com"];

async function notifyInquiry(inquiry) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 465);

  if (!host || !user || !pass || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  const result = await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to: recipients,
    replyTo: inquiry.email,
    subject: "New versatileDOTmov inquiry",
    text: [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Number: ${inquiry.phone || "Not provided"}`,
      `What services do you want from us?: ${inquiry.services}`,
    ].join("\n"),
  });

  const accepted = new Set((result.accepted || []).map((address) => address.toLowerCase()));
  if (!recipients.every((address) => accepted.has(address))) {
    throw new Error("SMTP did not accept both recipients.");
  }
}

async function saveInquiry(inquiry) {
  const baseUrl = process.env.LOVABLE_SUPABASE_URL || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.LOVABLE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) return;

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/rest/v1/inquiries`, {
    method: "POST",
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(inquiry),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Could not save the inquiry.");
}

export async function sendEmail(formData) {
  const inquiry = {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")).toLowerCase(),
    phone: clean(formData.get("number")),
    services: clean(formData.get("services")),
  };

  if (!inquiry.name) return { ok: false, error: "Name is required." };
  if (inquiry.name.length > 120) return { ok: false, error: "Name is too long." };
  if (!emailPattern.test(inquiry.email)) return { ok: false, error: "Enter a valid email address." };
  if (inquiry.phone && !phonePattern.test(inquiry.phone)) return { ok: false, error: "Enter a valid phone number." };
  if (!inquiry.services) return { ok: false, error: "Tell me what services you want." };
  if (inquiry.services.length > 4000) return { ok: false, error: "Service details are too long." };

  try {
    await notifyInquiry(inquiry);
  } catch (error) {
    console.error("[contact] email failed", error);
    return { ok: false, error: "Email could not be sent. Please try again later." };
  }

  try {
    await saveInquiry(inquiry);
  } catch (error) {
    console.error("[contact] inquiry was emailed but database save failed", error);
  }

  return { ok: true };
}
