"use client";

import styles from "./pagination.module.css";

export default function Pagination({
 page,
 totalPages,
 onChange,
 maxVisible = 5,
}) {
 if (totalPages <= 1) return null;

 const pages = buildPages(page, totalPages, maxVisible);

 const go = (p) => {
  if (p < 1 || p > totalPages || p === page) return;
  onChange(p);
 };

 return (
  <nav aria-label="Paginação" className="d-flex justify-content-center mt-4">
   <ul className={`pagination ${styles.list}`}>
    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
     <button
      type="button"
      className={`page-link ${styles.link}`}
      onClick={() => go(page - 1)}
      aria-label="Página anterior"
     >
      <i className="bi bi-chevron-left"></i>
     </button>
    </li>

    {pages.map((p, idx) =>
     p === "…" ? (
      <li key={`gap-${idx}`} className="page-item disabled">
       <span className={`page-link ${styles.link}`}>…</span>
      </li>
     ) : (
      <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
       <button
        type="button"
        className={`page-link ${styles.link} ${
         p === page ? styles.linkActive : ""
        }`}
        onClick={() => go(p)}
        aria-current={p === page ? "page" : undefined}
       >
        {p}
       </button>
      </li>
     ),
    )}

    <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
     <button
      type="button"
      className={`page-link ${styles.link}`}
      onClick={() => go(page + 1)}
      aria-label="Próxima página"
     >
      <i className="bi bi-chevron-right"></i>
     </button>
    </li>
   </ul>
  </nav>
 );
}

function buildPages(current, total, maxVisible) {
 if (total <= maxVisible + 2) {
  return Array.from({ length: total }, (_, i) => i + 1);
 }
 const half = Math.floor(maxVisible / 2);
 let start = Math.max(2, current - half);
 let end = Math.min(total - 1, current + half);
 if (current - half < 2) end = Math.min(total - 1, maxVisible);
 if (current + half > total - 1) start = Math.max(2, total - maxVisible + 1);
 const pages = [1];
 if (start > 2) pages.push("…");
 for (let i = start; i <= end; i += 1) pages.push(i);
 if (end < total - 1) pages.push("…");
 pages.push(total);
 return pages;
}
