import { NextRequest, NextResponse } from "next/server";


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
  const numDays = Math.floor(Math.random() * 15) + 10; 

  for (let i = 0; i < numDays; i++) {
    const randomWeekday = weekdays[Math.floor(Math.random() * weekdays.length)];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2023 + Math.floor(Math.random() * 2); 

    const numTransactions = Math.floor(Math.random() * 8) + 2; 
    const transactions = [];

    for (let j = 0; j < numTransactions; j++) {
      
      let type;
      if (filter === "crypto") {
        
        const cryptoTypes = ["up", "down"];
        type = cryptoTypes[Math.floor(Math.random() * cryptoTypes.length)];
      } else if (filter === "cpg") {
        
        type = "cpg";
      } else {
        
        type =
          transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
      }

      
      let selectedCurrency;
      if (type === "cpg") {
        
        const availableCurrencies = crypto
          ? cryptoCurrencies.filter(
              (c) => c.name.toUpperCase() === crypto.toUpperCase()
            )
          : cryptoCurrencies;
        
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
            category: "cpg", 
          };
        }
      } else {
        
        
        const availableCurrencies = crypto
          ? cryptoCurrencies.filter(
              (c) => c.name.toUpperCase() === crypto.toUpperCase()
            )
          : cryptoCurrencies;

        
        if (crypto && availableCurrencies.length === 0) {
          selectedCurrency = cryptoCurrencies[0];
        } else {
          selectedCurrency =
            availableCurrencies[
              Math.floor(Math.random() * availableCurrencies.length)
            ];
        }
      }

      
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
            
            const [hourA, minA] = a.hour.split(":").map(Number);
            const [hourB, minB] = b.hour.split(":").map(Number);
            const timeA = hourA * 60 + minA;
            const timeB = hourB * 60 + minB;
            comparison = timeA - timeB;
          }
          break;

        case "type":
          
          const typeOrder: Record<string, number> = { up: 1, down: 2, cpg: 3 };
          comparison = (typeOrder[a.type] || 0) - (typeOrder[b.type] || 0);
          break;

        case "amount":
          
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
  const crypto = searchParams.get("crypto"); 
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const data = generateRandomHistory(filter, crypto);
  const sortedData = sortTransactions(data, sortBy, sortOrder);

  return NextResponse.json({
    success: true,
    data: sortedData,
  });
}
