import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = [
    {
      name: "BTC",
      percentage: "30%",
      price: "10000",
      icon: "/icons/btc.svg",
    },
    {
      name: "ETH",
      percentage: "20%",
      price: "15400",
      icon: "/icons/eth.svg",
    },
    {
      name: "Tether",
      percentage: "10%",
      price: "645000",
      icon: "/icons/tether.svg",
    },
    {
        name: "Other",
        percentage: "40%",
        price: "11000",
        icon: "",
      },
  ];

  return NextResponse.json({
    success: true,
    data,
  });
}
