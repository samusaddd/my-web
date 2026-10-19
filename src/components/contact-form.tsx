"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site";
import styles from "@/app/interior.module.css";

export function ContactForm() {
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  useEffect(() => { setReady(true); }, []);

  const mailtoHref = useMemo(() => {
    const subject = form.name ? `Website message from ${form.name}` : "Website message";
    const body = [`Name: ${form.name}`, `Email: ${form.email}`, "", form.message].join("\n");
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form.email, form.message, form.name]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ready) window.location.href = mailtoHref;
  }

  return (
    <>
      <form aria-describedby="contact-composer-note" className={styles.form} onSubmit={handleSubmit}>
        <fieldset disabled={!ready}>
          <legend className="sr-only">Prepare an email to Samir Seddiqi</legend>
          <div className={styles.formFields}>
            <div className={styles.formField}>
              <label htmlFor="contact-name">Your name</label>
              <input autoComplete="name" className={styles.input} id="contact-name" name="name" onChange={handleChange} placeholder="How should I address you?" required type="text" value={form.name} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="contact-email">Your email</label>
              <input autoComplete="email" className={styles.input} id="contact-email" name="email" onChange={handleChange} placeholder="you@example.com" required type="email" value={form.email} />
            </div>
            <div className={`${styles.formField} ${styles.messageField}`}>
              <label htmlFor="contact-message">Your message</label>
              <textarea className={`${styles.input} ${styles.message}`} id="contact-message" name="message" onChange={handleChange} placeholder="What would you like to talk about?" required rows={6} value={form.message} />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={styles.button} type="submit">Open email app <span aria-hidden="true">↗</span></button>
            <p id="contact-composer-note">Opens an email draft.<br />Send it from your email app.</p>
          </div>
        </fieldset>
      </form>
      <noscript><p className={styles.noScript}>To write without JavaScript, <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>open an email to {siteConfig.email}</a>.</p></noscript>
    </>
  );
}
