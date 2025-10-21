import { ChartData, ChartOptions } from "chart.js";

export interface DoughnutChartProps {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
  className?: string;
}
