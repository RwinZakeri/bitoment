export interface CurrencyProgressCardPropsType {
  title: string;
  icon?: string;
  price: number | string;
  progress: number;
  vertical?: boolean;
  onClick?: () => void;
}
