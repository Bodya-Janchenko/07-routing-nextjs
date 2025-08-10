// "use client";

// import { createPortal } from "react-dom";
// import css from "./Modal.module.css";
// import { useEffect } from "react";

// interface ModalProps {
//   onClose: () => void;
//   children: React.ReactNode;
// }

// export default function NoteModal({ onClose, children }: ModalProps) {
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   const handleBackdropClose = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   return createPortal(
//     <div
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//       onClick={handleBackdropClose}
//     >
//       <div className={css.modal}>{children}</div>
//     </div>,
//     document.body
//   );
// }

// components/Modal/Modal.tsx

"use client";

import css from "./Modal.module.css";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
