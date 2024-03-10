import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ActivitiesCompleted() {
  const [completionPercentage, setCompletionPercentage] = useState("0");

  useEffect(() => {
    fetch('http://localhost:8000/dashboard/activitiesCompleted', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data.completionRate !== undefined) {
          setCompletionPercentage(data.completionRate);
        }
      })
      .catch(error => {
        console.error('Error fetching user progress:', error);
      });
  }, []);

  return (
    <div className="shadow-lg bg-neutral-100 p-4 rounded-lg shadow h-80">
    <h2 className="font-bold text-lg mb-4 text-center">Acitivities Completed</h2>
    <div style={{ width: '200px', height: '200px', margin: 'auto' }}>
      <CircularProgressbar value={Number(completionPercentage)} text={`${completionPercentage}%`} />
    </div>
    </div>
  );
}

export default ActivitiesCompleted;
