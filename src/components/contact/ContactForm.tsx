"use client";

import { FormEvent, useState } from "react";
import { contactDetails, contactSubjects } from "@/lib/contact";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.error || "Unable to send your message right now.");
        return;
      }

      setStatus("success");
      setFeedback(data.message || "Your message has been sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedback("Unable to send your message right now. Please try again later.");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Your Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="e.g. Priya Sharma"
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Subject</label>
        <select
          name="subject"
          value={form.subject}
          onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50 text-gray-700"
          required
        >
          <option value="">Select a topic…</option>
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Message</label>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          placeholder="Write your message here…"
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 bg-gray-50 resize-none"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-800 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
      {feedback ? (
        <p
          className={`text-xs text-center ${status === "success" ? "text-teal-600" : "text-rose-500"}`}
        >
          {feedback}
        </p>
      ) : (
        <p className="text-xs text-gray-400 text-center">I usually reply within 2–3 business days.</p>
      )}
    </form>
  );
}
