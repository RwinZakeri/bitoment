export interface ModalPropsType {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
