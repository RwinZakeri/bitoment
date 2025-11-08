const MutationKey = {
  
  signUp: "signUp",
  signIn: "signIn",
  sendOtp: "sendOtp",
  verifyOtp: "verifyOtp",
  resetPassword: "resetPassword",

  
  updateProfile: "updateProfile",
  updateSettings: "updateSettings",

  
  addMoney: "addMoney",
  deleteMoney: "deleteMoney",
  transferMoney: "transferMoney",
  investMoney: "investMoney",
  createCpgLink: "createCpgLink",

  
  createSession: "createSession",
  deleteSession: "deleteSession",
} as const;

export default MutationKey;
