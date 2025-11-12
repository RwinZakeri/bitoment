import { cn } from "@/lib/utils";
import { XSquareContainedIcon } from "@/public/icons/XSquareContainedIcon";
import { useEffect, useRef } from "react";
import { ModalPropsType } from "./type";

const Modal = ({
  children,
  isOpen,
  onClose,
  className,
  close = false,
  closeButtonClassName,
  backdropClassName,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = "auto",
  maxWidth,
  maxHeight,
  position = "center",
  showBackdrop = true,
  backdropOpacity = 0.5,
  backdropBlur = true,
  modalPadding = 6,
  modalMargin = 12,
}: ModalPropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full w-full",
    auto: "max-w-full",
  };

  const positionClasses = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-4",
    bottom: "items-end justify-center pb-4",
  };

  const backdropStyle = {
    backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
  };

  return (
    <div className={cn("fixed inset-0 z-50 flex", positionClasses[position])}>
      {showBackdrop && (
        <div
          className={cn(
            "absolute inset-0",
            backdropBlur && "backdrop-blur-sm",
            backdropClassName
          )}
          style={backdropStyle}
          onClick={closeOnBackdropClick ? onClose : undefined}
          aria-hidden="true"
        />
      )}

      <div
        ref={modalRef}
        className={cn(
          "relative bg-white w-full rounded-xlF shadow-xl focus:outline-none",
          size !== "auto" && sizeClasses[size],
          className
        )}
        style={{
          ...(maxWidth && { maxWidth }),
          ...(maxHeight && { maxHeight }),
          padding: modalPadding,
          margin: modalMargin,
        }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {close && (
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 z-10 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-300 transition-colors",
              closeButtonClassName
            )}
            aria-label="Close modal"
          >
            <XSquareContainedIcon />
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
