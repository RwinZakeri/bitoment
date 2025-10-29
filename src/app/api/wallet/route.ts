import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import {
  AddMoneyRequest,
  AddMoneyResponse,
  DeleteMoneyRequest,
  DeleteMoneyResponse,
  GetWalletResponse,
  Wallet,
} from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/wallet
 * Get user's wallet balance
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<GetWalletResponse>> {
  try {
    const tokenPayload = verifyAuthToken(request);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }
    


    const userId = tokenPayload.data.userId;


    const wallet = db
      .prepare("SELECT * FROM wallets WHERE user_id = ?")
      .get(userId) as Wallet | undefined;

    if (!wallet) {
      return NextResponse.json(
        {
          success: false,
          message: "Wallet not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Wallet retrieved successfully",
      wallet: wallet,
    });
  } catch (error) {
    console.error("Get wallet error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wallet
 * Add money to wallet
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<AddMoneyResponse>> {
  try {
    const tokenPayload = verifyAuthToken(request);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { amount }: AddMoneyRequest = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid amount is required (must be greater than 0)",
        },
        { status: 400 }
      );
    }

    const userId = tokenPayload.data.userId;

    // Get current wallet
    const wallet = db
      .prepare("SELECT * FROM wallets WHERE user_id = ?")
      .get(userId) as Wallet | undefined;

    if (!wallet) {
      return NextResponse.json(
        {
          success: false,
          message: "Wallet not found",
        },
        { status: 404 }
      );
    }

    // Update wallet balance
    const newBalance = wallet.balance + amount;
    const updateWallet = db.prepare(`
      UPDATE wallets 
      SET balance = ?, updated_at = datetime('now')
      WHERE user_id = ?
    `);

    updateWallet.run(newBalance, userId);

    // Get updated wallet
    const updatedWallet = db
      .prepare("SELECT * FROM wallets WHERE user_id = ?")
      .get(userId) as Wallet;

    return NextResponse.json(
      {
        success: true,
        message: `Successfully added ${amount} to wallet`,
        wallet: updatedWallet,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add money error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/wallet
 * Delete money from wallet (reduce balance)
 */
export async function PUT(
  request: NextRequest
): Promise<NextResponse<DeleteMoneyResponse>> {
  try {
    const tokenPayload = verifyAuthToken(request);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { amount }: DeleteMoneyRequest = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid amount is required (must be greater than 0)",
        },
        { status: 400 }
      );
    }

    const userId = tokenPayload.data.userId;

    // Get current wallet
    const wallet = db
      .prepare("SELECT * FROM wallets WHERE user_id = ?")
      .get(userId) as Wallet | undefined;

    if (!wallet) {
      return NextResponse.json(
        {
          success: false,
          message: "Wallet not found",
        },
        { status: 404 }
      );
    }

    // Check if user has sufficient balance
    if (wallet.balance < amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Insufficient balance",
        },
        { status: 400 }
      );
    }

    // Update wallet balance
    const newBalance = wallet.balance - amount;
    const updateWallet = db.prepare(`
      UPDATE wallets 
      SET balance = ?, updated_at = datetime('now')
      WHERE user_id = ?
    `);

    updateWallet.run(newBalance, userId);

    // Get updated wallet
    const updatedWallet = db
      .prepare("SELECT * FROM wallets WHERE user_id = ?")
      .get(userId) as Wallet;

    return NextResponse.json(
      {
        success: true,
        message: `Successfully deducted ${amount} from wallet`,
        wallet: updatedWallet,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete money error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/wallet
 * Reset wallet balance to 0
 */
export async function DELETE(
  request: NextRequest
): Promise<NextResponse<DeleteMoneyResponse>> {
  try {
    const tokenPayload = verifyAuthToken(request);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const userId = tokenPayload.data.userId;

    // Get current wallet
    const wallet = db
      .prepare("SELECT * FROM wallets WHERE user_id = ?")
      .get(userId) as Wallet | undefined;

    if (!wallet) {
      return NextResponse.json(
        {
          success: false,
          message: "Wallet not found",
        },
        { status: 404 }
      );
    }

    // Reset wallet balance to 0
    const updateWallet = db.prepare(`
      UPDATE wallets 
      SET balance = 0, updated_at = datetime('now')
      WHERE user_id = ?
    `);

    updateWallet.run(userId);

    // Get updated wallet
    const updatedWallet = db
      .prepare("SELECT * FROM wallets WHERE user_id = ?")
      .get(userId) as Wallet;

    return NextResponse.json(
      {
        success: true,
        message: "Wallet balance reset to 0",
        wallet: updatedWallet,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete wallet balance error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
