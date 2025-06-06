import React from "react";
import { CircularProgressBarProps } from "../Interfaces/interfaces";

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  bgColor = "#E5E7EB",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const hue = (progress / 100) * 120;
  const color = `hsl(${hue}, 100%, 50%)`;

  return (
    <svg width={size} height={size}>
      {/* fundo */}
      <circle
        stroke={bgColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* progresso */}
      <circle
        className="transform -rotate-90 origin-center"
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* texto */}
      <text
        x="50%"
        y="50%"
        dy="0.3em"
        textAnchor="middle"
        className="text-xl font-bold fill-current text-gray-800"
        style={{ transform: "rotate(0deg)" }}
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
