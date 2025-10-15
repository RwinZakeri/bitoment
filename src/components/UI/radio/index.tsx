import { RadioProps as GlobalRadioProps } from "@/types";
import React from "react";

interface RadioProps extends GlobalRadioProps {
  label?: string;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({ id, ...props }) => {
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
