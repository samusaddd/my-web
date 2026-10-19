import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-invitation">
          <p className="footer-eyebrow">A letter, an idea, a conversation</p>
          <h2>Keep the<br /><em>conversation open.</em></h2>
          <a className="footer-email" href={"mailto:" + siteConfig.email}>{siteConfig.email} <span aria-hidden="true">↗</span></a>
        </div>
        <div className="footer-bottom-grid">
          <div className="footer-identity">
            <Link href="/">Samir Seddiqi.</Link>
            <p>Afghan-born. Based in Trento.<br />Writing, work, and the life in between.</p>
          </div>
          <nav aria-label="Footer navigation">
            {navLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          </nav>
          <div className="footer-elsewhere">
            <p>Elsewhere</p>
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={siteConfig.company.url} target="_blank" rel="noreferrer">VitaAvanza ↗</a>
            <a href="/rss.xml">RSS feed ↗</a>
          </div>
        </div>
        <div className="footer-colophon"><p>© {new Date().getUTCFullYear()} Samir Seddiqi</p><p>Words are a way of paying attention.</p><a href="#top">Back to top ↑</a></div>
      </div>
    </footer>
  );
}