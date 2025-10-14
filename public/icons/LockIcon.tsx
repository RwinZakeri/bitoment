import React from "react";

interface LockIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

const LockIcon: React.FC<LockIconProps> = ({
  width = 17,
  height = 17,
  stroke = "#AAAAAA",
  strokeWidth = 1.5,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.25107 13.6335C1.4619 14.8862 2.75887 15.8676 4.33718 15.9257C5.66526 15.9745 7.01435 16 8.5 16C9.98565 16 11.3347 15.9745 12.6628 15.9257C14.2411 15.8676 15.5381 14.8862 15.7489 13.6335C15.8865 12.816 16 11.9782 16 11.125C16 10.2717 15.8865 9.43394 15.7489 8.61639C15.5381 7.36371 14.2411 6.38231 12.6628 6.32426C11.3347 6.27542 9.98565 6.24994 8.5 6.24994C7.01435 6.24994 5.66526 6.27542 4.33718 6.32426C2.75887 6.38231 1.4619 7.36371 1.25107 8.61639C1.11348 9.43394 0.999998 10.2717 0.999998 11.125C0.999998 11.9782 1.11348 12.816 1.25107 13.6335Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M4.28133 6.25002V4.37502C4.28133 2.51105 6.17012 1 8.50008 1C10.83 1 12.7188 2.51105 12.7188 4.37502V6.25002"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.49634 11.1251H8.50476"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LockIcon;
