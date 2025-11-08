import { Dispatch, SetStateAction } from "react";

export interface toggleBtnPropsType {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  options: string[];
}
