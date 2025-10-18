import React from "react";

interface CircularProgressIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const CircularProgressIcon: React.FC<CircularProgressIconProps> = ({
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
        d="M12.5 22.9166C18.253 22.9166 22.9167 18.2529 22.9167 12.4999C22.9167 6.74695 18.253 2.08325 12.5 2.08325C6.74704 2.08325 2.08334 6.74695 2.08334 12.4999C2.08334 18.2529 6.74704 22.9166 12.5 22.9166Z"
        stroke="black"
        strokeWidth="2.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 2.08325C13.923 2.08325 15.331 2.37482 16.637 2.93998C17.943 3.50513 19.1193 4.33188 20.0934 5.36924L12.5 12.4999V2.08325Z"
        fill="#15E0CC"
        stroke="black"
        strokeWidth="2.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CircularProgressIcon;
