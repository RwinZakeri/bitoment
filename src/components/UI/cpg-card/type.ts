export interface CpgCardPropsType {
  id: string;
  orderId: string;
  price: string;
  currency: string;
  url: string;
  status: "wait" | "success";
}
