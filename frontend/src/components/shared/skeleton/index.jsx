import styles from "./skeleton.module.css";

export function Skeleton({ width = "100%", height = "1rem", radius = "8px", className = "" }) {
 return (
  <span
   aria-hidden="true"
   className={`${styles.skeleton} ${className}`}
   style={{ width, height, borderRadius: radius }}
  />
 );
}

export function PageSkeleton({ withHeader = true }) {
 return (
  <div aria-busy="true" aria-live="polite">
   {withHeader ? (
    <div className={styles.headerBar}>
     <div className="container d-flex align-items-center justify-content-between">
      <Skeleton width="160px" height="32px" />
      <div className="d-none d-md-flex gap-3">
       <Skeleton width="80px" height="20px" />
       <Skeleton width="80px" height="20px" />
       <Skeleton width="80px" height="20px" />
      </div>
      <Skeleton width="120px" height="36px" radius="999px" />
     </div>
    </div>
   ) : null}

   <div className="container py-5">
    <Skeleton width="280px" height="36px" />
    <div className="mt-3">
     <Skeleton width="60%" height="18px" />
    </div>

    <div className="row g-4 mt-4">
     <div className="col-md-6">
      <div className={styles.card}>
       <Skeleton width="40px" height="40px" radius="50%" />
       <div className="mt-3">
        <Skeleton width="70%" height="20px" />
       </div>
       <div className="mt-2">
        <Skeleton width="95%" height="14px" />
       </div>
       <div className="mt-2">
        <Skeleton width="80%" height="14px" />
       </div>
      </div>
     </div>
     <div className="col-md-6">
      <div className={styles.card}>
       <Skeleton width="40px" height="40px" radius="50%" />
       <div className="mt-3">
        <Skeleton width="70%" height="20px" />
       </div>
       <div className="mt-2">
        <Skeleton width="95%" height="14px" />
       </div>
       <div className="mt-2">
        <Skeleton width="80%" height="14px" />
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
