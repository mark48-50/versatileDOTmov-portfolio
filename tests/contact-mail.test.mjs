import assert from "node:assert/strict";
import { createServer } from "node:net";
import { test } from "node:test";
import { sendEmail } from "../app/actions.js";
import { buildInquiryEmail } from "../app/lib/inquiry-email.js";

test("inquiry email has branded HTML, a text fallback, and escaped form content", () => {
  const message = buildInquiryEmail({
    name: 'Jane & Co <script>"',
    email: "jane@example.com",
    phone: "",
    services: "Ad editing & motion\n<script>alert('x')</script>",
  });

  assert.equal(message.subject, 'New project inquiry from Jane & Co <script>" | versatileDOTmov');
  assert.match(message.html, /New project inquiry/);
  assert.match(message.html, /<img src="https:\/\/versatiledotmovportfolio\.vercel\.app\/logo\.png" alt="versatileDOTmov logo" width="76" height="76"/);
  assert.match(message.html, /VIDEO EDITING &amp; MOTION DESIGN/);
  assert.match(message.html, /Jane &amp; Co &lt;script&gt;&quot;/);
  assert.match(message.html, /Ad editing &amp; motion<br>&lt;script&gt;alert\(&#39;x&#39;\)&lt;\/script&gt;/);
  assert.doesNotMatch(message.html, /<script>/);
  assert.doesNotMatch(message.html, /Not provided/);
  assert.match(message.html, /mailto:jane%40example\.com/);
  assert.match(message.text, /Ad editing & motion\n<script>alert\('x'\)<\/script>/);
});

test("contact form emails both inboxes with every submitted field", async () => {
  const recipients = [];
  const messageLines = [];
  const sockets = new Set();
  const server = createServer((socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
    let buffer = "";
    let readingMessage = false;
    socket.write("220 localhost SMTP ready\r\n");

    socket.on("data", (chunk) => {
      buffer += chunk.toString();
      let end;
      while ((end = buffer.indexOf("\r\n")) !== -1) {
        const line = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);

        if (readingMessage) {
          if (line === ".") {
            readingMessage = false;
            socket.write("250 Message accepted\r\n");
          } else {
            messageLines.push(line);
          }
        } else if (line.startsWith("EHLO")) {
          socket.write("250-localhost\r\n250-AUTH PLAIN\r\n250 SIZE 100000\r\n");
        } else if (line.startsWith("AUTH PLAIN")) {
          socket.write("235 Authentication successful\r\n");
        } else if (line.startsWith("RCPT TO:")) {
          recipients.push(line);
          socket.write("250 Recipient accepted\r\n");
        } else if (line === "DATA") {
          readingMessage = true;
          socket.write("354 End with dot\r\n");
        } else if (line === "QUIT") {
          socket.end("221 Goodbye\r\n");
        } else {
          socket.write("250 OK\r\n");
        }
      }
    });
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const envNames = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
  const originalEnv = Object.fromEntries(envNames.map((name) => [name, process.env[name]]));

  try {
    process.env.SMTP_HOST = "127.0.0.1";
    process.env.SMTP_PORT = String(server.address().port);
    process.env.SMTP_USER = "sender@example.com";
    process.env.SMTP_PASS = "test-password";
    delete process.env.SMTP_FROM;

    const formData = new FormData();
    formData.set("name", "Test Client");
    formData.set("email", "client@example.com");
    formData.set("number", "+91 1234567890");
    formData.set("services", "Ad creative editing");

    assert.deepEqual(await sendEmail(formData), { ok: true });
    assert.equal(recipients.length, 2);
    assert.ok(recipients.some((line) => line.includes("harishsontakke1606@gmail.com")));
    assert.ok(recipients.some((line) => line.includes("versatiledotmov@gmail.com")));

    const message = messageLines.join("\n");
    assert.match(message, /Content-Type: multipart\/alternative/i);
    assert.match(message, /From: versatileDOTmov <sender@example\.com>/i);
    assert.match(message, /Name: Test Client/);
    assert.match(message, /Email: client@example.com/);
    assert.match(message, /Phone: \+91 1234567890/);
    assert.match(message, /SERVICES REQUESTED\nAd creative editing/);
    assert.match(message, /Reply-To: client@example.com/i);
  } finally {
    for (const name of envNames) {
      if (originalEnv[name] === undefined) delete process.env[name];
      else process.env[name] = originalEnv[name];
    }
    for (const socket of sockets) socket.destroy();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("contact form does not report success without SMTP credentials", async () => {
  const previousHost = process.env.SMTP_HOST;
  delete process.env.SMTP_HOST;
  const formData = new FormData();
  formData.set("name", "Test Client");
  formData.set("email", "client@example.com");
  formData.set("services", "Ad creative editing");

  try {
    const result = await sendEmail(formData);
    assert.equal(result.ok, false);
  } finally {
    if (previousHost === undefined) delete process.env.SMTP_HOST;
    else process.env.SMTP_HOST = previousHost;
  }
});
