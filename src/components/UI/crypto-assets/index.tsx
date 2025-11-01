import { CryptoAssetspropsType } from "./type";

const CryptoAssets = ({
  title,
  icon,
  onClick,
  label,
  size = "lg",
}: CryptoAssetspropsType) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <div className="flex flex-col gap-1 cursor-pointer">
      {label && <span className="text-base">{label}</span>}
      <div
        onClick={clickHandler}
        className={`w-full rounded-xl cursor-pointer bg-white flex justify-between items-center ${
          size === "lg" ? "h-[60px] px-4" : "px-3 py-2"
        }`}
      >
        <div className="flex items-center gap-3.5 cursor-pointer">
          {icon && (
            <div className="w-10 h-10 rounded-full bg-gray-250 flex items-center justify-center">
              {icon}
            </div>
          )}
          <p className={`text-black ${size === "sm" && "text-xs"}`}>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoAssets;
