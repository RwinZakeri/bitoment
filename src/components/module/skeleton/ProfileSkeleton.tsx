import Skeleton from "react-loading-skeleton";
import SkeletonThemeWrapper from "./SkeletonTheme";

const ProfileSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div className="w-fit mx-auto flex flex-col gap-4 mt-11">
        <div className="flex items-center justify-center">
          {" "}
          <Skeleton circle height={80} width={80} />
        </div>
        <div className="flex flex-col gap-1.5 text-center">
          <Skeleton height={20} width={120} />
          <Skeleton height={16} width={150} />
        </div>
      </div>
      <div className="flex flex-col mt-11 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-3 border rounded-lg flex justify-between items-center"
          >
            <Skeleton height={16} width={120} />
            <Skeleton height={12} width={60} />
          </div>
        ))}
      </div>
    </SkeletonThemeWrapper>
  );
};

export default ProfileSkeleton;
