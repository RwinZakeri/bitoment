import { v4 as uuid } from "uuid";

import { StepperPropsType } from "./type";

const Stepper = ({ passedSteps, steps, onStepClick }: StepperPropsType) => {
  return (
    <div className="flex gap-12 items-center justify-center">
      {steps.map((item, index) => {
        const isSelected = passedSteps === index + 1;
        const isPassed = passedSteps > index + 1;

        const isLastStep = steps.length === index + 1;
        const shouldFill = isPassed || isSelected;

        return (
          <div key={uuid()} className="flex items-center flex-col gap-1">
            <div
              onClick={() => onStepClick?.(index)}
              className={`relative w-6 h-6 rounded-full border cursor-pointer transition-all ${
                shouldFill ? "bg-cyan-400 border-cyan-400" : "border-gray-400"
              } ${
                !isLastStep
                  ? shouldFill
                    ? "after:content-[''] after:block after:absolute after:w-12 after:h-px after:bg-cyan-400 after:top-1/2 after:left-full after:-translate-y-1/2"
                    : "after:content-[''] after:block after:absolute after:w-12 after:h-px after:bg-gray-400 after:top-1/2 after:left-full after:-translate-y-1/2"
                  : ""
              } ${isSelected ? "ring-2 ring-cyan-400 ring-offset-2" : ""}`}
            ></div>
            <p
              onClick={() => onStepClick?.(index)}
              className={`text-xs cursor-pointer transition-colors ${
                isSelected
                  ? "text-cyan-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;

/*

step index
4      4

*/
