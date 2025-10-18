import React from "react";

interface SwapIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

const SwapIcon: React.FC<SwapIconProps> = ({
  width = 17,
  height = 19,
  className = "",
  color = "currentColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9995 5.13674L3.49268 5.13674L15.9995 5.13674Z"
        fill={color}
      />
      <path
        d="M15.9995 5.13674L3.49268 5.13674"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2376 1.39163L16.0001 5.13673L12.2376 8.88184"
        fill={color}
      />
      <path
        d="M12.2376 1.39163L16.0001 5.13673L12.2376 8.88184"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.00043 14.2549L13.5072 14.2549L1.00043 14.2549Z"
        fill={color}
      />
      <path
        d="M1.00043 14.2549L13.5072 14.2549"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.76245 18L1 14.2549L4.76245 10.5098"
        fill={color}
      />
      <path
        d="M4.76245 18L1 14.2549L4.76245 10.5098"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SwapIcon;
