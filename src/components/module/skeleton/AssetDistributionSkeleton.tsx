import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

const AssetDistributionSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div className="rounded-xl bg-white mt-4 p-4 shadow-lg">
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Skeleton height={16} width={100} />
            <Skeleton height={32} width={180} />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton height={16} width={60} />
              <Skeleton height={16} width={40} />
            </div>
            <Skeleton
              height={32}
              width={80}
              borderRadius={4}
              className="mt-2"
            />
          </div>
        </div>

        
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-xl shadow-[0px_2px_10px_rgba(32,32,32,25%)]"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Skeleton circle height={32} width={32} />
                    <Skeleton height={20} width={80} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton height={16} width={100} />
                    <Skeleton height={14} width={40} />
                  </div>
                </div>
                <Skeleton circle height={80} width={80} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonThemeWrapper>
  );
};

export default AssetDistributionSkeleton;
