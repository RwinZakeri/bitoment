import React from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  variant?: "default" | "turquoise";
}

const Radio: React.FC<RadioProps> = ({
  label,
  className,
  variant = "turquoise",
  id,
  ...props
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input type="radio" id={id} className="sr-only" {...props} />
        <label htmlFor={id}>
          <div id="dot">
            <div id="innerDot"></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Radio;
