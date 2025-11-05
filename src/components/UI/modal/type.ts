export interface ModalPropsType {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  close?: boolean;
  closeButtonClassName?: string;
  backdropClassName?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full" | "auto";
  maxWidth?: string;
  maxHeight?: string;
  position?: "center" | "top" | "bottom";
  showBackdrop?: boolean;
  backdropOpacity?: number;
  backdropBlur?: boolean;
  modalPadding?: number;
  modalMargin?: number;
}
