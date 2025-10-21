import React from "react";

interface RankProps {
  label: string;
  icon: React.ReactNode;
  amount: string | number;
  percentage: string | number;
  currency?: string;
}

const Rank: React.FC<RankProps> = ({
  label,
  icon,
  amount,
  percentage,
  currency,
}) => {
  return (
    <div>
      <p className="p-2 bg-gray-200 rounded-lg text-sm">{label}</p>
      <div className="w-16 h-16 rounded-full bg-cyan-400 mx-auto my-4 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-center">
        <span className="text-2xl"> {amount}</span>{" "}
        <span className="text-sm text-gray-500"> {currency}</span>{" "}
      </p>

      <p className="text-center">
        Return : <span className="font-semibold">{percentage}%</span>
      </p>
    </div>
  );
};

export default Rank;
