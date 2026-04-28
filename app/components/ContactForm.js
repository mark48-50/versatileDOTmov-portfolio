"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sendEmail } from "../actions";

export default function ContactForm() {
  const [status, setStatus]   = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ text: "Sending...", type: "" });

    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    try {
      const result = await sendEmail(formData);

      if (!result.ok) {
        setStatus({ text: result.error || "Something went wrong. Please try again.", type: "err" });
      } else {
        setStatus({ text: "Sent! I'll reply soon.", type: "ok" });
        form.reset();
      }
    } catch {
      setStatus({ text: "Network error. Please try again.", type: "err" });
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
      </label>
      <label>
        <span>Email *</span>
        <input
          type="email"
          name="email"
          required
          placeholder="versatileDOTmov@gmail.com"
          disabled={loading}
        />
      </label>
      <label>
        <span>Number</span>
        <input type="tel" name="number" placeholder="+91 0000-0000-00" disabled={loading} />
      </label>
      <label>
        <span>What services do you want from us?</span>
        <textarea
          name="services"
          rows={4}
          placeholder="Tell me what kind of video editing help you need..."
          disabled={loading}
        ></textarea>
      </label>
      <motion.button
        className="btn"
        type="submit"
        disabled={loading}
        whileHover={!loading ? { y: -3, boxShadow: "0 10px 28px rgba(242, 138, 75, 0.32)" } : {}}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {loading ? "Sending…" : "Send Inquiry"}
      </motion.button>
      <p className={statusClass} role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  );
}
