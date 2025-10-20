import React from "react";

interface UpArrowCreditIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

const UpArrowCreditIcon: React.FC<UpArrowCreditIconProps> = ({
  width = 11,
  height = 11,
  className = "",
  color = "black",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.9287 3.07117L2.27192 8.72794"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.37529 3.0811L7.92862 3.07129L7.91919 7.625"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpArrowCreditIcon;

