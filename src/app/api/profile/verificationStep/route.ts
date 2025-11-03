import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import { User } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tokenPayload = verifyAuthToken(request);

  if (!tokenPayload) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  const verificationStep = {
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
    .get(tokenPayload.data.userId)) as User;

  console.log(user);

  if (user.phoneNumber) {
    verificationStep.steps[1].passSteps[0].isPassed = true;
  }

  if (user.nationalInsuranceNumber && user.birthDate) {
    verificationStep.steps[1].passSteps[1].isPassed = true;
  }

  if (
    verificationStep.steps[1].passSteps[0].isPassed &&
    verificationStep.steps[1].passSteps[1].isPassed
  ) {
    verificationStep.verificationStep = 2;
  }

  return NextResponse.json({
    status: 200,
    verificationStep: verificationStep,
  });
}
