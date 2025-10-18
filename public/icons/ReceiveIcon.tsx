import React from "react";

interface ReceiveIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

const ReceiveIcon: React.FC<ReceiveIconProps> = ({
  width = 19,
  height = 20,
  className = "",
  color = "currentColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7934 16.9318L5.29343 3.94141L12.7934 16.9318Z"
        fill={color}
      />
      <path
        d="M12.7934 16.9318L5.29343 3.94141"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9858 8.68009L12.7939 16.9315L4.55109 14.7046"
        fill={color}
      />
      <path
        d="M14.9858 8.68009L12.7939 16.9315L4.55109 14.7046"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReceiveIcon;
