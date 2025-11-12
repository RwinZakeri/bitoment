import React from "react";

interface CylinderIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const CylinderIcon: React.FC<CylinderIconProps> = ({
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
      <g clipPath="url(#clip0_34_586)">
        <path
          d="M22.9166 5.2085C22.9166 6.93438 18.2529 8.3335 12.5 8.3335C6.74701 8.3335 2.08331 6.93438 2.08331 5.2085C2.08331 3.48261 6.74701 2.0835 12.5 2.0835C18.2529 2.0835 22.9166 3.48261 22.9166 5.2085Z"
          fill="var(--primary-cyan-400)"
          stroke="currentColor"
          strokeWidth="2.91667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.9166 19.7917C22.9166 21.5176 18.2529 22.9167 12.5 22.9167C6.74701 22.9167 2.08331 21.5176 2.08331 19.7917C2.08331 18.0659 6.74701 16.6667 12.5 16.6667C18.2529 16.6667 22.9166 18.0659 22.9166 19.7917Z"
          fill="var(--primary-cyan-400)"
          stroke="currentColor"
          strokeWidth="2.91667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.9167 5.2085V19.7918"
          stroke="currentColor"
          strokeWidth="2.91667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.08331 5.2085V19.7918"
          stroke="currentColor"
          strokeWidth="2.91667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_34_586">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CylinderIcon;
