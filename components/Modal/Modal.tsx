import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "@/components/Modal/Modal.module.css"

interface ModalProps{
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    const handleClickBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      };
      
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
        onClick={handleClickBackdrop}>
            <div className={css.modal}>
                {/* <button type="button" className={css.closeBtn} onClick={onClose}>
                    ×
                </button> */}
                {children}
            </div>
        </div>,
document.body
    );
}
