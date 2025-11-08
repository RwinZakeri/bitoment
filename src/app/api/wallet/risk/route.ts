import { NextRequest, NextResponse } from "next/server";


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
  const numDays = Math.floor(Math.random() * 10) + 5; 

  for (let i = 0; i < numDays; i++) {
    const randomWeekday = weekdays[Math.floor(Math.random() * weekdays.length)];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2023 + Math.floor(Math.random() * 2); 

    const numTransactions = Math.floor(Math.random() * 6) + 2; 
    const transactions = [];

    for (let j = 0; j < numTransactions; j++) {
      
      let type: "up" | "down" | "cpg" | "link";
      if (filter === "crypto") {
        
        const cryptoTypes: ("up" | "down")[] = ["up", "down"];
        type = cryptoTypes[Math.floor(Math.random() * cryptoTypes.length)];
      } else if (filter === "cpg") {
        
        type = "cpg";
      } else {
        
        type = transactionTypes[
          Math.floor(Math.random() * transactionTypes.length)
        ] as "up" | "down" | "cpg" | "link";
      }

      
      const selectedCurrency =
        cryptoCurrencies[Math.floor(Math.random() * cryptoCurrencies.length)];

      
      const assetAmount = (Math.random() * 10 + 0.1).toFixed(4);
      const price = (Math.random() * 100000 + 1000).toFixed(2);
      const amount = (parseFloat(assetAmount) * parseFloat(price)).toFixed(2);

      
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
