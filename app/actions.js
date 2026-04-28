"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData) {
  const name     = formData.get("name");
  const email    = formData.get("email");
  const number   = formData.get("number") || "Not provided";
  const services = formData.get("services") || "Not provided";

  try {
    const { error } = await resend.emails.send({
      from:     "versatileDOTmov <onboarding@resend.dev>",
      to:       ["versatiledotmov@gmail.com"],
      reply_to: email,
      subject:  `New inquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0b1020;">
          <h2 style="margin-top:0;font-size:1.4rem;">New inquiry — versatileDOTmov</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-weight:600;width:120px;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-weight:600;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;">
                <a href="mailto:${email}" style="color:#f28a4b;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-weight:600;">Phone</td>
              <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;">${number}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:600;vertical-align:top;">Services</td>
              <td style="padding:10px 0;white-space:pre-wrap;">${services}</td>
            </tr>
          </table>
          <p style="margin-top:24px;font-size:0.85rem;color:#6b7280;">
            Reply to this email to respond directly to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Failed to send email. Please try again." };
  }
}
