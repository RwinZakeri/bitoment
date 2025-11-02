const MutationKey = {
  // Authentication mutations
  signUp: "signUp",
  signIn: "signIn",
  sendOtp: "sendOtp",
  verifyOtp: "verifyOtp",
  resetPassword: "resetPassword",

  // Profile mutations
  updateProfile: "updateProfile",

  // Wallet mutations
  addMoney: "addMoney",
  deleteMoney: "deleteMoney",
  transferMoney: "transferMoney",
  investMoney: "investMoney",
  createCpgLink: "createCpgLink",

  // Session mutations
  createSession: "createSession",
  deleteSession: "deleteSession",
} as const;

export default MutationKey;
