import { NextResponse } from "next/server";

// Helper function to generate random swap history data
function generateRandomSwapHistory() {
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
  const cryptoCurrencies = [
    { name: "BTC", symbol: "BTC", icon: "/icons/btc.svg" },
    { name: "ETH", symbol: "ETH", icon: "/icons/eth.svg" },
    { name: "SOL", symbol: "SOL", icon: "/icons/sol.svg" },
    { name: "USDT", symbol: "USDT", icon: "/icons/tether.svg" },
    { name: "BNB", symbol: "BNB", icon: "/icons/binance.svg" },
    { name: "ETC", symbol: "ETC", icon: "/icons/etc.svg" },
  ];

  const data = [];
  const numDays = Math.floor(Math.random() * 15) + 10; // 10-24 days of data

  for (let i = 0; i < numDays; i++) {
    const randomWeekday = weekdays[Math.floor(Math.random() * weekdays.length)];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2023 + Math.floor(Math.random() * 2); // 2023 or 2024

    const numSwaps = Math.floor(Math.random() * 8) + 2; // 2-9 swaps per day
    const swaps = [];

    for (let j = 0; j < numSwaps; j++) {
      // Select two different cryptocurrencies
      const cryptoOne =
        cryptoCurrencies[Math.floor(Math.random() * cryptoCurrencies.length)];
      let cryptoTwo =
        cryptoCurrencies[Math.floor(Math.random() * cryptoCurrencies.length)];
      // Ensure they are different
      while (cryptoTwo.symbol === cryptoOne.symbol) {
        cryptoTwo =
          cryptoCurrencies[Math.floor(Math.random() * cryptoCurrencies.length)];
      }

      const amount = (Math.random() * 10 + 0.1).toFixed(4);
      const hour = `${Math.floor(Math.random() * 24)
        .toString()
        .padStart(2, "0")}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`;

      swaps.push({
        cryptoOne: cryptoOne.symbol,
        cryptoTwo: cryptoTwo.symbol,
        cryptoOneIcon: cryptoOne.icon,
        cryptoTwoIcon: cryptoTwo.icon,
        amount: `${amount} ${cryptoTwo.symbol}`,
        hour: hour,
      });
    }

    const dayHour = `${Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0")}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`;

    data.push({
      date: `${randomDay} ${randomMonth} ${randomYear}`,
      dateAsName: randomWeekday,
      hour: dayHour,
      swaps: swaps,
    });
  }

  return data;
}

export async function GET() {
  const data = generateRandomSwapHistory();

  return NextResponse.json({
    success: true,
    data,
  });
}
