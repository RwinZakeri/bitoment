import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

interface VerificationSkeletonProps {
  showPaper?: boolean;
  fieldCount?: number;
}

const VerificationSkeleton = ({
  showPaper = true,
  fieldCount = 3,
}: VerificationSkeletonProps) => {
  return (
    <SkeletonThemeWrapper>
      {showPaper && (
        <div className="mt-5 p-4 border rounded-lg">
          <Skeleton height={60} width="100%" />
        </div>
      )}
      <div className="mt-10 flex flex-col gap-3">
        <Skeleton height={20} width={200} className="mb-4" />
        {Array.from({ length: fieldCount }).map((_, index) => (
          <div key={index}>
            <Skeleton height={16} width={80} className="mb-2" />
            <Skeleton height={40} width="100%" />
          </div>
        ))}
        <div className="mt-6">
          <Skeleton height={40} width={120} />
        </div>
      </div>
    </SkeletonThemeWrapper>
  );
};

export default VerificationSkeleton;
