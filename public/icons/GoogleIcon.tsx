import React from "react";

interface GoogleIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({
  width = 20,
  height = 20,
  fill,
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4403 5.92546C12.5075 5.03364 11.3212 4.57955 9.99981 4.57955C7.65593 4.57955 5.67199 6.16245 4.96409 8.28943V8.29001C4.78409 8.83001 4.68182 9.40683 4.68182 10C4.68182 10.5932 4.78409 11.17 4.96409 11.71L4.96396 11.7101C5.67174 13.8373 7.65579 15.4204 9.99981 15.4204C11.2107 15.4204 12.2416 15.1013 13.0475 14.5613L13.0477 14.5614C14.0009 13.9232 14.635 12.97 14.8436 11.845H10V8.36362H18.4764C18.5827 8.95271 18.64 9.56634 18.64 10.2045C18.64 12.9454 17.6582 15.2527 15.9564 16.8195H15.9561C14.467 18.194 12.4298 18.9999 9.99981 18.9999C6.48163 18.9999 3.43799 16.9831 1.95708 14.0418V14.0414C1.34765 12.8265 1 11.4521 1 10C1 8.54778 1.34771 7.17327 1.95722 5.95829L1.95708 5.95818C3.43799 3.01682 6.48163 1 9.99981 1C12.4257 1 14.463 1.89182 16.0216 3.34409L13.4403 5.92546Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};

export default GoogleIcon;
