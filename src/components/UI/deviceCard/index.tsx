import { XSquareContainedIcon } from "@/public/icons/XSquareContainedIcon";
import { DeviceCardProps } from "./type";

export const titleAndDesc = ({
  title,
  deviceName,
  cityConnection,
  isLast,
  browser,
}: DeviceCardProps) => {
  return (
    <div>
      <p className="text-base font-bold">{title}</p>
      <div className="pt-3">
        <p className="text-sm"><span className="font-semibold">OS :</span> {deviceName}</p>
        <p className="text-sm"><span className="font-semibold">IP :</span> {cityConnection}</p>
        <p className="text-sm"><span className="font-semibold">Broswer :</span> {browser}</p>
      </div>

      {!isLast && (
        <div className="w-full h-[1px] mt-3 mb-6 bg-gray-500/15"></div>
      )}
    </div>
  );
};

const DeviceCard = ({
  title,
  deviceName,
  cityConnection,
  browser,
}: DeviceCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="py-6 rounded-[10px] border-solid border-[1px] border-black/10 bg-white px-4">
        {titleAndDesc({
          title,
          deviceName,
          cityConnection,
          isLast: false,
          browser,
        })}

        <div className="w-full text-center flex justify-center cursor-pointer  h-full items-center gap-2">
          <XSquareContainedIcon />
          <p className="text-sm w-fit text-red-500">Remove from other devices</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
