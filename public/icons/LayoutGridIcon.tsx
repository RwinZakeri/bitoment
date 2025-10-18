import React from "react";

interface LayoutGridIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const LayoutGridIcon: React.FC<LayoutGridIconProps> = ({
  width = 25,
  height = 25,
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.25 9.89575C7.97589 9.89575 9.375 8.49664 9.375 6.77075C9.375 5.04486 7.97589 3.64575 6.25 3.64575C4.52411 3.64575 3.125 5.04486 3.125 6.77075C3.125 8.49664 4.52411 9.89575 6.25 9.89575Z"
        fill="#15E0CC"
        stroke="black"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M21.875 16.1458H16.6667V21.3541H21.875V16.1458Z"
        fill="#15E0CC"
        stroke="black"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M2.08334 13.0208H22.9167"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LayoutGridIcon;
