import React from "react";

interface EyeOffIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

const EyeOffIcon: React.FC<EyeOffIconProps> = ({
  width = 20,
  height = 13,
  stroke = "#AAAAAA",
  strokeWidth = 1.5,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.41044 5.74963C1.13681 6.0846 1 6.25208 1 6.5C1 6.74792 1.13681 6.9154 1.41044 7.25037C2.63989 8.75544 5.7797 12 10 12C14.2203 12 17.3601 8.75544 18.5896 7.25037C18.8632 6.9154 19 6.74792 19 6.5C19 6.25208 18.8632 6.0846 18.5896 5.74963C17.3601 4.24456 14.2203 1 10 1C5.7797 1 2.63989 4.24456 1.41044 5.74963Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M7.29971 6.49997C7.29971 5.19816 8.50854 4.14283 9.99971 4.14283C11.4909 4.14283 12.6997 5.19816 12.6997 6.49997C12.6997 7.80179 11.4909 8.85712 9.99971 8.85712C8.50854 8.85712 7.29971 7.80179 7.29971 6.49997Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M1 1L19 12"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EyeOffIcon;
