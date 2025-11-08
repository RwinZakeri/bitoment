const ReactQueryKey = {
  
  profile: "profile",
  devices: "devices",
  mobileDevices: "mobileDevices",
  activeDevices: "activeDevices",
  desktopDevices: "desktopDevices",
  profileVerificationStep: "profileVerificationStep",

  
  wallet: "wallet",
  walletBalance: "walletBalance",
  walletHistory: "walletHistory",
  walletAssetDistribution: "walletAssetDistribution",
  walletCpgLinks: "walletCpgLinks",
  walletRiskReport: "walletRiskReport",
  walletCpgSingle: "walletCpgSingle",

  
  sessions: "sessions",

  
  assetDistribution: "assetDistributionData",

  
  allCrypto: "allCrypto",

  
  swapHistory: "swapHistory",

  currency : "currency"
} as const;

export default ReactQueryKey;
