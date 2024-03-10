import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label }) => {
  return (
    <div className="w-full rounded-full overflow-hidden shadow-lg bg-neutral-100">
    <div
      className="bg-purple-400 text-xs font-medium text-white text-center p-1 leading-none rounded-full shadow-md space-y-4"
      style={{ width: `${percentage}%` }}
    >
      {label}
      </div>
    </div>
  );
};

export default ProgressBar;
