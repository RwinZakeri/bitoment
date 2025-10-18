import React from "react";

interface EtcIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const EtcIcon: React.FC<EtcIconProps> = ({
  width = 9,
  height = 14,
  color = "#080808",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.50104 3.43122C1.55004 4.9752 0.666168 6.42967 0.531908 6.65344L0.285767 7.05622L2.23253 8.19742C3.3066 8.82396 4.23523 9.33862 4.30235 9.33862C4.49256 9.33862 8.33013 7.07859 8.28538 7.00028C6.7414 4.44935 4.38067 0.656528 4.31354 0.634152C4.26879 0.622964 3.45205 1.87605 2.50104 3.43122Z"
        fill={color}
      />
      <path
        d="M0.453515 7.88434C0.520644 7.97384 1.39333 9.19336 2.40027 10.6031C3.39603 12.0016 4.25753 13.1428 4.30228 13.1428C4.35822 13.1428 7.72589 8.44375 8.03916 7.90671C8.0951 7.8284 7.7147 8.0186 7.21123 8.33187C6.70776 8.64514 5.84626 9.18218 5.29803 9.51782L4.30228 10.1444L2.60166 9.10386C1.66185 8.53326 0.766786 7.98503 0.61015 7.89552C0.375197 7.75008 0.35282 7.75008 0.453515 7.88434Z"
        fill={color}
      />
    </svg>
  );
};

export default EtcIcon;
