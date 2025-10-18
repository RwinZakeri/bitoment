export interface CircleProgressBarProps {
  progress: number; // Progress value between 0 and 100
  size?: number; // Size of the circle in pixels (default: 120)
  strokeWidth?: number; // Width of the stroke (default: 8)
  color?: string; // Color of the progress bar (default: #15e0cc)
  backgroundColor?: string; // Background color of the circle (default: #eeeeee)
  showPercentage?: boolean; // Whether to show percentage text inside (default: true)
  className?: string; // Additional CSS classes
  animated?: boolean; // Whether to animate the progress (default: true)
  duration?: number; // Animation duration in milliseconds (default: 1000)
}
