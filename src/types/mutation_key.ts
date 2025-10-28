const MutationKey = {
  // Authentication mutations
  signUp: "signUp",
  signIn: "signIn",
  sendOtp: "sendOtp",
  verifyOtp: "verifyOtp",
  resetPassword: "resetPassword",

  // Profile mutations
  updateProfile: "updateProfile",

  // Session mutations
  createSession: "createSession",
  deleteSession: "deleteSession",
} as const;

export default MutationKey;
