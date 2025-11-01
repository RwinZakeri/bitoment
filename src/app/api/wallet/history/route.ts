import { NextRequest, NextResponse } from "next/server";

// Helper function to generate random data
function generateRandomHistory(filter?: string) {
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
  const transactionTypes = ["up", "down", "cpg"];
  const cryptoCurrencies = [
    { name: "BTC", icon: "/icons/btc.svg", symbol: "BTC", category: "crypto" },
    { name: "ETH", icon: "/icons/eth.svg", symbol: "ETH", category: "crypto" },
    { name: "SOL", icon: "/icons/sol.svg", symbol: "SOL", category: "crypto" },
    {
      name: "USDT",
      icon: "/icons/tether.svg",
      symbol: "USDT",
      category: "crypto",
    },
    {
      name: "BNB",
      icon: "/icons/binance.svg",
      symbol: "BNB",
      category: "crypto",
    },
  ];

  const data = [];
  const numDays = Math.floor(Math.random() * 15) + 10; // 10-24 days of data for lots of history

  for (let i = 0; i < numDays; i++) {
    const randomWeekday = weekdays[Math.floor(Math.random() * weekdays.length)];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2023 + Math.floor(Math.random() * 2); // 2023 or 2024

    const numTransactions = Math.floor(Math.random() * 8) + 2; // 2-9 transactions per day for more data
    const transactions = [];

    for (let j = 0; j < numTransactions; j++) {
      // Choose type based on filter first
      let type;
      if (filter === "crypto") {
        // For crypto filter, only use "up" or "down" types
        const cryptoTypes = ["up", "down"];
        type = cryptoTypes[Math.floor(Math.random() * cryptoTypes.length)];
      } else if (filter === "cpg") {
        // For cpg filter, only use "cpg" type
        type = "cpg";
      } else {
        // For "all" filter, use any type
        type =
          transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
      }

      // Choose currency based on type
      let selectedCurrency;
      if (type === "cpg") {
        // If type is cpg, use a crypto currency for name and icon, but keep category as cpg
        const cryptoCurrency =
          cryptoCurrencies[Math.floor(Math.random() * cryptoCurrencies.length)];
        selectedCurrency = {
          ...cryptoCurrency,
          category: "cpg", // Override category to cpg
        };
      } else {
        // For "up" or "down" types, use crypto currencies
        selectedCurrency =
          cryptoCurrencies[Math.floor(Math.random() * cryptoCurrencies.length)];
      }
      const amount = (Math.random() * 10 + 0.1).toFixed(2);
      const price = (Math.random() * 100000 + 1000).toFixed(2);
      const hour = `${Math.floor(Math.random() * 24)
        .toString()
        .padStart(2, "0")}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`;

      transactions.push({
        amount: `${amount} ${selectedCurrency.symbol}`,
        title: selectedCurrency.name,
        icon: selectedCurrency.icon,
        type: type,
        price: price.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        dateAsName: `${randomYear}-${Math.floor(Math.random() * 12) + 1}-${
          Math.floor(Math.random() * 28) + 1
        }`,
        hour: hour,
        category: selectedCurrency.category,
      });
    }

    const dayType =
      transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const dayHour = `${Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0")}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`;

    data.push({
      date: `${randomDay} ${randomMonth} ${randomYear}`,
      dateAsName: randomWeekday,
      hour: dayHour,
      type: dayType,
      transactions: transactions,
    });
  }

  return data;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") || "all";

  const data = generateRandomHistory(filter);

  return NextResponse.json({
    success: true,
    data,
  });
}
