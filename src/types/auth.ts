// Authentication related types

// OTP State enum
export enum OTPState {
  EMAIL_SENT = 0, // Email successfully sent
  SENT_AND_USED = 1, // Sent and used
  PASSWORD_RESET = 2, // Password reset
}

export interface SignUpRequest {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    fullName?: string;
  };
  token?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    fullName?: string;
  };
  token?: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  phoneNumber?: string;
  nationalInsuranceNumber?: string;
  birthDate?: string;
  created_at: string;
}

export interface JWTPayload {
  data: {
    userId: number;
    email: string;
    iat?: number;
    exp?: number;
  };
}

// OTP related types
export interface SendOTPRequest {
  email: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  valid?: boolean;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// Device related types
export interface DeviceInfo {
  id: number;
  user_id: number;
  device_id: string;
  device_name?: string;
  device_type?: string;
  operating_system?: string;
  browser?: string;
  browser_version?: string;
  user_agent?: string;
  ip_address?: string;
  location?: string;
  is_active: boolean;
  last_seen: string;
  created_at: string;
}

export interface CreateDeviceRequest {
  device_id: string;
  device_name?: string;
  device_type?: string;
  operating_system?: string;
  browser?: string;
  browser_version?: string;
  user_agent?: string;
  ip_address?: string;
  location?: string;
}

export interface CreateDeviceResponse {
  success: boolean;
  message: string;
  device?: DeviceInfo;
}

export interface GetDevicesResponse {
  success: boolean;
  message: string;
  devices?: DeviceInfo[];
}

export interface UpdateDeviceRequest {
  device_id: string;
  device_name?: string;
  is_active?: boolean;
}

export interface UpdateDeviceResponse {
  success: boolean;
  message: string;
  device?: DeviceInfo;
}

export interface DeleteDeviceRequest {
  device_id: string;
}

export interface DeleteDeviceResponse {
  success: boolean;
  message: string;
}

// Login session related types
export interface LoginSession {
  id: number;
  user_email: string;
  device_name?: string;
  os?: string;
  browser?: string;
  ip?: string;
  created_at: string;
}

export interface LoginSessionResponse {
  success: boolean;
  message: string;
  sessions?: LoginSession[];
}

// Wallet related types
export interface Wallet {
  id: number;
  user_id: number;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface GetWalletResponse {
  success: boolean;
  message: string;
  wallet?: Wallet;
}

export interface AddMoneyRequest {
  amount: number;
}

export interface AddMoneyResponse {
  success: boolean;
  message: string;
  wallet?: Wallet;
}

export interface DeleteMoneyRequest {
  amount: number;
}

export interface DeleteMoneyResponse {
  success: boolean;
  message: string;
  wallet?: Wallet;
}

// Wallet History related types
export interface Transaction {
  amount: string;
  title: string;
  icon: string;
  type: "up" | "down" | "link" | "cpg";
  price: string;
  dateAsName: string;
  hour: string;
  category?: "crypto" | "cpg";
}

export interface HistoryDay {
  date: string;
  dateAsName: string;
  hour: string;
  type: "up" | "down";
  transactions: Transaction[];
}

export interface GetWalletHistoryResponse {
  success: boolean;
  data: HistoryDay[];
}

// CPG Links related types
export interface CpgLink {
  id: number;
  user_id: number;
  link_id: string;
  order_id?: string;
  price: number;
  currency: string;
  url: string;
  status: "active" | "inactive" | "completed" | "expired";
  created_at: string;
  updated_at: string;
}

export interface CreateCpgLinkRequest {
  order_id?: string;
  price: number;
  currency: string;
  status?: "active" | "inactive" | "completed" | "expired";
}

export interface CreateCpgLinkResponse {
  success: boolean;
  message: string;
  link?: CpgLink;
}

export interface GetCpgLinksResponse {
  success: boolean;
  message: string;
  links?: CpgLink[];
}

export interface DeleteCpgLinkResponse {
  success: boolean;
  message: string;
}

// Google OAuth related types
export interface GoogleOAuthRequest {
  accessToken: string;
}

export interface GoogleOAuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    fullName?: string;
  };
  token?: string;
  isNewUser?: boolean;
}

export interface GoogleUserInfo {
  email: string;
  name: string;
  picture?: string;
  id: string;
}

// Verification Step related types
export interface VerificationSubStep {
  subStepName: string;
  isPassed: boolean;
}

export interface VerificationStepLevel {
  stepName: string;
  passSteps: VerificationSubStep[];
}

export interface VerificationStepData {
  verificationStep: number; // 1 = Basic, 2 = Intermediate, 3 = Advanced
  steps: VerificationStepLevel[];
}

export interface GetVerificationStepResponse {
  status: number;
  message?: string;
  verificationStep: VerificationStepData;
}
