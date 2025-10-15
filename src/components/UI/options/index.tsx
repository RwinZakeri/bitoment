import Radio from "../radio";
import { twoFactorOptionsProps } from "./type";

const SelectOption = ({
  twoFactorSelecOption,
  label,
}: {
  twoFactorSelecOption: twoFactorOptionsProps[];
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-black-600/65">{label}</p>

      <div className="py-5 px-4 bg-white rounded-[10px] cursor-pointer">
        {twoFactorSelecOption.map((item: twoFactorOptionsProps, index) => {
          return (
            <div key={item.id}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <p className="text-sm text-black">{item.label}</p>
                </div>
                <Radio
                  name="twoFactorOption"
                  value={item.value}
                  variant="turquoise"
                />
              </div>

              {twoFactorSelecOption?.length - 1 !== index && (
                <div className="w-full h-[1px] my-4 bg-black-600/15"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectOption;
