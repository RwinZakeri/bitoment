import React from "react";

interface OutlinedIconProps {
  width?: number;
  height?: number;
  className?: string;
  fillColor?: string;
}

const UserIcon: React.FC<OutlinedIconProps> = ({
  width = 20,
  height = 18,
  className = "",
  fillColor = "#AAAAAA",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.4922 15.75C17.4922 16.1642 17.1568 16.5 16.743 16.5H3.25702C2.84324 16.5 2.5078 16.1642 2.5078 15.75C2.34131 12.25 4.83871 10.5 10 10.5C15.1613 10.5 17.6587 12.25 17.4922 15.75ZM10 12C6.11111 12 4.16667 13 4.16667 15H15.8333C15.8333 13 13.8889 12 10 12ZM10 9C7.69881 9 5.83333 7.32107 5.83333 5.25C5.83333 3.17893 7.69881 1.5 10 1.5C12.3012 1.5 14.1667 3.17893 14.1667 5.25C14.1667 7.32107 12.3012 9 10 9ZM10 7.5C11.3807 7.5 12.5 6.49264 12.5 5.25C12.5 4.00736 11.3807 3 10 3C8.61929 3 7.5 4.00736 7.5 5.25C7.5 6.49264 8.61929 7.5 10 7.5Z"
        fill={fillColor}
        style={{ fill: fillColor, fillOpacity: 1 }}
      />
    </svg>
  );
};

export default UserIcon;
