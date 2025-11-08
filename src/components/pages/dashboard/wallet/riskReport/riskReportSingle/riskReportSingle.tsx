"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Paper from "@/components/UI/paper";
import RadarChart from "@/components/UI/radar-chart";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";

const cryptoData = [
  { icon: "/svgs/btc.svg", name: "BTC" },
  { icon: "/svgs/etc.svg", name: "ETH" },
  { icon: "/svgs/tether.svg", name: "USDT" },
  { icon: "/svgs/sol.svg", name: "SOL" },
  { icon: "/svgs/binance.svg", name: "BNB" },
];

const RiskRepostSingle = ({ id }: { id: number }) => {
  const randomCrypto = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * cryptoData.length);
    return cryptoData[randomIndex];
  }, []);

  const riskLevel = useMemo(() => {
    return id;
  }, [id]);

  const darkMarketPercent = useMemo(() => {
    return Math.floor(Math.random() * 101); 
  }, []);

  const mixerPercent = useMemo(() => {
    return Math.floor(Math.random() * 101); 
  }, []);

  const gamblingPercent = useMemo(() => {
    return Math.floor(Math.random() * 101); 
  }, []);

  const radarChartData = useMemo(() => {
    
    const getRiskColor = () => {
      if (riskLevel < 40) {
        return {
          border: "#00DA49",
          background: "rgba(0, 218, 73, 0.2)",
        };
      } else if (riskLevel > 80) {
        return {
          border: "#B00000",
          background: "rgba(176, 0, 0, 0.2)",
        };
      } else {
        return {
          border: "#FFA600",
          background: "rgba(255, 166, 0, 0.2)",
        };
      }
    };

    const colors = getRiskColor();

    return {
      labels: ["Risky entity", "Suspicious tnx", "Hacking event"],
      datasets: [
        {
          label: "Risk Score",
          data: [
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
          ],
          borderColor: colors.border,
          backgroundColor: colors.background,
          pointBackgroundColor: colors.border,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: colors.border,
          borderWidth: 2,
        },
      ],
    };
  }, [riskLevel]);

  const chartOptions = useMemo(
    () => ({
      plugins: {
        tooltip: {
          borderColor:
            riskLevel < 40 ? "#00DA49" : riskLevel > 80 ? "#B00000" : "#FFA600",
        },
      },
    }),
    [riskLevel]
  );

  return (
    <PageLayout title="AML Risk Score">
      <Paper className="bg-white rounded-lg p-3 mt-4">
        <div className="flex items-center gap-2 border-b border-gray-200 mb-4 pb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <Image
              src={randomCrypto.icon}
              alt={randomCrypto.name}
              width={24}
              height={24}
            />
          </div>
          <p className="font-semibold">{randomCrypto.name}</p>
        </div>

        <div className={cn("flex items-center justify-center gap-1")}>
          <span className="">Risk Level :</span>
          <span
            style={{
              color:
                riskLevel < 40
                  ? "#00DA49"
                  : riskLevel > 80
                  ? "#B00000"
                  : "#FFA600",
              borderColor:
                riskLevel < 40
                  ? "#00DA49"
                  : riskLevel > 80
                  ? "#B00000"
                  : "#FFA600",

              backgroundColor:
                riskLevel < 40
                  ? "#00DA491A"
                  : riskLevel > 80
                  ? "#B000001A"
                  : "#FFA6001A",
            }}
            className="w-[100px] my-4 text-center rounded-sm border border-gray-300 px-3"
          >
            {riskLevel}
          </span>
        </div>

        <div className="h-80">
          <RadarChart data={radarChartData} options={chartOptions} />
        </div>

        <div className="flex items-center justify-center flex-col gap-2">
          <div className="w-full flex items-center justify-center gap-1">
            Risk Level :
            <span
              className={cn("px-3 w-[100px] text-center border rounded-sm")}
              style={{
                color:
                  riskLevel < 40
                    ? "#00DA49"
                    : riskLevel > 80
                    ? "#B00000"
                    : "#FFA600",
              }}
            >
              {riskLevel < 40 ? "Low" : riskLevel > 80 ? "High" : "Moderate"}
            </span>
          </div>
        </div>

        <div className="flex flex-col my-5 w-full gap-3">
          <div className="relative">
            <div
              className="h-6 rounded-sm relative"
              style={{
                width: `${darkMarketPercent}%`,
                backgroundColor:
                  riskLevel < 40
                    ? "#00DA49"
                    : riskLevel > 80
                    ? "#FFCCCC"
                    : "#FFA6001A",
              }}
            ></div>
            <p className="absolute top-0 left-2 flex gap-3 ">
              {" "}
              <span className="text-red-500 ">{darkMarketPercent}%</span> Dark
              Market{" "}
            </p>
          </div>
          <div className="relative">
            <div
              className="h-6 rounded-sm relative"
              style={{
                width: `${mixerPercent}%`,
                backgroundColor:
                  riskLevel < 40
                    ? "#00DA49"
                    : riskLevel > 80
                    ? "#FFCCCC"
                    : "#FFA6001A",
              }}
            ></div>
            <p className="absolute top-0 left-2 flex gap-3 ">
              {" "}
              <span className="text-red-500 ">{mixerPercent}%</span> Mixer{" "}
            </p>
          </div>
          <div className="relative">
            <div
              className="h-6 rounded-sm relative"
              style={{
                width: `${gamblingPercent}%`,
                backgroundColor:
                  riskLevel < 40
                    ? "#00DA49"
                    : riskLevel > 80
                    ? "#FFCCCC"
                    : "#FFA6001A",
              }}
            ></div>
            <p className="absolute top-0 left-2 flex gap-3 ">
              {" "}
              <span className="text-red-500 ">
                {gamblingPercent}%
              </span> Gambling{" "}
            </p>
          </div>
        </div>
      </Paper>
    </PageLayout>
  );
};

export default RiskRepostSingle;
