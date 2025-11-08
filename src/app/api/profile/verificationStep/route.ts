import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import {
  GetVerificationStepResponse,
  User,
  VerificationStepData,
} from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetVerificationStepResponse>> {
  const tokenPayload = verifyAuthToken(request);

  if (!tokenPayload) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
      verificationStep: {} as VerificationStepData,
    });
  }

  const verificationStep: VerificationStepData = {
    verificationStep: 1,
    steps: [
      {
        stepName: "Basic Level",
        passSteps: [
          {
            subStepName: "Initial Registration",
            isPassed: true,
          },
        ],
      },
      {
        stepName: "Intermediate Level",
        passSteps: [
          {
            subStepName: "Phone Number Verification",
            isPassed: false,
          },
          {
            subStepName: "Identity Information Submission",
            isPassed: false,
          },
        ],
      },
      {
        stepName: "Advanced Level",
        passSteps: [
          {
            subStepName: "Upload National ID Card",
            isPassed: false,
          },
          {
            subStepName: "Identity Selfie",
            isPassed: false,
          },
        ],
      },
    ],
  };

  const user = (await db
    .prepare(
      `
      SELECT * FROM users WHERE id = ?
    `
    )
    .get(tokenPayload.data.userId)) as User | undefined;

  if (!user) {
    return NextResponse.json({
      status: 404,
      message: "User not found",
      verificationStep: {} as VerificationStepData,
    });
  }

  verificationStep.steps[0].passSteps[0].isPassed = true;

  if (
    user.phoneNumber &&
    typeof user.phoneNumber === "string" &&
    user.phoneNumber.length > 0
  ) {
    verificationStep.steps[1].passSteps[0].isPassed = true;
  }

  if (user.nationalInsuranceNumber && user.birthDate) {
    verificationStep.steps[1].passSteps[1].isPassed = true;
  }

  const allIntermediatePassed = verificationStep.steps[1].passSteps.every(
    (step) => step.isPassed
  );

  const allAdvancedPassed = verificationStep.steps[2].passSteps.every(
    (step) => step.isPassed
  );

  if (allAdvancedPassed) {
    verificationStep.verificationStep = 3;
  } else if (allIntermediatePassed) {
    verificationStep.verificationStep = 2;
  } else {
    verificationStep.verificationStep = 1;
  }

  return NextResponse.json({
    status: 200,
    verificationStep: verificationStep,
  });
}
