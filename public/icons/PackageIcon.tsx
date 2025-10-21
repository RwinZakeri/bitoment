import React from "react";

interface PackageIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

const PackageIcon: React.FC<PackageIconProps> = ({
  width = 24,
  height = 24,
  className = "",
  stroke = "black",
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 21.6004L20.3138 16.8004V7.20039L12 2.40039L3.68616 7.20039V16.8004L12 21.6004ZM12 21.6004V12.6004M12 12.6004L4.2 7.80039M12 12.6004L19.8 7.80039"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PackageIcon;
