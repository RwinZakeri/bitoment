"use client";

import {
  ArcElement,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";
import { DoughnutChartProps } from "./type";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

const DoughnutChart = ({
  data,
  options,
  className = "",
}: DoughnutChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new ChartJS(chartRef.current, {
        type: "doughnut",
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "#15E0CC",
              borderWidth: 1,
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.parsed;
                  const total = context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value}% (${percentage}%)`;
                },
              },
            },
          },
          cutout: "60%",
          ...options,
        },
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DoughnutChart;
