import React from "react";

interface ReceiveActionIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
  stroke?: string;
}

const ReceiveActionIcon: React.FC<ReceiveActionIconProps> = ({
  width = 19,
  height = 20,
  className = "",
  fill,
  stroke,
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
        fill={fill || "none"}
      />
      <path
        d="M12.7934 16.9318L5.29343 3.94141"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9858 8.68009L12.7939 16.9315L4.55109 14.7046"
        fill={fill || "none"}
      />
      <path
        d="M14.9858 8.68009L12.7939 16.9315L4.55109 14.7046"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReceiveActionIcon;
