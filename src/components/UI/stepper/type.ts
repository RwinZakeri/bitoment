export interface StepperPropsType {
  passedSteps: number;
  steps: string[];
  onStepClick?: (stepIndex: number) => void;
}
