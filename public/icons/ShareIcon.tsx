import React from "react";

interface ShareIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const ShareIcon: React.FC<ShareIconProps> = ({
  width = 20,
  height = 20,
  color = "#256BFD",
  className = "",
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
        d="M17.5001 9.54918L9.5001 4.25L9.5001 7.25C2.49994 8.75 2.49994 15.75 2.49994 15.75C2.49994 15.75 5.49994 11.75 9.5001 12.25L9.5001 15.35L17.5001 9.54918Z"
        stroke={color}
        strokeLinejoin="round"
        style={{ stroke: color, strokeOpacity: 1 }}
      />
    </svg>
  );
};

export default ShareIcon;
