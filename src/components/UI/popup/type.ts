export interface PopupOption {
  label: string;
  onClick: () => void;
  icon?: string;
  disabled?: boolean;
}

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  options: PopupOption[];
  triggerRef?: React.RefObject<HTMLElement | null>;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
  optionClassName?: string;
}
