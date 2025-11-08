import React from "react";

interface LineChartIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const LineChartIcon: React.FC<LineChartIconProps> = ({
  width = 24,
  height = 24,
  color,
  className = "",
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
        d="M2.39999 2.40039V21.6004H21.6M7.19999 14.4005L11.4 10.2005L14.4 13.2005L19.8001 7.80039"
        stroke={color || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LineChartIcon;
