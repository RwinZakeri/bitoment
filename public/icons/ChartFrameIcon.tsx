import React from "react";

interface ChartFrameIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

const ChartFrameIcon: React.FC<ChartFrameIconProps> = ({
  width = 24,
  height = 24,
  className = "",
  fill = "none",
  stroke,
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.60002 15.6004L7.44978 12.0004L10.1996 14.5718L16.2492 8.91478M12.1334 8.40039H16.8V12.7642M4.80002 21.6004C3.47454 21.6004 2.40002 20.5259 2.40002 19.2004V4.80039C2.40002 3.47491 3.47454 2.40039 4.80002 2.40039H19.2C20.5255 2.40039 21.6 3.47491 21.6 4.80039V19.2004C21.6 20.5259 20.5255 21.6004 19.2 21.6004H4.80002Z"
        stroke={stroke || "currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChartFrameIcon;
