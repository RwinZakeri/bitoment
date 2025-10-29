import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

interface PlanCardSkeletonProps {
  count?: number;
}

const PlanCardSkeleton = ({ count = 3 }: PlanCardSkeletonProps) => {
  return (
    <SkeletonThemeWrapper>
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton height={40} width={40} />
              <Skeleton height={20} width={150} />
            </div>
            <div className="space-y-2">
              <Skeleton height={16} width="100%" />
              <Skeleton height={16} width="80%" />
              <Skeleton height={16} width="60%" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonThemeWrapper>
  );
};

export default PlanCardSkeleton;
