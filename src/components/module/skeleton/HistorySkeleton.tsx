import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

const HistorySkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div className="mt-4">
        {/* Filters skeleton */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height={32} width={60} borderRadius={16} />
          ))}
        </div>
      </div>

      {/* History sections skeleton */}
      <div className="mt-8 space-y-6">
        {Array.from({ length: 3 }).map((_, dayIndex) => (
          <div key={dayIndex} className="space-y-4">
            {/* Date header skeleton */}
            <div className="flex justify-between items-center">
              <Skeleton height={20} width={120} />
              <Skeleton height={16} width={80} />
            </div>

            {/* Transactions skeleton */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map(
                (_, transactionIndex) => (
                  <div
                    key={transactionIndex}
                    className="p-4 border rounded-lg bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Skeleton circle height={32} width={32} />
                        <div>
                          <Skeleton height={16} width={80} />
                          <Skeleton height={14} width={120} />
                        </div>
                      </div>
                      <div className="text-right">
                        <Skeleton height={16} width={60} />
                        <Skeleton height={14} width={40} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </SkeletonThemeWrapper>
  );
};

export default HistorySkeleton;
