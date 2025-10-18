import { cn } from "@/lib/utils";
import { ModalPropsType } from "./type";

const Modal = ({ children, isOpen, onClose, className }: ModalPropsType) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-opacity-100 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
