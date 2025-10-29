import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

interface FormSkeletonProps {
  fieldCount?: number;
  showButton?: boolean;
  showHeader?: boolean;
  headerHeight?: number;
  headerWidth?: number;
}

const FormSkeleton = ({
  fieldCount = 3,
  showButton = true,
  showHeader = false,
  headerHeight = 20,
  headerWidth = 200,
}: FormSkeletonProps) => {
  return (
    <SkeletonThemeWrapper>
      <div className="gap-2 flex flex-col mt-6">
        {showHeader && (
          <Skeleton
            height={headerHeight}
            width={headerWidth}
            className="mb-4"
          />
        )}
        {Array.from({ length: fieldCount }).map((_, index) => (
          <div key={index}>
            <Skeleton height={16} width={60} className="mb-2" />
            <Skeleton height={40} width="100%" />
          </div>
        ))}
        {showButton && (
          <div className="mt-6">
            <Skeleton height={40} width={120} />
          </div>
        )}
      </div>
    </SkeletonThemeWrapper>
  );
};

export default FormSkeleton;
