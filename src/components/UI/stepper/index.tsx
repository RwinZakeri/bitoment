import { v4 as uuid } from "uuid";

import { StepperPropsType } from "./type";

const Stepper = ({ passedSteps, steps }: StepperPropsType) => {
  return (
    <div className="flex gap-12 items-center">
      {steps.map((item, index) => (
        <div key={uuid()} className="flex items-center flex-col gap-1">
          <div
            className={`relative border-gray-400  w-6 h-6 rounded-full border-[1px]   ${
              steps.length === index + 1
                ? ""
                : passedSteps >= index + 1
                ? "after:content-[''] bg-cyan-400 after:block after:absolute after:w-12 after:h-[1px] after:bg-cyan-400 after:top-1/2 after:left-full after:-translate-y-1/2 !border-cyan-400"
                : "after:content-[''] after:block after:absolute after:w-12 after:h-[1px] after:bg-gray-400 after:top-1/2 after:left-full after:-translate-y-1/2 "
            } `}
          ></div>
          <p className="text-xs text-gray-500">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;

/*

step index
4      4

*/
