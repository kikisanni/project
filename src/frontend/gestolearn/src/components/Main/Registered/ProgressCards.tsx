import React, { useState, useEffect } from "react";
import { Results } from "./types";
import axios from "axios";
import "../../../../App.css";
import ProgressBar from "./ProgressBars";
import quizIcon from "../../../assets/5692030.png";
import assesmentIcon from "../../../assets/10468077.png";
import treasureIcon from "../../../assets/1355900.png";
import heartIcon from "../../../assets/heart-img.png";
import gestoPointIcon from "../../../assets/Star_icon_stylized.svg.png";

const ProgressCards: React.FC = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/auth/current", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data._id);
      })
      .catch((error) => console.error("Error fetching current user:", error));
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/summary/results/${currentUser}`
          );
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching results", error);
        }
      };

      fetchResults();
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col items-stretch w-[31%] ml-5 max-md:w-full max-md:ml-0 font-serif">
      <div className="flex flex-col items-stretch max-md:max-w-full max-md:mt-10">
        <div className="shadow-lg bg-purple-300 flex flex-col items-center justify-center p-4 rounded-2xl max-md:max-w-full max-md:p-5">
          <div className="flex justify-center gap-4 items-center max-md:max-w-full max-md:flex-wrap">
            <div className="flex grow basis-[0%] flex-col items-center">
              {results && (
                <ProgressBar
                  currentValue={results.hearts}
                  maxValue={5}
                  label="Hearts Remaining"
                />
              )}
            </div>

            <img
              src={heartIcon}
              className="aspect-[1.19] object-contain w-[40px] shadow-sm overflow-hidden shrink-0 max-w-full mt-4"
            />
          </div>


          <div className="flex justify-center gap-4 items-center mt-8 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <div className="flex grow basis-[0%] flex-col items-center">
              {results && (
                <ProgressBar
                  currentValue={results.totalPoints}
                  maxValue={36}
                  label="Gesto Points Gained"
                />
              )}
            </div>

            <img
              src={gestoPointIcon}
              className="aspect-[1.11] object-contain w-[40px] shadow-sm overflow-hidden shrink-0 max-w-full"
            />
          </div>
        </div>


        <div className="flex flex-col items-center justify-center px-9 py-7 mt-28 bg-purple-300 rounded-2xl shadow-lg w-full max-w-[515px] max-md:px-5 max-md:mt-10">
          <div className="flex justify-center items-center gap-4 w-full">
            <div className="flex flex-col items-center w-full">
              {results && (
                <ProgressBar
                  currentValue={results.completed}
                  maxValue={6}
                  label="Quizzes Completed"
                />
              )}
            </div>

            <img src={quizIcon} className="mt-4 aspect-[1.1] w-[40px]" />

          </div>


          <div className="flex justify-center items-center gap-4 w-full mt-10">
            <div className="flex flex-col items-center w-full">
              {results && (
                <ProgressBar
                  currentValue={2}
                  maxValue={3}
                  label="Assessments Completed"
                />
              )}
            </div>
            <img src={assesmentIcon} className="mt-4 aspect-[1.1] w-[40px]" />
          </div>
          <div className="flex justify-center items-center gap-4 w-full mt-10 mb-9">
            <div className="flex flex-col items-center w-full">
              {results && (
                <ProgressBar
                  currentValue={results.totalXP}
                  maxValue={150}
                  label="Total XP Gained"
                />
              )}
            </div>
            <img
              src={treasureIcon}
              className="shadow-sm aspect-[1.1] w-[40px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCards;
