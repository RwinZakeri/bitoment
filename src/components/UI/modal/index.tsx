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
}: ModalPropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      // Focus the modal for accessibility
      modalRef.current?.focus();
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
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

  // Size variants
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full w-full",
    auto: "max-w-full",
  };

  // Position variants
  const positionClasses = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-4",
    bottom: "items-end justify-center pb-4",
  };

  // Backdrop styles
  const backdropStyle = {
    backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
  };

  return (
    <div className={cn("fixed inset-0 z-50 flex", positionClasses[position])}>
      {/* Backdrop */}
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

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          "relative bg-white w-full rounded-xl p-6 mx-4 shadow-xl focus:outline-none",
          size !== "auto" && sizeClasses[size],
          className
        )}
        style={{
          ...(maxWidth && { maxWidth }),
          ...(maxHeight && { maxHeight }),
        }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {close && (
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 z-10 p-1 rounded-md hover:bg-gray-100 transition-colors",
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
