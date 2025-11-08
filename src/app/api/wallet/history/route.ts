import { NextRequest, NextResponse } from "next/server";

// Helper function to generate random data
function generateRandomHistory(filter?: string, crypto?: string | null) {
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

      // Choose currency based on type and crypto filter
      let selectedCurrency;
      if (type === "cpg") {
        // If type is cpg, use a crypto currency for name and icon, but keep category as cpg
        const availableCurrencies = crypto
          ? cryptoCurrencies.filter(
              (c) => c.name.toUpperCase() === crypto.toUpperCase()
            )
          : cryptoCurrencies;
        // If no matching currency found when filtering, use the first currency from the list
        if (availableCurrencies.length === 0) {
          selectedCurrency = {
            ...cryptoCurrencies[0],
            category: "cpg",
          };
        } else {
          const cryptoCurrency =
            availableCurrencies[
              Math.floor(Math.random() * availableCurrencies.length)
            ];
          selectedCurrency = {
            ...cryptoCurrency,
            category: "cpg", // Override category to cpg
          };
        }
      } else {
        // For "up" or "down" types, use crypto currencies
        // If crypto filter is specified, only use that crypto
        const availableCurrencies = crypto
          ? cryptoCurrencies.filter(
              (c) => c.name.toUpperCase() === crypto.toUpperCase()
            )
          : cryptoCurrencies;

        // If filtering by crypto and no matching currency found, use first currency as fallback
        if (crypto && availableCurrencies.length === 0) {
          selectedCurrency = cryptoCurrencies[0];
        } else {
          selectedCurrency =
            availableCurrencies[
              Math.floor(Math.random() * availableCurrencies.length)
            ];
        }
      }

      // Skip transaction only if crypto filter doesn't match (for strict filtering)
      if (
        crypto &&
        selectedCurrency.name.toUpperCase() !== crypto.toUpperCase()
      ) {
        continue;
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

// Helper function to sort transactions
function sortTransactions(
  data: ReturnType<typeof generateRandomHistory>,
  sortBy: string | null,
  sortOrder: string
) {
  if (!sortBy) return data;

  const order = sortOrder === "desc" ? -1 : 1;

  return data.map((day) => {
    const sortedTransactions = [...day.transactions].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          // Sort by dateAsName (YYYY-M-D or YYYY-MM-DD format) first, then by hour
          // Normalize date format for parsing
          const normalizeDate = (dateStr: string) => {
            const parts = dateStr.split("-");
            if (parts.length === 3) {
              const year = parts[0];
              const month = parts[1].padStart(2, "0");
              const day = parts[2].padStart(2, "0");
              return `${year}-${month}-${day}`;
            }
            return dateStr;
          };
          const normalizedDateA = normalizeDate(a.dateAsName);
          const normalizedDateB = normalizeDate(b.dateAsName);
          const dateA = new Date(normalizedDateA);
          const dateB = new Date(normalizedDateB);
          comparison = dateA.getTime() - dateB.getTime();
          if (comparison === 0) {
            // If dates are equal, sort by hour
            const [hourA, minA] = a.hour.split(":").map(Number);
            const [hourB, minB] = b.hour.split(":").map(Number);
            const timeA = hourA * 60 + minA;
            const timeB = hourB * 60 + minB;
            comparison = timeA - timeB;
          }
          break;

        case "type":
          // Sort by transaction type: up, down, cpg
          const typeOrder: Record<string, number> = { up: 1, down: 2, cpg: 3 };
          comparison = (typeOrder[a.type] || 0) - (typeOrder[b.type] || 0);
          break;

        case "amount":
          // Extract numeric value from amount string (e.g., "5.23 BTC" -> 5.23)
          const amountA = parseFloat(a.amount.split(" ")[0]) || 0;
          const amountB = parseFloat(b.amount.split(" ")[0]) || 0;
          comparison = amountA - amountB;
          break;

        default:
          return 0;
      }

      return comparison * order;
    });

    return {
      ...day,
      transactions: sortedTransactions,
    };
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") || "all";
  const crypto = searchParams.get("crypto"); // Filter by specific crypto type
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const data = generateRandomHistory(filter, crypto);
  const sortedData = sortTransactions(data, sortBy, sortOrder);

  return NextResponse.json({
    success: true,
    data: sortedData,
  });
}
