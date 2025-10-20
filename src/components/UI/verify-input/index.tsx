import LeftIcon from "@/public/icons/left-icon";
import { VerifyInputPropsType } from "./type";

const VerifyInput = ({
  type,
  placeholder,
  label,
  icon,
  inputSize = "lg",
  ...props
}: VerifyInputPropsType) => {
  return (
    <div className="flex flex-col gap-4 ">
      {label && <span className="text-base text-black">{label}</span>}
      <div
        className={`bg-white rounded-lg w-full flex justify-between ${
          inputSize === "sm" ? "p-3.5" : "px-3 py-5"
        }`}
      >
        <input
          className="w-full outline-none"
          placeholder={placeholder}
          type={type}
          {...props}
        />
        {icon ? (
          icon
        ) : icon === null || icon === undefined ? null : (
          <LeftIcon className="rotate-180" />
        )}
      </div>
    </div>
  );
};

export default VerifyInput;
