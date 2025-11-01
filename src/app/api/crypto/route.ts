import { NextRequest, NextResponse } from "next/server";

interface CryptoCurrency {
  name: string;
  shortName: string;
  icon: string;
  price: string;
  percentage: string;
}

interface CryptoCurrencyConfig {
  name: string;
  shortName: string;
  icon: string;
  priceMin: number;
  priceMax: number;
}

// Helper function to generate random price
function generateRandomPrice(min: number, max: number): string {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Helper function to generate random percentage
function generateRandomPercentage(): string {
  const isPositive = Math.random() > 0.5;
  const value = (Math.random() * 15).toFixed(2);
  return isPositive ? `+${value}%` : `-${value}%`;
}

// Comprehensive list of cryptocurrencies with price ranges
const cryptoCurrenciesConfig: CryptoCurrencyConfig[] = [
  {
    name: "Bitcoin",
    shortName: "BTC",
    icon: "/svgs/btc.svg",
    priceMin: 40000,
    priceMax: 65000,
  },
  {
    name: "Ethereum",
    shortName: "ETH",
    icon: "/svgs/etc.svg",
    priceMin: 2000,
    priceMax: 4000,
  },
  {
    name: "Tether",
    shortName: "USDT",
    icon: "/svgs/tether.svg",
    priceMin: 0.99,
    priceMax: 1.01,
  },
  {
    name: "Solana",
    shortName: "SOL",
    icon: "/svgs/sol.svg",
    priceMin: 100,
    priceMax: 200,
  },
  {
    name: "BNB",
    shortName: "BNB",
    icon: "/svgs/binance.svg",
    priceMin: 300,
    priceMax: 600,
  },
  {
    name: "USD Coin",
    shortName: "USDC",
    icon: "/svgs/tether.svg",
    priceMin: 0.99,
    priceMax: 1.01,
  },
  {
    name: "XRP",
    shortName: "XRP",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 1.5,
  },
  {
    name: "Cardano",
    shortName: "ADA",
    icon: "/svgs/etc.svg",
    priceMin: 0.4,
    priceMax: 1.2,
  },
  {
    name: "Dogecoin",
    shortName: "DOGE",
    icon: "/svgs/etc.svg",
    priceMin: 0.08,
    priceMax: 0.15,
  },
  {
    name: "Polygon",
    shortName: "MATIC",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 1.5,
  },
  {
    name: "Polkadot",
    shortName: "DOT",
    icon: "/svgs/etc.svg",
    priceMin: 5,
    priceMax: 15,
  },
  {
    name: "Litecoin",
    shortName: "LTC",
    icon: "/svgs/etc.svg",
    priceMin: 60,
    priceMax: 100,
  },
  {
    name: "Shiba Inu",
    shortName: "SHIB",
    icon: "/svgs/etc.svg",
    priceMin: 0.000008,
    priceMax: 0.00002,
  },
  {
    name: "Avalanche",
    shortName: "AVAX",
    icon: "/svgs/etc.svg",
    priceMin: 30,
    priceMax: 60,
  },
  {
    name: "Chainlink",
    shortName: "LINK",
    icon: "/svgs/etc.svg",
    priceMin: 12,
    priceMax: 25,
  },
  {
    name: "Uniswap",
    shortName: "UNI",
    icon: "/svgs/etc.svg",
    priceMin: 5,
    priceMax: 12,
  },
  {
    name: "Cosmos",
    shortName: "ATOM",
    icon: "/svgs/corros.svg",
    priceMin: 8,
    priceMax: 15,
  },
  {
    name: "Algorand",
    shortName: "ALGO",
    icon: "/svgs/etc.svg",
    priceMin: 0.1,
    priceMax: 0.5,
  },
  {
    name: "Stellar",
    shortName: "XLM",
    icon: "/svgs/etc.svg",
    priceMin: 0.1,
    priceMax: 0.3,
  },
  {
    name: "VeChain",
    shortName: "VET",
    icon: "/svgs/etc.svg",
    priceMin: 0.02,
    priceMax: 0.06,
  },
  {
    name: "Filecoin",
    shortName: "FIL",
    icon: "/svgs/etc.svg",
    priceMin: 4,
    priceMax: 10,
  },
  {
    name: "Theta",
    shortName: "THETA",
    icon: "/svgs/etc.svg",
    priceMin: 0.8,
    priceMax: 2.5,
  },
  {
    name: "Ethereum Classic",
    shortName: "ETC",
    icon: "/svgs/etc.svg",
    priceMin: 20,
    priceMax: 40,
  },
  {
    name: "Monero",
    shortName: "XMR",
    icon: "/svgs/etc.svg",
    priceMin: 150,
    priceMax: 250,
  },
  {
    name: "TRON",
    shortName: "TRX",
    icon: "/svgs/etc.svg",
    priceMin: 0.08,
    priceMax: 0.15,
  },
  {
    name: "EOS",
    shortName: "EOS",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 1.5,
  },
  {
    name: "ApeCoin",
    shortName: "APE",
    icon: "/svgs/etc.svg",
    priceMin: 2,
    priceMax: 6,
  },
  {
    name: "Hedera",
    shortName: "HBAR",
    icon: "/svgs/etc.svg",
    priceMin: 0.05,
    priceMax: 0.12,
  },
  {
    name: "Internet Computer",
    shortName: "ICP",
    icon: "/svgs/etc.svg",
    priceMin: 8,
    priceMax: 20,
  },
  {
    name: "Axie Infinity",
    shortName: "AXS",
    icon: "/svgs/etc.svg",
    priceMin: 5,
    priceMax: 15,
  },
  {
    name: "The Sandbox",
    shortName: "SAND",
    icon: "/svgs/etc.svg",
    priceMin: 0.3,
    priceMax: 0.8,
  },
  {
    name: "Decentraland",
    shortName: "MANA",
    icon: "/svgs/etc.svg",
    priceMin: 0.3,
    priceMax: 0.7,
  },
  {
    name: "Fantom",
    shortName: "FTM",
    icon: "/svgs/etc.svg",
    priceMin: 0.2,
    priceMax: 0.6,
  },
  {
    name: "NEAR Protocol",
    shortName: "NEAR",
    icon: "/svgs/etc.svg",
    priceMin: 2,
    priceMax: 6,
  },
  {
    name: "Tezos",
    shortName: "XTZ",
    icon: "/svgs/etc.svg",
    priceMin: 0.8,
    priceMax: 1.5,
  },
  {
    name: "Elrond",
    shortName: "EGLD",
    icon: "/svgs/etc.svg",
    priceMin: 40,
    priceMax: 80,
  },
  {
    name: "Flow",
    shortName: "FLOW",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 1.2,
  },
  {
    name: "Aave",
    shortName: "AAVE",
    icon: "/svgs/etc.svg",
    priceMin: 60,
    priceMax: 120,
  },
  {
    name: "Maker",
    shortName: "MKR",
    icon: "/svgs/etc.svg",
    priceMin: 800,
    priceMax: 2000,
  },
  {
    name: "Compound",
    shortName: "COMP",
    icon: "/svgs/etc.svg",
    priceMin: 40,
    priceMax: 100,
  },
  {
    name: "Curve DAO Token",
    shortName: "CRV",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 1.5,
  },
  {
    name: "1inch Network",
    shortName: "1INCH",
    icon: "/svgs/etc.svg",
    priceMin: 0.3,
    priceMax: 0.8,
  },
  {
    name: "Zcash",
    shortName: "ZEC",
    icon: "/svgs/etc.svg",
    priceMin: 20,
    priceMax: 50,
  },
  {
    name: "Dash",
    shortName: "DASH",
    icon: "/svgs/etc.svg",
    priceMin: 30,
    priceMax: 70,
  },
  {
    name: "IOTA",
    shortName: "MIOTA",
    icon: "/svgs/etc.svg",
    priceMin: 0.2,
    priceMax: 0.5,
  },
  {
    name: "NEO",
    shortName: "NEO",
    icon: "/svgs/etc.svg",
    priceMin: 8,
    priceMax: 20,
  },
  {
    name: "Waves",
    shortName: "WAVES",
    icon: "/svgs/etc.svg",
    priceMin: 2,
    priceMax: 5,
  },
  {
    name: "Zilliqa",
    shortName: "ZIL",
    icon: "/svgs/etc.svg",
    priceMin: 0.02,
    priceMax: 0.05,
  },
  {
    name: "Enjin Coin",
    shortName: "ENJ",
    icon: "/svgs/etc.svg",
    priceMin: 0.2,
    priceMax: 0.5,
  },
  {
    name: "Basic Attention Token",
    shortName: "BAT",
    icon: "/svgs/etc.svg",
    priceMin: 0.2,
    priceMax: 0.4,
  },
  {
    name: "Gala",
    shortName: "GALA",
    icon: "/svgs/etc.svg",
    priceMin: 0.02,
    priceMax: 0.06,
  },
  {
    name: "Chiliz",
    shortName: "CHZ",
    icon: "/svgs/etc.svg",
    priceMin: 0.08,
    priceMax: 0.2,
  },
  {
    name: "Huobi Token",
    shortName: "HT",
    icon: "/svgs/etc.svg",
    priceMin: 3,
    priceMax: 8,
  },
  {
    name: "OKB",
    shortName: "OKB",
    icon: "/svgs/etc.svg",
    priceMin: 40,
    priceMax: 70,
  },
  {
    name: "Klaytn",
    shortName: "KLAY",
    icon: "/svgs/etc.svg",
    priceMin: 0.1,
    priceMax: 0.3,
  },
  {
    name: "Bitcoin Cash",
    shortName: "BCH",
    icon: "/svgs/etc.svg",
    priceMin: 200,
    priceMax: 400,
  },
  {
    name: "Terra",
    shortName: "LUNA",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 2,
  },
  {
    name: "Theta Fuel",
    shortName: "TFUEL",
    icon: "/svgs/etc.svg",
    priceMin: 0.05,
    priceMax: 0.15,
  },
  {
    name: "FLOKI",
    shortName: "FLOKI",
    icon: "/svgs/etc.svg",
    priceMin: 0.0001,
    priceMax: 0.0005,
  },
  {
    name: "Rocket Pool",
    shortName: "RPL",
    icon: "/svgs/etc.svg",
    priceMin: 20,
    priceMax: 50,
  },
  {
    name: "Arbitrum",
    shortName: "ARB",
    icon: "/svgs/etc.svg",
    priceMin: 0.8,
    priceMax: 2,
  },
  {
    name: "Optimism",
    shortName: "OP",
    icon: "/svgs/etc.svg",
    priceMin: 1.5,
    priceMax: 3.5,
  },
  {
    name: "Immutable X",
    shortName: "IMX",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 1.5,
  },
  {
    name: "Aptos",
    shortName: "APT",
    icon: "/svgs/etc.svg",
    priceMin: 5,
    priceMax: 15,
  },
  {
    name: "Sui",
    shortName: "SUI",
    icon: "/svgs/etc.svg",
    priceMin: 1,
    priceMax: 3,
  },
  {
    name: "Render Token",
    shortName: "RNDR",
    icon: "/svgs/etc.svg",
    priceMin: 3,
    priceMax: 8,
  },
  {
    name: "Fetch.ai",
    shortName: "FET",
    icon: "/svgs/etc.svg",
    priceMin: 0.3,
    priceMax: 0.8,
  },
  {
    name: "Pepe",
    shortName: "PEPE",
    icon: "/svgs/etc.svg",
    priceMin: 0.000005,
    priceMax: 0.00002,
  },
  {
    name: "Bonk",
    shortName: "BONK",
    icon: "/svgs/etc.svg",
    priceMin: 0.00001,
    priceMax: 0.00005,
  },
  {
    name: "Jupiter",
    shortName: "JUP",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 1.5,
  },
  {
    name: "Pyth Network",
    shortName: "PYTH",
    icon: "/svgs/etc.svg",
    priceMin: 0.3,
    priceMax: 0.8,
  },
  {
    name: "Celestia",
    shortName: "TIA",
    icon: "/svgs/etc.svg",
    priceMin: 8,
    priceMax: 20,
  },
  {
    name: "Sei",
    shortName: "SEI",
    icon: "/svgs/etc.svg",
    priceMin: 0.3,
    priceMax: 1,
  },
  {
    name: "Injective",
    shortName: "INJ",
    icon: "/svgs/etc.svg",
    priceMin: 20,
    priceMax: 50,
  },
  {
    name: "Osmosis",
    shortName: "OSMO",
    icon: "/svgs/corros.svg",
    priceMin: 0.5,
    priceMax: 1.5,
  },
  {
    name: "Juno",
    shortName: "JUNO",
    icon: "/svgs/corros.svg",
    priceMin: 0.2,
    priceMax: 0.6,
  },
  {
    name: "Secret Network",
    shortName: "SCRT",
    icon: "/svgs/etc.svg",
    priceMin: 0.3,
    priceMax: 0.8,
  },
  {
    name: "Akash Network",
    shortName: "AKT",
    icon: "/svgs/etc.svg",
    priceMin: 2,
    priceMax: 6,
  },
  {
    name: "Stargaze",
    shortName: "STARS",
    icon: "/svgs/etc.svg",
    priceMin: 0.05,
    priceMax: 0.15,
  },
  {
    name: "Regen Network",
    shortName: "REGEN",
    icon: "/svgs/etc.svg",
    priceMin: 0.1,
    priceMax: 0.3,
  },
  {
    name: "Sentinel",
    shortName: "DVPN",
    icon: "/svgs/etc.svg",
    priceMin: 0.002,
    priceMax: 0.008,
  },
  {
    name: "Band Protocol",
    shortName: "BAND",
    icon: "/svgs/etc.svg",
    priceMin: 1.5,
    priceMax: 4,
  },
  {
    name: "Kava",
    shortName: "KAVA",
    icon: "/svgs/etc.svg",
    priceMin: 0.5,
    priceMax: 1.2,
  },
  {
    name: "Persistence",
    shortName: "XPRT",
    icon: "/svgs/corros.svg",
    priceMin: 0.2,
    priceMax: 0.6,
  },
  {
    name: "Stride",
    shortName: "STRD",
    icon: "/svgs/corros.svg",
    priceMin: 0.5,
    priceMax: 1.5,
  },
  {
    name: "Quasar",
    shortName: "QSR",
    icon: "/svgs/corros.svg",
    priceMin: 0.1,
    priceMax: 0.3,
  },
];

// Regenerate random prices and percentages for each request
function getCryptoList(): CryptoCurrency[] {
  return cryptoCurrenciesConfig.map((config) => ({
    name: config.name,
    shortName: config.shortName,
    icon: config.icon,
    price: generateRandomPrice(config.priceMin, config.priceMax),
    percentage: generateRandomPercentage(),
  }));
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<{ success: boolean; data: CryptoCurrency[] }>> {
  try {
    const cryptoList = getCryptoList();

    return NextResponse.json({
      success: true,
      data: cryptoList,
    });
  } catch (error) {
    console.error("Crypto list error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: [],
      },
      { status: 500 }
    );
  }
}
