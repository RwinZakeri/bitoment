export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}

export interface LineChartProps {
  data: LineChartData;
  options?: Record<string, unknown>;
  className?: string;
}
