import React from "react";

interface SwapActionIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
  stroke?: string;
}

const SwapActionIcon: React.FC<SwapActionIconProps> = ({
  width = 17,
  height = 19,
  className = "",
  fill,
  stroke,
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
        fill={fill || "none"}
      />
      <path
        d="M15.9995 5.13674L3.49268 5.13674"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2376 1.39163L16.0001 5.13673L12.2376 8.88184"
        fill={fill || "none"}
      />
      <path
        d="M12.2376 1.39163L16.0001 5.13673L12.2376 8.88184"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.00043 14.2549L13.5072 14.2549L1.00043 14.2549Z"
        fill={fill || "none"}
      />
      <path
        d="M1.00043 14.2549L13.5072 14.2549"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.76245 18L1 14.2549L4.76245 10.5098"
        fill={fill || "none"}
      />
      <path
        d="M4.76245 18L1 14.2549L4.76245 10.5098"
        stroke={stroke || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SwapActionIcon;
