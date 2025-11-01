import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const result = assetData.data.slice(0, 3).reduce((acc, rec) => {
  // return acc - Number(rec.percentage.split("%")[0]);
  // }, 100);

  const data = [
    {
      name: "BTC",
      percentage: "30%",
      price: "10000",
      icon: "/svgs/btc.svg",
    },
    {
      name: "ETH",
      percentage: "20%",
      price: "15400",
      icon: "/svgs/etc.svg",
    },
    {
      name: "Tether",
      percentage: "10%",
      price: "645000",
      icon: "/svgs/tether.svg",
    },
    {
      name: "Other",
      percentage: "40%",
      price: "11000",
      icon: "",
    },
    {
      name: "SOL",
      percentage: "24%",
      price: "645000",
      icon: "/svgs/sol.svg",
    },
    {
      name: "BNB",
      percentage: "11%",
      price: "645000",
      icon: "/svgs/binance.svg",
    },
  ];

  return NextResponse.json({
    success: true,
    data,
  });
}
