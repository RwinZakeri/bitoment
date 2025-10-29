import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

interface DeviceCardSkeletonProps {
  count?: number;
}

const DeviceCardSkeleton = ({ count = 3 }: DeviceCardSkeletonProps) => {
  return (
    <SkeletonThemeWrapper>
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            <Skeleton circle height={40} width={40} />
            <div className="flex-1">
              <Skeleton height={18} width={120} className="mb-2" />
              <Skeleton height={14} width={100} className="mb-1" />
              <Skeleton height={14} width={80} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonThemeWrapper>
  );
};

export default DeviceCardSkeleton;
