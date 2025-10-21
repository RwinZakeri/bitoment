import React from "react";

interface SearchIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  width = 20,
  height = 20,
  color = "#AAAAAA",
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
        d="M14.1057 14.2L17 17M16.0667 9.53333C16.0667 13.1416 13.1416 16.0667 9.53333 16.0667C5.92507 16.0667 3 13.1416 3 9.53333C3 5.92507 5.92507 3 9.53333 3C13.1416 3 16.0667 5.92507 16.0667 9.53333Z"
        stroke={color}
        strokeLinecap="round"
        style={{ stroke: color, strokeOpacity: 1 }}
      />
    </svg>
  );
};

export default SearchIcon;
