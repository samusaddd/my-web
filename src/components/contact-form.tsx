"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui";
import { siteConfig } from "@/lib/site";

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const mailtoHref = useMemo(() => {
    const subject = form.name ? `Website message from ${form.name}` : "Website message";
    const body = [`Name: ${form.name}`, `Email: ${form.email}`, "", form.message].join("\n");

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form.email, form.message, form.name]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailtoHref;
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.16em] text-white/45" htmlFor="contact-name">
          Name
        </label>
        <input
          className={inputClassName}
          id="contact-name"
          name="name"
          onChange={handleChange}
          placeholder="Your name"
          required
          type="text"
          value={form.name}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.16em] text-white/45" htmlFor="contact-email">
          Email
        </label>
        <input
          className={inputClassName}
          id="contact-email"
          name="email"
          onChange={handleChange}
          placeholder="you@example.com"
          required
          type="email"
          value={form.email}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.16em] text-white/45" htmlFor="contact-message">
          Message
        </label>
        <textarea
          className={`${inputClassName} min-h-[170px] resize-y`}
          id="contact-message"
          name="message"
          onChange={handleChange}
          placeholder="Write your message here."
          required
          value={form.message}
        />
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Button size="lg" type="submit">
          Send Message
        </Button>
        <p className="text-xs text-white/45">
          Your message opens in your default email app before it is sent.
        </p>
      </div>
    </form>
  );
}
