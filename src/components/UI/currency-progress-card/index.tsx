import Image from "next/image";
import Link from "next/link";
import CircleProgressBar from "../circle-progress-bar";
import { CurrencyProgressCardPropsType } from "./type";

const CurrencyProgressCard = ({
  title,
  icon,
  price,
  progress,
  vertical,
}: CurrencyProgressCardPropsType) => {
  console.log(icon);

  return (
    <Link
      href={`/wallet/${title.toLocaleLowerCase()}`}
      className={`flex justify-between ${
        vertical
          ? " bg-[#EFEFEF] flex-col-reverse gap-4 items-center rounded-lg p-4"
          : " p-4 rounded-xl shadow-[0px_2px_10px_rgba(32,32,32,25%)]"
      }`}
    >
      <div className={`flex flex-col gap-2 ${vertical && "items-center"}`}>
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className={`${
                vertical ? "bg-white" : "bg-gray-200 "
              } w-8 flex items-center justify-center h-8 rounded-full`}
            >
              <Image
                className="w-4"
                src={icon}
                width={25}
                height={25}
                alt="cryptoIcon"
              />
            </div>
          )}
          <p className="font-bold text-xl">{title}</p>
        </div>
        <p className="flex items-center gap-1">
          <span className="text-black text-base">{price}</span>
          <span className="text-gray-800/65 text-sm">USDT</span>
        </p>
      </div>
      <CircleProgressBar
        progress={progress}
        size={80}
        strokeWidth={7}
        color="#15E0CC"
        backgroundColor={vertical ? "rgba(8, 8, 8, 0.12)" : " #eeeeee"}
        showPercentage={true}
        animated={true}
        duration={1500}
      />
    </Link>
  );
};

export default CurrencyProgressCard;
