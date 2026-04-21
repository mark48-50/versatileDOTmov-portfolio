"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: "Sending...", type: "" });

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json().catch(() => ({}))
        : {};

      if (!response.ok || !data.ok) {
        if (data?.error) {
          setStatus({ text: data.error, type: "err" });
        } else if (!contentType.includes("application/json")) {
          setStatus({
            text: "Server not running. Start it with npm run dev, then open http://localhost:3000.",
            type: "err",
          });
        } else {
          setStatus({
            text: "Something went wrong. Please try again.",
            type: "err",
          });
        }
        return;
      }

      setStatus({ text: "Sent. I will reply soon.", type: "ok" });
      e.currentTarget.reset();
    } catch {
      setStatus({ text: "Network error. Please try again.", type: "err" });
    }
  };

  const statusClass = `form-status${status.type ? ` ${status.type}` : ""}`;

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name *</span>
        <input
          type="text"
          name="name"
          required
          placeholder="Harish Sontakke"
        />
      </label>
      <label>
        <span>Email *</span>
        <input
          type="email"
          name="email"
          required
          placeholder="versatileDOTmov@gmail.com"
        />
      </label>
      <label>
        <span>Number</span>
        <input type="tel" name="number" placeholder="+91 0000-0000-00" />
      </label>
      <label>
        <span>What services do you want from us?</span>
        <textarea
          name="services"
          rows={4}
          placeholder="Tell me what kind of video editing help you need..."
        ></textarea>
      </label>
      <button className="btn" type="submit">
        Send Inquiry
      </button>
      <p className={statusClass} role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  );
}
