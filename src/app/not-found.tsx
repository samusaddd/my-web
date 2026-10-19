import Link from "next/link";
import styles from "./interior.module.css";

export default function NotFound() {
  return (
    <div className={`${styles.page} ${styles.error}`}>
      <span aria-hidden="true" className={styles.errorNumber}>404</span>
      <div className={`${styles.wrap} ${styles.errorContent}`}>
        <p className={styles.eyebrow}>404 / A small detour</p>
        <h1 className={styles.pageTitle}>This page<br /><em>got away.</em></h1>
        <p className={styles.lede}>The address may have changed, or the page may no longer be here. There is still plenty to read.</p>
        <div className={styles.actions}>
          <Link className={styles.button} href="/blog">Find an essay <span aria-hidden="true">→</span></Link>
          <Link className={styles.link} href="/">Return home <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  );
}
