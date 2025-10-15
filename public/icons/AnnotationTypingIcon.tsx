import React from "react";

interface AnnotationTypingIconProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

const AnnotationTypingIcon: React.FC<AnnotationTypingIconProps> = ({
  width = 24,
  height = 24,
  className = "",
  strokeColor = "#222124",
  strokeWidth = 1,
  strokeOpacity = 1,
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
        d="M7.20002 9.69026V9.60002M12 9.69026V9.60002M16.8 9.69026V9.60002M14.6087 16.5913L12 21.6L9.60002 16.5913H4.80002C3.47454 16.5913 2.40002 15.5168 2.40002 14.1913V4.80003C2.40002 3.47454 3.47454 2.40002 4.80002 2.40002H19.2C20.5255 2.40002 21.6 3.47454 21.6 4.80002V14.1913C21.6 15.5168 20.5255 16.5913 19.2 16.5913H14.6087Z"
        stroke={strokeColor}
        style={{ stroke: strokeColor, strokeOpacity }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AnnotationTypingIcon;
