import { v4 as uuid } from "uuid";
import { toggleBtnPropsType } from "./type";

const ToggleButton = ({ state, setState, options }: toggleBtnPropsType) => {
  return (
    <div className="w-full rounded-lg bg-gray-200 p-0.5 flex items-center">
      {options.map((item) => (
        <div
          onClick={() => setState(item)}
          key={uuid()}
          className={`${
            state === item ? "shadow-sm  bg-white" : ""
          } px-4 py-1 font-light cursor-pointer text-center w-full rounded-lg text-sm `}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default ToggleButton;
