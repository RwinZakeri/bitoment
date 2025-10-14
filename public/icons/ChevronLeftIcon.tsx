import React from "react";

interface ChevronLeftIconProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  fillColor?: string;
  fillOpacity?: number;
}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({
  width = 24,
  height = 26,
  className = "",
  strokeColor = "black",
  strokeWidth = 2,
  strokeOpacity = 1,
  fillColor = "white",
  fillOpacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="23.5"
        y="25.46"
        width="23"
        height="24.92"
        transform="rotate(180 23.5 25.46)"
        fill={fillColor}
        style={{ fill: fillColor, fillOpacity }}
      />
      <rect
        x="23.5"
        y="25.46"
        width="23"
        height="24.92"
        transform="rotate(180 23.5 25.46)"
        stroke={fillColor}
        style={{ stroke: fillColor, strokeOpacity }}
      />
      <path
        d="M9 7.96002L14 12.96L9 17.96"
        stroke={strokeColor}
        style={{ stroke: strokeColor, strokeOpacity }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
