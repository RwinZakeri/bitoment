import React from "react";

interface DocumentWithEyeIconProps {
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

const DocumentWithEyeIcon: React.FC<DocumentWithEyeIconProps> = ({
  width = 24,
  height = 24,
  className = "",
  stroke = "black",
  strokeWidth = 2,
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
        d="M10.8 21.6003H4.79998C3.4745 21.6003 2.39999 20.5258 2.39999 19.2003L2.40009 4.80038C2.4001 3.4749 3.47461 2.40039 4.80009 2.40039H15.6004C16.9258 2.40039 18.0004 3.47491 18.0004 4.80039V9.60039M17.4 17.3494V17.2862M6.60037 7.20039H13.8004M6.60037 10.8004H13.8004M6.60037 14.4004H10.2004M21.6 17.4004C21.6 17.4004 20.6038 20.3401 17.4 20.2887C14.1961 20.2374 13.2 17.4004 13.2 17.4004C13.2 17.4004 14.1558 14.4094 17.4 14.4094C20.6442 14.4094 21.6 17.4004 21.6 17.4004Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DocumentWithEyeIcon;
