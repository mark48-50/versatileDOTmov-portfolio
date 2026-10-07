const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

const logoUrl = "https://versatiledotmovportfolio.vercel.app/logo.png";

export function buildInquiryEmail(inquiry) {
  const name = escapeHtml(inquiry.name);
  const email = escapeHtml(inquiry.email);
  const phone = inquiry.phone ? escapeHtml(inquiry.phone) : null;
  const services = escapeHtml(inquiry.services).replace(/\r\n|\r|\n/g, "<br>");
  const emailHref = `mailto:${encodeURIComponent(inquiry.email)}`;
  const phoneHref = inquiry.phone ? `tel:${inquiry.phone.replace(/[^\d+]/g, "")}` : null;
  const subjectName = inquiry.name.replace(/[\r\n]+/g, " ").trim();

  return {
    subject: `New project inquiry from ${subjectName} | versatileDOTmov`,
    text: [
      "NEW PROJECT INQUIRY | versatileDOTmov",
      "",
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      ...(inquiry.phone ? [`Phone: ${inquiry.phone}`] : []),
      "",
      "SERVICES REQUESTED",
      inquiry.services,
      "",
      "Reply to this email to contact the sender directly.",
      "Sent via the versatileDOTmov portfolio contact form.",
    ].join("\n"),
    html: `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#090b10;color:#f5f5f3;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">New portfolio inquiry from ${name}. Open to view the project details.</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#090b10;"><tr><td align="center" style="padding:28px 16px 36px;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;">
      <tr><td style="padding:0 0 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
          <td width="76" style="width:76px;padding:0 14px 0 0;vertical-align:middle;">
            <a href="https://versatiledotmovportfolio.vercel.app/" style="text-decoration:none;"><img src="${logoUrl}" alt="versatileDOTmov logo" width="76" height="76" style="display:block;width:76px;height:76px;border:0;"></a>
          </td>
          <td style="vertical-align:middle;">
            <p style="margin:0 0 5px;color:#f5f5f3;font-size:20px;line-height:1.2;font-weight:700;">versatile<span style="color:#ff922e;">DOT</span>mov</p>
            <p style="margin:0;color:#aab3bd;font-size:11px;line-height:1.4;">VIDEO EDITING &amp; MOTION DESIGN</p>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="height:3px;background:#ff922e;font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:28px 24px 30px;background:#151821;border:1px solid #30343e;border-top:0;">
        <p style="margin:0 0 10px;color:#ffad64;font-size:11px;font-weight:700;text-transform:uppercase;">Portfolio inquiry</p>
        <h1 style="margin:0 0 10px;color:#f5f5f3;font-size:27px;line-height:1.25;font-weight:700;">New project inquiry</h1>
        <p style="margin:0 0 26px;color:#bdc3cb;font-size:14px;line-height:1.6;">Someone reached out through your portfolio.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #353944;border-bottom:1px solid #353944;">
          <tr><td style="padding:20px 0 16px;vertical-align:top;">
            <p style="margin:0 0 6px;color:#ffad64;font-size:11px;font-weight:700;text-transform:uppercase;">From</p>
            <p style="margin:0;color:#f5f5f3;font-size:19px;line-height:1.4;font-weight:700;overflow-wrap:anywhere;">${name}</p>
          </td></tr>
          <tr><td style="padding:0 0 20px;vertical-align:top;">
            <a href="${emailHref}" style="color:#9bdde6;font-size:14px;line-height:1.6;text-decoration:underline;overflow-wrap:anywhere;">${email}</a>
            ${phone ? `<p style="margin:7px 0 0;color:#bdc3cb;font-size:14px;line-height:1.6;"><a href="${phoneHref}" style="color:#bdc3cb;text-decoration:none;">${phone}</a></p>` : ""}
          </td></tr>
        </table>
        <p style="margin:27px 0 10px;color:#ffad64;font-size:11px;font-weight:700;text-transform:uppercase;">Services requested</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#1e222c;border-left:3px solid #9bdde6;"><tr><td style="padding:16px 18px;color:#f5f5f3;font-size:15px;line-height:1.7;overflow-wrap:anywhere;">${services}</td></tr></table>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr><td style="background:#ff922e;border-radius:4px;">
          <a href="${emailHref}" style="display:inline-block;padding:13px 21px;color:#19120e;font-size:14px;font-weight:700;text-decoration:none;">Reply to inquiry</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:18px 4px 0;color:#aab3bd;font-size:11px;line-height:1.6;">Sent via the versatileDOTmov portfolio contact form. Replying to this email goes directly to the sender.</td></tr>
    </table>
  </td></tr></table>
</body>
</html>`,
  };
}
