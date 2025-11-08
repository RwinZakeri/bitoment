import React from "react";

interface ListIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const ListIcon: React.FC<ListIconProps> = ({
  width = 24,
  height = 21,
  color = "#5B5B5B",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.7201 5.14307H21.6001M8.7201 10.6974H21.6001M8.7201 16.2516H21.6001M3.6001 5.14307V5.15404M3.6001 10.6974V10.7083M3.6001 16.2516V16.2626"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ListIcon;
