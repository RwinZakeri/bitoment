import React from "react";

interface TrashIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const TrashIcon: React.FC<TrashIconProps> = ({
  width = 20,
  height = 20,
  color = "#F72E2E",
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
        d="M3.33331 5.14706H16.6666M7.49998 2.5H12.5M8.33331 13.9706V8.67647M11.6666 13.9706V8.67647M12.9166 17.5H7.08331C6.16284 17.5 5.41665 16.7099 5.41665 15.7353L5.03615 6.06614C5.01642 5.56486 5.39491 5.14706 5.86876 5.14706H14.1312C14.605 5.14706 14.9835 5.56486 14.9638 6.06614L14.5833 15.7353C14.5833 16.7099 13.8371 17.5 12.9166 17.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: color, strokeOpacity: 1 }}
      />
    </svg>
  );
};

export default TrashIcon;
