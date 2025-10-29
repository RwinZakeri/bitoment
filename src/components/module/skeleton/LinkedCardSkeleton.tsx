import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

const LinkedCardSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div className="p-3 border rounded-lg flex justify-between items-center">
        <Skeleton height={16} width={120} />
        <Skeleton height={12} width={60} />
      </div>
    </SkeletonThemeWrapper>
  );
};

export default LinkedCardSkeleton;
