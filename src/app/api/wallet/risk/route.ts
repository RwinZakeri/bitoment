import { NextRequest, NextResponse } from "next/server";

// Helper function to generate random risk report data
function generateRandomRiskReport(filter?: string) {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const transactionTypes = ["up", "down", "cpg", "link"];
  const cryptoCurrencies = [
    { name: "BTC", symbol: "BTC" },
    { name: "ETH", symbol: "ETH" },
    { name: "SOL", symbol: "SOL" },
    { name: "USDT", symbol: "USDT" },
    { name: "BNB", symbol: "BNB" },
  ];

  const data = [];
  const numDays = Math.floor(Math.random() * 10) + 5; // 5-14 days of data

  for (let i = 0; i < numDays; i++) {
    const randomWeekday = weekdays[Math.floor(Math.random() * weekdays.length)];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2023 + Math.floor(Math.random() * 2); // 2023 or 2024

    const numTransactions = Math.floor(Math.random() * 6) + 2; // 2-7 transactions per day
    const transactions = [];

    for (let j = 0; j < numTransactions; j++) {
      // Choose type based on filter first
      let type: "up" | "down" | "cpg" | "link";
      if (filter === "crypto") {
        // For crypto filter, only use "up" or "down" types
        const cryptoTypes: ("up" | "down")[] = ["up", "down"];
        type = cryptoTypes[Math.floor(Math.random() * cryptoTypes.length)];
      } else if (filter === "cpg") {
        // For cpg filter, only use "cpg" type
        type = "cpg";
      } else {
        // For "all" filter, use any type
        type = transactionTypes[
          Math.floor(Math.random() * transactionTypes.length)
        ] as "up" | "down" | "cpg" | "link";
      }

      // Choose currency
      const selectedCurrency =
        cryptoCurrencies[Math.floor(Math.random() * cryptoCurrencies.length)];

      // Generate random amounts and prices
      const assetAmount = (Math.random() * 10 + 0.1).toFixed(4);
      const price = (Math.random() * 100000 + 1000).toFixed(2);
      const amount = (parseFloat(assetAmount) * parseFloat(price)).toFixed(2);

      // Generate random risk level (0-100)
      const riskLevel = Math.floor(Math.random() * 100);

      transactions.push({
        type: type,
        title: selectedCurrency.name,
        amount: amount,
        price: price.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        assetAmount: assetAmount,
        riskLevel: riskLevel,
      });
    }

    data.push({
      date: `${randomDay} ${randomMonth} ${randomYear}`,
      dateAsName: randomWeekday,
      transactions: transactions,
    });
  }

  return data;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") || "all";

  const data = generateRandomRiskReport(filter);

  return NextResponse.json({
    success: true,
    data,
  });
}
