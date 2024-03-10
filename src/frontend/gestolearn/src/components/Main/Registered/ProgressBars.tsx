import React from "react";
import "./ProgressBars.css";
import "../../../../App.css";
import { ProgressBar } from "./types";

const ProgressBars: React.FC<ProgressBar> = ({
  currentValue,
  maxValue,
  label,
}) => {
  const percentage = (currentValue / maxValue) * 100;

  return (
    <div className="progress-bar font-serif">
      <div className="label">{label}</div>
      <div className="bar-container" style={{ position: 'relative'}}>
        <div className="bar" style={{ width: `${percentage}%`}}></div>
        <span className="bar-value" style={{ textAlign: 'center' }}>
          {`${currentValue}/${maxValue}`}
        </span>
      </div>
    </div>
  );
  };

export default ProgressBars;
