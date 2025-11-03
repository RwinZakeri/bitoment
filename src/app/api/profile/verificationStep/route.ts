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

  if (!user) {
    return NextResponse.json({
      status: 404,
      message: "User not found",
    });
  }

  // ========== Basic Level (Step 1) ==========
  // Initial Registration is always passed if user exists
  verificationStep.steps[0].passSteps[0].isPassed = true;

  // ========== Intermediate Level (Step 2) ==========
  // Check Phone Number Verification
  if (
    user.phoneNumber &&
    (typeof user.phoneNumber === "string"
      ? user.phoneNumber.length > 0
      : user.phoneNumber > 0)
  ) {
    verificationStep.steps[1].passSteps[0].isPassed = true;
  }

  // Check Identity Information Submission
  if (user.nationalInsuranceNumber && user.birthDate) {
    verificationStep.steps[1].passSteps[1].isPassed = true;
  }

  // Check if all Intermediate Level steps are passed
  const allIntermediatePassed = verificationStep.steps[1].passSteps.every(
    (step) => step.isPassed
  );

  // ========== Advanced Level (Step 3) ==========
  // Check Upload National ID Card (if column exists in database)
  // For now, this will remain false until database columns are added
  // You can add: if (user.nationalIdCard) { verificationStep.steps[2].passSteps[0].isPassed = true; }

  // Check Identity Selfie (if column exists in database)
  // For now, this will remain false until database columns are added
  // You can add: if (user.identitySelfie) { verificationStep.steps[2].passSteps[1].isPassed = true; }

  // Check if all Advanced Level steps are passed
  const allAdvancedPassed = verificationStep.steps[2].passSteps.every(
    (step) => step.isPassed
  );

  // ========== Calculate verificationStep based on completed levels ==========
  // verificationStep represents the current level (1 = Basic, 2 = Intermediate, 3 = Advanced)
  if (allAdvancedPassed) {
    // All levels completed, user is at Advanced Level
    verificationStep.verificationStep = 3;
  } else if (allIntermediatePassed) {
    // Intermediate Level completed, user is at Intermediate Level
    verificationStep.verificationStep = 2;
  } else {
    // Only Basic Level completed, user is at Basic Level
    verificationStep.verificationStep = 1;
  }

  return NextResponse.json({
    status: 200,
    verificationStep: verificationStep,
  });
}
