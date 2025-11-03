interface stepsType {
  subStepName: string;
  isPassed: boolean;
}
export interface verifyCardPropsType {
  steps: stepsType[];
  title: string;
  img: string;
  isPassed: boolean;
  index: number;
  passedSteps: number;
  stepsLength: number;
}

export const verifyLevel = [
  {
    title: "Basic Level",
    steps: [
      {
        title: "Initial Registration",
        isPassed: true,
      },
    ],
    img: "/svgs/level-one.svg",
    isPassed: true,
  },
  {
    title: "Intermediate Level",
    steps: [
      {
        title: "Phone Number Verification",
        isPassed: true,
      },
      {
        title: "Identity Information Submission",
        isPassed: false,
      },
    ],
    img: "/svgs/level-two.svg",
    isPassed: false,
  },
  {
    title: "Advanced Level",
    steps: [
      {
        title: "Upload National ID Card",
        isPassed: false,
      },
      {
        title: "Identity Selfie",
        isPassed: false,
      },
    ],
    img: "/svgs/threelayer.svg",
    isPassed: false,
  },
];
