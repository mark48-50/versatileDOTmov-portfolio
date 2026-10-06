"use server";

import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?\d[\d\s().-]{6,19}$/;
const clean = (value) => String(value ?? "").replace(/[<>]/g, "").trim();

async function saveInquiry(inquiry) {
  const baseUrl = process.env.LOVABLE_SUPABASE_URL || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.LOVABLE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) throw new Error("Contact database is not configured.");

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
  if (!emailPattern.test(inquiry.email)) return { ok: false, error: "Enter a valid email address." };
  if (inquiry.phone && !phonePattern.test(inquiry.phone)) return { ok: false, error: "Enter a valid phone number." };
  if (!inquiry.services) return { ok: false, error: "Tell me what services you want." };

  try {
    await saveInquiry(inquiry);
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM || "versatileDOTmov <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO || "versatiledotmov@gmail.com"],
        reply_to: inquiry.email,
        subject: `New inquiry from ${inquiry.name}`,
        text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone || "Not provided"}\nServices: ${inquiry.services}`,
      });
      if (error) console.error("[contact] notification failed", error.message);
    }
    return { ok: true };
  } catch (error) {
    console.error("[contact] submission failed", error);
    return { ok: false, error: "Failed to send inquiry. Please try again." };
  }
}
