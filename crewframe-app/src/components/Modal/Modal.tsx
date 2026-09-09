import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: "md" | "lg";
  children: ReactNode;
}

export default function Modal({ open, onClose, title, size = "lg", children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="cf-modal-backdrop" onClick={onClose}>
      <div
        className={`cf-modal-dialog ${size === "lg" ? "cf-modal-lg" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cf-modal-content">
          <div className="cf-modal-header">
            <h5 className="cf-modal-title">{title}</h5>
            <button type="button" className="cf-btn-close" aria-label="Close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="cf-modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
