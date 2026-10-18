"use client";

import { Send } from "lucide-react";
import { useState } from "react";

const TOPICS = ["A quote for a job", "A bill of quantities", "A trade account or credit", "An existing order", "Plant hire or site services", "Something else"];

/** A static site has no server to post to: this composes the email in the visitor's own mail app. */
export function ContactComposer({ email }: { email: string }) {
  const [form, setForm] = useState({ name: "", company: "", phone: "", topic: TOPICS[0], message: "" });
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const href = () => {
    const body = [form.message, "", `Name: ${form.name}`, form.company && `Company: ${form.company}`, form.phone && `Phone: ${form.phone}`].filter((l) => l !== "").join("\n");
    return `mailto:${email}?subject=${encodeURIComponent(`${form.topic} — via aggregated.besbpo.co.za`)}&body=${encodeURIComponent(body)}`;
  };

  const field = "mt-1.5 w-full rounded-sm border border-basalt/15 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-seam-blue focus:ring-2 focus:ring-seam-blue/20";
  return (
    <form
      className="mt-8 grid gap-4 rounded-sm border border-basalt/10 bg-white p-6 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href();
      }}
    >
      <label className="text-sm font-semibold">
        Your name
        <input required value={form.name} onChange={set("name")} className={field} autoComplete="name" />
      </label>
      <label className="text-sm font-semibold">
        Company <span className="font-normal text-slate">(optional)</span>
        <input value={form.company} onChange={set("company")} className={field} autoComplete="organization" />
      </label>
      <label className="text-sm font-semibold">
        Phone <span className="font-normal text-slate">(optional)</span>
        <input value={form.phone} onChange={set("phone")} className={field} type="tel" autoComplete="tel" />
      </label>
      <label className="text-sm font-semibold">
        About
        <select value={form.topic} onChange={set("topic")} className={field}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold sm:col-span-2">
        Message
        <textarea required rows={5} value={form.message} onChange={set("message")} className={field} placeholder="What do you need, how much, and where is the site?" />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
        <p className="text-xs text-slate">Nothing is sent or stored by this page.</p>
        <button type="submit" className="inline-flex items-center gap-2 rounded-sm bg-seam-blue px-5 py-2.5 text-sm font-semibold text-limestone transition hover:bg-basalt">
          <Send className="h-4 w-4" aria-hidden /> Write the email
        </button>
      </div>
    </form>
  );
}
