import { useState, useEffect } from "react";
import "./question.css";

type QuestionTimerProps = {
  timeout: number;
  onTimeout: () => void;
};

function QuestionTimer({ timeout, onTimeout }: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState<number>(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };


  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return <progress id="question" className="w-1/2 h-2 rounded-full bg-purple-300 my-0" max={timeout} value={remainingTime}/>;
}

export default QuestionTimer;
