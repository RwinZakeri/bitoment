import { XSquareContainedIcon } from "@/public/icons/XSquareContainedIcon";
import { DeviceCardProps } from "./type";

export const titleAndDesc = ({
  title,
  deviceName,
  cityConnection,
  isLast,
  isDevice,
}: DeviceCardProps) => {
  return (
    <div>
      <p className="text-base font-bold">{title}</p>
      <div className="pt-3">
        <p className="text-sm">{deviceName}</p>
        <p className="text-sm">{cityConnection}</p>
      </div>

      {!isLast && (
        <div className="w-full h-[1px] mt-3 mb-6 bg-black-600/15"></div>
      )}
    </div>
  );
};

const DeviceCard = ({
  title,
  deviceName,
  cityConnection,
  label,
  isDevice = true,
}: DeviceCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-black-600/65">{label}</p>
      <div className="py-6 rounded-[10px] border-solid border-[1px] border-light-black bg-white px-4">
        {titleAndDesc({
          title,
          deviceName,
          cityConnection,
          label,
          isLast: false,
          isDevice,
        })}

        {isDevice && (
          <div className="w-full h-full flex items-center justify-center gap-2">
            <XSquareContainedIcon />
            <p className="text-sm text-red-500">Remove from other devices</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceCard;
