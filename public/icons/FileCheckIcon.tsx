import React from "react";

interface FileCheckIconProps {
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
}

export const FileCheckIcon: React.FC<FileCheckIconProps> = ({
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
        d="M10.2998 21.6H5.49978C4.1743 21.6 3.09978 20.5254 3.09979 19.2L3.09989 4.80001C3.09989 3.47453 4.17441 2.40002 5.49989 2.40002H16.3002C17.6256 2.40002 18.7002 3.47454 18.7002 4.80002V11.4M13.9002 18.2L16.1002 20.4L20.9002 15.5998M7.30017 7.20002H14.5002M7.30017 10.8H14.5002M7.30017 14.4H10.9002"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
