"use client";

import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";
import { RadarChartProps } from "./type";


ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const RadarChart = ({ data, options, className = "" }: RadarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new ChartJS(chartRef.current, {
        type: "radar",
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderWidth: 1,
              borderColor: options?.plugins?.tooltip?.borderColor || "#256BFD",
            },
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              min: 0,
              ticks: {
                display: false,
              },
              grid: {
                color: "#E5E7EB",
              },
              pointLabels: {
                color: "#374151",
                font: {
                  size: 12,
                  weight: "normal" as const,
                },
              },
            },
          },
          elements: {
            point: {
              radius: 4,
              hoverRadius: 6,
            },
          },
          ...options,
        },
      });
    }

    
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

export default RadarChart;
