import React from "react";

interface FileLockIconProps {
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
}

export const FileLockIcon: React.FC<FileLockIconProps> = ({
  width = 24,
  height = 24,
  className,
  stroke = "black",
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
        d="M9.59998 21.6H7.19998C5.21175 21.6 3.59998 19.9882 3.59998 18V5.99999C3.59998 4.01177 5.21175 2.39999 7.19998 2.39999H15.6C17.5882 2.39999 19.2 4.01177 19.2 5.99999V8.99999M15 15V13.8C15 12.8059 15.8059 12 16.8 12C17.7941 12 18.6 12.8059 18.6 13.8V15.6M14.4 21.6H19.2C19.8627 21.6 20.4 21.0627 20.4 20.4V16.8C20.4 16.1373 19.8627 15.6 19.2 15.6H14.4C13.7372 15.6 13.2 16.1373 13.2 16.8V20.4C13.2 21.0627 13.7372 21.6 14.4 21.6Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
