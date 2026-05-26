import styles from "./skeleton.module.css";

const SIZE_CLASS = {
 "text-sm": styles.sizeTextSm,
 "text-md": styles.sizeTextMd,
 "text-lg": styles.sizeTextLg,
 title: styles.sizeTitle,
 circle: styles.sizeCircle,
 pill: styles.sizePill,
 logo: styles.sizeLogo,
};

const WIDTH_CLASS = {
 25: "w-25",
 50: "w-50",
 60: styles.w60,
 70: styles.w70,
 75: "w-75",
 80: styles.w80,
 95: styles.w95,
 100: "w-100",
};

export function Skeleton({ size, w, className = "" }) {
 const sizeCls = size ? SIZE_CLASS[size] || "" : "";
 const widthCls = w != null ? WIDTH_CLASS[w] || "" : "";
 return (
  <span
   aria-hidden="true"
   className={`${styles.skeleton} ${sizeCls} ${widthCls} ${className}`}
  />
 );
}

export function PageSkeleton({ withHeader = true }) {
 return (
  <div aria-busy="true" aria-live="polite">
   {withHeader ? (
    <div className={styles.headerBar}>
     <div className="container d-flex align-items-center justify-content-between">
      <Skeleton size="logo" />
      <div className="d-none d-md-flex gap-3">
       <Skeleton size="text-lg" w="80" className="d-inline-block" />
       <Skeleton size="text-lg" w="80" className="d-inline-block" />
       <Skeleton size="text-lg" w="80" className="d-inline-block" />
      </div>
      <Skeleton size="pill" w="80" className="d-inline-block" />
     </div>
    </div>
   ) : null}

   <div className="container py-5">
    <Skeleton size="title" w="80" className="d-inline-block" />
    <div className="mt-3">
     <Skeleton size="text-md" w="60" />
    </div>

    <div className="row g-4 mt-4">
     <div className="col-md-6">
      <div className={styles.card}>
       <Skeleton size="circle" />
       <div className="mt-3">
        <Skeleton size="text-lg" w="70" />
       </div>
       <div className="mt-2">
        <Skeleton size="text-sm" w="95" />
       </div>
       <div className="mt-2">
        <Skeleton size="text-sm" w="80" />
       </div>
      </div>
     </div>
     <div className="col-md-6">
      <div className={styles.card}>
       <Skeleton size="circle" />
       <div className="mt-3">
        <Skeleton size="text-lg" w="70" />
       </div>
       <div className="mt-2">
        <Skeleton size="text-sm" w="95" />
       </div>
       <div className="mt-2">
        <Skeleton size="text-sm" w="80" />
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
