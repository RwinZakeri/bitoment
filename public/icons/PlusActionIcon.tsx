import React from "react";

interface PlusActionIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
  stroke?: string;
}

const PlusActionIcon: React.FC<PlusActionIconProps> = ({
  width = 15,
  height = 15,
  className = "",
  fill,
  stroke,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5068 7.98293L1 7.98293L13.5068 7.98293Z"
        fill={fill || "none"}
      />
      <path
        d="M13.5068 7.98293L1 7.98293"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.48977 14L7.48977 1.4932L7.48977 14Z"
        fill={fill || "none"}
      />
      <path
        d="M7.48977 14L7.48977 1.4932"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusActionIcon;
