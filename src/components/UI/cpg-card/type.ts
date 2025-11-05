export interface CpgCardPropsType {
  id: string;
  orderId?: string;
  price: string;
  currency: string;
  url: string;
  status: "active" | "inactive" | "completed" | "expired" | "wait" | "success";
  onDelete?: (linkId: string, id: string) => void;

  shareHandler?: () => void;
}
