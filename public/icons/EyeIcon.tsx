import React from "react";

interface EyeIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({
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
        d="M18.5896 5.74963C18.8632 6.0846 19 6.25208 19 6.5C19 6.74792 18.8632 6.9154 18.5896 7.25037C17.3601 8.75544 14.2203 12 10 12C5.7797 12 2.63989 8.75544 1.41044 7.25037C1.13681 6.9154 1 6.74792 1 6.5C1 6.25208 1.13681 6.0846 1.41044 5.74963C2.63989 4.24456 5.7797 1 10 1C14.2203 1 17.3601 4.24456 18.5896 5.74963Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M12.7003 6.49997C12.7003 5.19816 11.4915 4.14283 10.0003 4.14283C8.50912 4.14283 7.30029 5.19816 7.30029 6.49997C7.30029 7.80179 8.50912 8.85712 10.0003 8.85712C11.4915 8.85712 12.7003 7.80179 12.7003 6.49997Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default EyeIcon;
