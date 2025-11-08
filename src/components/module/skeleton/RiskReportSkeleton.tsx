import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

const RiskReportSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div className="mt-4">
        
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height={32} width={60} borderRadius={16} />
          ))}
        </div>
      </div>

      
      <div className="mt-8 space-y-6">
        {Array.from({ length: 3 }).map((_, dayIndex) => (
          <div key={dayIndex} className="space-y-4">
            
            <div className="flex justify-between items-center">
              <Skeleton height={20} width={120} />
              <Skeleton height={16} width={80} />
            </div>

            
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map(
                (_, transactionIndex) => (
                  <div
                    key={transactionIndex}
                    className="p-3 w-full bg-white flex items-center justify-between rounded-lg"
                  >
                    
                    <div className="flex items-center gap-2 flex-1">
                      <Skeleton circle height={48} width={48} />
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Skeleton circle height={28} width={28} />
                          <Skeleton height={16} width={60} />
                        </div>
                        <Skeleton height={12} width={80} />
                        <Skeleton height={14} width={100} />
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex items-center gap-1">
                        <Skeleton height={14} width={70} />
                        <Skeleton height={20} width={56} borderRadius={4} />
                      </div>
                      <div className="flex items-center gap-1">
                        <Skeleton height={14} width={70} />
                        <Skeleton height={20} width={56} borderRadius={4} />
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

export default RiskReportSkeleton;
