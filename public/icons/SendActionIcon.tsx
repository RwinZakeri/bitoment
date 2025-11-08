import React from "react";

interface SendActionIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
  stroke?: string;
}

const SendActionIcon: React.FC<SendActionIconProps> = ({
  width = 20,
  height = 20,
  className = "",
  fill,
  stroke,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3466 5.1336L4.73995 15.7402L15.3466 5.1336Z"
        fill={fill || "none"}
      />
      <path
        d="M15.3466 5.1336L4.73995 15.7402"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.80881 5.15146L15.3464 5.13307L15.3287 13.6714"
        fill={fill || "none"}
      />
      <path
        d="M6.80881 5.15146L15.3464 5.13307L15.3287 13.6714"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendActionIcon;
