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
  walletCpgLinks: "walletCpgLinks",
  walletRiskReport: "walletRiskReport",
  walletCpgSingle: "walletCpgSingle",

  // Session related
  sessions: "sessions",

  // asset
  assetDistribution: "assetDistributionData",

  // crypto
  allCrypto: "allCrypto",

  // swap
  swapHistory: "swapHistory",

  currency : "currency"
} as const;

export default ReactQueryKey;
