import { ChartData, ChartOptions } from "chart.js";

export interface RadarChartProps {
  data: ChartData<"radar">;
  options?: ChartOptions<"radar">;
  className?: string;
}

