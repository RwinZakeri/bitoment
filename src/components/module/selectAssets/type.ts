export interface CryptoCurrency {
  name: string;
  shortName: string;
  icon: string;
  price: string;
  percentage: string;
}

export interface SelectAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: (item: CryptoCurrency) => void;
}
