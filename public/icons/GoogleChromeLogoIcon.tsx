import React from "react";

interface GoogleChromeLogoIconProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

const GoogleChromeLogoIcon: React.FC<GoogleChromeLogoIconProps> = ({
  width = 24,
  height = 24,
  className = "",
  strokeColor = "#616161",
  strokeWidth = 1,
  strokeOpacity = 1,
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
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke={strokeColor}
        style={{ stroke: strokeColor, strokeOpacity }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.375C13.864 15.375 15.375 13.864 15.375 12C15.375 10.136 13.864 8.625 12 8.625C10.136 8.625 8.625 10.136 8.625 12C8.625 13.864 10.136 15.375 12 15.375Z"
        stroke={strokeColor}
        style={{ stroke: strokeColor, strokeOpacity }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.625H20.3438"
        stroke={strokeColor}
        style={{ stroke: strokeColor, strokeOpacity }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.07501 13.6875L4.90314 6.45935"
        stroke={strokeColor}
        style={{ stroke: strokeColor, strokeOpacity }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.925 13.6875L10.7531 20.9156"
        stroke={strokeColor}
        style={{ stroke: strokeColor, strokeOpacity }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GoogleChromeLogoIcon;
