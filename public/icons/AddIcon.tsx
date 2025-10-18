import React from "react";

interface AddIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const AddIcon: React.FC<AddIconProps> = ({
  width = 20,
  height = 20,
  color = "#080808",
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
        d="M10.625 3.33325C10.625 2.98807 10.3452 2.70825 9.99998 2.70825C9.6548 2.70825 9.37498 2.98807 9.37498 3.33325L9.37498 9.37492H3.33331C2.98814 9.37492 2.70831 9.65474 2.70831 9.99992C2.70831 10.3451 2.98814 10.6249 3.33331 10.6249H9.37498V16.6666C9.37498 17.0118 9.6548 17.2916 9.99998 17.2916C10.3452 17.2916 10.625 17.0118 10.625 16.6666V10.6249H16.6666C17.0118 10.6249 17.2916 10.3451 17.2916 9.99992C17.2916 9.65474 17.0118 9.37492 16.6666 9.37492H10.625L10.625 3.33325Z"
        fill={color}
      />
    </svg>
  );
};

export default AddIcon;
