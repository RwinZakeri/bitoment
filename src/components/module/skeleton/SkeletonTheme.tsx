import { SkeletonTheme } from "react-loading-skeleton";

interface SkeletonThemeWrapperProps {
  children: React.ReactNode;
  baseColor?: string;
  highlightColor?: string;
}

const SkeletonThemeWrapper = ({
  children,
  baseColor = "#f3f4f6",
  highlightColor = "#e5e7eb",
}: SkeletonThemeWrapperProps) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {children}
    </SkeletonTheme>
  );
};

export default SkeletonThemeWrapper;
