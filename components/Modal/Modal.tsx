// components/Modal/Modal.tsx

"use client";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  const router = useRouter();
  const close = () => {
    router.back();
    if (onClose) onClose();
  };

  return (
    <div>
      <div>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
