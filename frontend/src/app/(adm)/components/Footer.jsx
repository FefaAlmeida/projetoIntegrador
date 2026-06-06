import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer
      className={`text-center py-4 ${styles.footer}`}
    >
      © 2026 Luminar
    </footer>
  );
}