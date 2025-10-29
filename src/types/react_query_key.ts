const ReactQueryKey = {
  // Profile related
  profile: "profile",
  devices: "devices",
  mobileDevices: "mobileDevices",
  activeDevices: "activeDevices",
  desktopDevices: "desktopDevices",
  profileVerificationStep: "profileVerificationStep",

  // Wallet related
  wallet: "wallet",
  walletBalance: "walletBalance",
  walletHistory: "walletHistory",
  walletAssetDistribution: "walletAssetDistribution",

  // Session related
  sessions: "sessions",
} as const;

export default ReactQueryKey;
