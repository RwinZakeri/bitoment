"use client";

import { useEffect, useState } from "react";
import { CircleProgressBarProps } from "./type";

const CircleProgressBar = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "#15e0cc",
  backgroundColor = "#eeeeee",
  showPercentage = true,
  className = "",
  animated = true,
  duration = 1000,
}: CircleProgressBarProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;

  useEffect(() => {
    if (animated) {
      const startTime = Date.now();
      const startProgress = 0;
      const endProgress = progress;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);

        const easeOutCubic = 1 - Math.pow(1 - progressRatio, 3);
        const currentProgress =
          startProgress + (endProgress - startProgress) * easeOutCubic;

        setAnimatedProgress(currentProgress);

        if (progressRatio < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animated, duration]);

  const currentStrokeDashoffset =
    circumference - (animatedProgress / 100) * circumference;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-180"
        style={{ overflow: "visible" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={currentStrokeDashoffset}
          style={{
            transition: animated
              ? `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : "none",
          }}
        />
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-foreground">
            {Math.round(animatedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircleProgressBar;
