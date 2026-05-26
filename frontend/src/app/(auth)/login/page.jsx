import { Suspense } from "react";
import Image from "next/image";
import LoginForm from "./login-form";
import styles from "./page.module.css";

export const metadata = {
 title: "Entrar — Luminar",
 description: "Acesse sua conta Luminar para acompanhar seus orçamentos.",
};

export default function LoginPage() {
 return (
  <div
   className={`container-fluid min-vh-100 d-flex align-items-center position-relative overflow-hidden p-0 ${styles.shell}`}
  >
   <div className={`position-absolute top-0 start-0 w-50 ${styles.waveTop}`}>
    <svg
     viewBox="0 0 500 300"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     className={styles.waveSvg}
    >
     <path
      d="M0 0H500C400 120 250 50 150 180C70 260 0 220 0 300V0Z"
      fill="#FFC107"
      opacity="0.2"
     />
     <path
      d="M0 0H450C350 90 220 30 120 140C50 210 0 180 0 250V0Z"
      fill="#FFC107"
      opacity="0.4"
     />
     <path
      d="M0 0H400C300 70 200 10 100 110C40 170 0 140 0 200V0Z"
      fill="#FFC107"
     />
    </svg>
   </div>

   <div className={`position-absolute bottom-0 end-0 w-50 ${styles.waveBottom}`}>
    <svg
     viewBox="0 0 500 300"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     className={styles.waveSvgFlipped}
    >
     <path
      d="M0 0H500C400 120 250 50 150 180C70 260 0 220 0 300V0Z"
      fill="#221f20"
      opacity="0.2"
     />
     <path
      d="M0 0H450C350 90 220 30 120 140C50 210 0 180 0 250V0Z"
      fill="#221f20"
      opacity="0.4"
     />
     <path
      d="M0 0H400C300 70 200 10 100 110C40 170 0 140 0 200V0Z"
      fill="#221f20"
     />
    </svg>
   </div>

   <div className={`container position-relative px-4 px-md-5 ${styles.content}`}>
    <div className="row align-items-center gy-5">
     <div
      className={`col-lg-6 position-relative d-flex flex-column justify-content-center ${styles.heroCol}`}
     >
      <div
       className={`mx-auto mx-lg-0 mb-4 d-flex align-items-center justify-content-center position-relative ${styles.heroBlob}`}
      >
       <Image
        src="/empresa-painelSolar.jpg"
        alt="Painel Solar Luminar"
        fill
        sizes="(max-width: 992px) 100vw, 992px"
        className={styles.heroBlobImg}
        priority
       />
      </div>

      <div className={`text-start ${styles.heroText}`}>
       <h1 className={styles.heroTitle}>
        Energia <span className={styles.heroAccent}>Solar</span>
       </h1>
       <p className={styles.heroSub}>
        Reduza sua conta de luz com tecnologia limpa e sustentável
       </p>
      </div>
     </div>

     <div className="col-lg-5 offset-lg-1 d-flex justify-content-center justify-content-lg-end">
      <div className={`bg-white p-5 rounded-4 ${styles.formCard}`}>
       <h2 className={`fs-3 fw-normal mb-5 ${styles.formTitle}`}>
        <strong className={styles.formTitleStrong}>Entrar</strong>{" "}
        <span className={styles.formTitleStrong}>na sua conta</span>
        </h2>

       <Suspense fallback={null}>
        <LoginForm />
       </Suspense>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
