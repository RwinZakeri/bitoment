import React from "react";

interface PlusIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  width = 15,
  height = 15,
  className = "",
  color = "currentColor",
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
        fill={color}
      />
      <path
        d="M13.5068 7.98293L1 7.98293"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.48977 14L7.48977 1.4932L7.48977 14Z"
        fill={color}
      />
      <path
        d="M7.48977 14L7.48977 1.4932"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
