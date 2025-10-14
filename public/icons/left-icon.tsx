import React from "react";

interface LeftIconProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

const LeftIcon: React.FC<LeftIconProps> = ({
  width = 24,
  height = 24,
  className = "",
  strokeColor = "currentColor",
  strokeWidth = 2,
  strokeOpacity = 1,
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
        d="M15 17L10 12L15 7"
        stroke={strokeColor}
        style={{ stroke: strokeColor, strokeOpacity }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftIcon;
