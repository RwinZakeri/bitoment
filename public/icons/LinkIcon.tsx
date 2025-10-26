import React from "react";

interface LinkIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const LinkIcon: React.FC<LinkIconProps> = ({
  width = 24,
  height = 27,
  className = "",
  color = "#F6F6F6",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.0116 8.38428L6.85304 8.38428C5.6734 8.38428 4.53167 8.90555 3.69442 9.8614C2.85717 10.8173 2.3815 12.0989 2.40058 13.4675C2.38145 14.836 2.85731 16.1178 3.69442 17.0735C4.55063 18.051 5.65425 18.5724 6.83394 18.5724H9.99252M13.9884 18.6159H17.147C18.3267 18.6159 19.4684 18.0946 20.3056 17.1387C21.1429 16.1829 21.6185 14.9013 21.5995 13.5327C21.5995 12.1859 21.1238 10.9043 20.2865 9.94841C19.4493 8.99256 18.3267 8.44951 17.147 8.44949H13.9884M7.25247 13.4526L16.7282 13.4526"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LinkIcon;
