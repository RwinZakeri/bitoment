import LeftIcon from "@/public/icons/left-icon";
import { VerifyInputPropsType } from "./type";

const VerifyInput = ({
  type,
  placeholder,
  label,
  ...props
}: VerifyInputPropsType) => {
  return (
    <div className="flex flex-col gap-4 ">
      {label && <span className="text-base text-black">{label}</span>}
      <div className="bg-white rounded-lg w-full px-3 py-5 flex justify-between">
        <input
          className="w-full outline-none"
          placeholder={placeholder}
          type={type}
          {...props}
        />
        <LeftIcon className="rotate-180" />
      </div>
    </div>
  );
};

export default VerifyInput;
