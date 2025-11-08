import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

const WalletSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      
      <div className="mt-6 p-6 py-8 shadow-lg rounded-xl bg-white">
        <div className="flex flex-col items-center gap-4">
          <Skeleton height={16} width={120} />
          <Skeleton height={48} width={200} />
          <div className="flex items-center gap-2">
            <Skeleton height={16} width={60} />
            <Skeleton height={16} width={40} />
          </div>
          <Skeleton height={40} width={100} />
        </div>
      </div>

      
      <div className="mt-8 grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Skeleton circle height={40} width={40} />
              <Skeleton height={16} width={60} />
            </div>
          </div>
        ))}
      </div>

      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton height={24} width={140} />
          <Skeleton height={16} width={60} />
        </div>
        <div className="bg-white p-4 grid grid-cols-2 gap-6 rounded-lg">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <Skeleton circle height={24} width={24} />
              <Skeleton height={16} width={60} />
              <Skeleton height={14} width={80} />
              <Skeleton height={8} width="100%" />
            </div>
          ))}
        </div>
      </div>

      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton height={24} width={120} />
          <Skeleton height={16} width={60} />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <Skeleton height={20} width={60} />
            <Skeleton height={16} width={100} />
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton circle height={32} width={32} />
                    <div>
                      <Skeleton height={16} width={60} />
                      <Skeleton height={14} width={80} />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton height={16} width={80} />
                    <Skeleton height={14} width={60} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonThemeWrapper>
  );
};

export default WalletSkeleton;

