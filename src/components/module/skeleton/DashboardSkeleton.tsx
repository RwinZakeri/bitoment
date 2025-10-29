import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

const DashboardSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div className="p-4 rounded-lg bg-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Skeleton height={24} width={100} className="mb-2" />
            <Skeleton height={16} width={80} />
          </div>
          <Skeleton height={32} width={60} />
        </div>
        <Skeleton height={200} width="100%" />
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <Skeleton height={24} width={120} />
          <Skeleton height={16} width={60} />
        </div>
        <div className="p-4 border rounded-lg mb-3">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton circle height={24} width={24} />
            <Skeleton height={18} width={120} />
          </div>
          <Skeleton height={14} width={100} className="mb-2" />
          <Skeleton height={16} width={80} />
        </div>
        <div className="p-3 border rounded-lg flex justify-between items-center">
          <Skeleton height={16} width={120} />
          <Skeleton height={12} width={60} />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton height={24} width={120} />
          <Skeleton height={16} width={60} />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton circle height={24} width={24} />
                <Skeleton height={18} width={120} />
              </div>
              <Skeleton height={14} width={100} className="mb-2" />
              <Skeleton height={16} width={80} />
            </div>
          ))}
        </div>
      </div>
    </SkeletonThemeWrapper>
  );
};

export default DashboardSkeleton;
