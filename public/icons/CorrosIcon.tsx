import React from "react";

interface CorrosIconProps {
  width?: number;
  height?: number;
  className?: string;
  circleFill?: string;
  pathFill?: string;
  onClick?: () => void;
}

const CorrosIcon: React.FC<CorrosIconProps> = ({
  width = 20,
  height = 20,
  className = "",
  circleFill = "#DDDDDD",
  pathFill = "black",
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <circle cx="10" cy="10" r="10" fill={circleFill} />
      <path
        d="M12.1836 8.24991L10.4491 9.98444L12.1992 11.7345L11.6936 12.2401L9.94353 10.49L8.21678 12.2168L7.75009 11.7501L9.47684 10.0233L7.72675 8.27325L8.23234 7.76766L9.98243 9.51775L11.717 7.78322L12.1836 8.24991Z"
        fill={pathFill}
      />
    </svg>
  );
};

export default CorrosIcon;
