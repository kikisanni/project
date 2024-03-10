import { Link } from "react-router-dom";
import trophy from "../../../../assets/trophy.jpg";
import data from "./data";
import "./question.css";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

type SummaryProps = {
  userAnswers: string[];
  user: {
    _id: String;
  };
};

export default function Summary({ userAnswers, user }: SummaryProps) {
  const skippedAnswers = userAnswers.filter((answer) => answer == "");
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === data[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;
  const points = userAnswers.reduce((acc, answer, index) => {
    return acc + (answer === data[index].answers[0] ? 2 : 0);
  }, 0);

  const wrongAnswer = userAnswers.length - correctAnswers.length;

  let hearts = 0;

  const [totalPoints, setTotalPoints] = useState(points);
  const [totalHearts, setTotalHearts] = useState(hearts);

  const userId = user._id;

  const updateQuizResults = async () => {
    try {
      // Get the current results for the user
      const resultsResponse = await axios.get(
        `http://localhost:8000/summary/results/${userId}`
      );
      const existingResults = resultsResponse.data;
      console.log("results", existingResults);

      let updatedHearts = existingResults.hearts;
      let updatedPoints = existingResults.totalPoints;
      let getMaxPoints = 0;

      // Calculate the new results
      if (existingResults.completed !== 6) {
        updatedPoints += points;
        updatedHearts -= wrongAnswer;
        existingResults.completed = 6; // Update total completed to 6
      } else {
        // Calculate new total points
        const prevTotalPoints = existingResults.categoryTotalPoints[4]; //total points from category 1 easy
        updatedPoints = Math.max(
          prevTotalPoints + points,
          existingResults.totalPoints
        );
        console.log("updated 1", updatedPoints);
        updatedHearts =
          existingResults.hearts > 2 ? existingResults.hearts : 2 - wrongAnswer;
      }

      updatedPoints = Math.min(updatedPoints, 24);

      console.log("updated", updatedPoints);
      let totalPoints = Math.max(updatedPoints, existingResults.totalPoints);

      const totalXP = Math.round((totalPoints / 24) * 100);
      console.log(totalPoints);
      console.log(totalXP);

      // Append the new points to the categoryTotalPoints array
      if (
        existingResults.categoryTotalPoints.length < 6 ||
        existingResults.categoryTotalPoints[5] === undefined
      ) {
        existingResults.categoryTotalPoints.push(totalPoints);
      } else {
        existingResults.categoryTotalPoints[5] = totalPoints;
      }

      // Update existing results
      await axios.put(`http://localhost:8000/summary/results/${userId}`, {
        points: getMaxPoints,
        categoryTotalPoints: existingResults.categoryTotalPoints,
        totalXP: totalXP,
        totalPoints: totalPoints,
        hearts: updatedHearts,
        completed: existingResults.completed,
      });

      setTotalPoints(totalPoints);
      setTotalHearts(updatedHearts);
      console.log("totalPoints", totalPoints);
    } catch (error) {
      console.error("Error posting results:", error);
    }
  };

  useEffect(() => {
    updateQuizResults();
  }, []);

  const restartQuiz = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto w-3/5 mt-8 rounded-lg mb-10 bg-purple-400 p-8 shadow-2xl shadow-gray-600 flex justify-center items-center font-serif">
      <div className="grid">
        <div className="flex justify-center items-center mb-10">
          <img
            src={trophy}
            alt="quiz"
            className="flex size-36 justify-center rounded-full items-center"
          />
        </div>

        <h2 className="mb-8 font-bold text-3xl text-center ">Quiz Results</h2>
        <h2 className="mb-8 font-semibold text-xl text-center ">
          Congratulations, you have now completed the final quiz!!
        </h2>

        <div className="flex gap-x-4 justify-center items-center text-center ">
          <p className="grid space-y-2">
            <span className="font-semibold text-2xl">{points}</span>
            <span className="text">points</span>
          </p>

          <p className="grid space-y-2">
            <span className="font-semibold text-2xl">{totalPoints}</span>
            <span className="text">total points</span>
          </p>

          <p className="grid space-y-2">
            <span className="font-semibold text-2xl">{totalHearts}</span>
            <span className="text">hearts</span>
          </p>

          <p className="grid space-y-2">
            <span className="font-semibold text-2xl">
              {skippedAnswersShare}%
            </span>
            <span className="text">skipped</span>
          </p>

          <p className="grid space-y-2">
            <span className="font-semibold text-2xl">
              {correctAnswersShare}%
            </span>
            <span className="text">answered correctly</span>
          </p>

          <p className="grid space-y-2">
            <span className="font-semibold text-2xl">{wrongAnswersShare}%</span>
            <span className="text">answered incorrectly</span>
          </p>
        </div>

        <div className="border-2 border-solid border-blue-400 mt-2"></div>

        <h2 className="mt-6 font-semibold text-center">
          Green means correct, gray means skipped, and red means incorrect
        </h2>

        <ol>
          {userAnswers.map((answer, index) => {
            let cssClass = "";

            if (answer === "") {
              cssClass += "text-gray-300 font-semibold";
            } else if (answer === data[index].answers[0]) {
              cssClass += "text-green-900 font-semibold";
            } else {
              cssClass += "text-red-900 font-semibold";
            }

            return (
              <li key={index} className="text-center mb-4 mt-6">
                <h3 className="text-base mx-auto flex justify-center items-center bg-[#2c203d] text-[#d8cde8] w-8 h-8 rounded-full">
                  {index + 1}
                </h3>
                <p className="my-1 text-base text-[#30273a]">
                  {data[index].question}
                </p>
                <p className={cssClass}>{answer || "skipped"}</p>
              </li>
            );
          })}
        </ol>

        <h2 className="font-semibold text-center">
          Note that restarting the quiz if quiz is less than 3 will reset the
          maximum achievable hearts to 2.
        </h2>

        <div className="flex">
          <div className="container mx-auto text-center w-28 hover:bg-white shadow-md shadow-gray-400 bg-blue-300 rounded-md text-sm py-1 px-2 hover:duration-75 mt-4">
            <button onClick={restartQuiz}>Restart Quiz</button>
          </div>

          <div className="container mx-auto text-center w-28 hover:bg-white shadow-md shadow-gray-400 bg-blue-300 rounded-md text-sm py-1 px-2 hover:duration-75 mt-4">
            <Link to="/registered">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
