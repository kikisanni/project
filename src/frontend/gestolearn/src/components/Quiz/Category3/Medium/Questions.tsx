import { useState, useCallback, useRef, useEffect } from "react";
import data from "./data";
import QuestionTimer from "./QuestionTimer";
import "./question.css";
import Summary from "./Summary";
import React, { useContext } from "react";
import { UserAnswersContext } from "../../../../App";

type QuestionsProps = {
  user: any;
};

function Questions({user}: QuestionsProps) {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [answerState, setAnswerState] = useState("");
  const { userAnswers, setUserAnswers } = useContext(UserAnswersContext);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const timer = 10000;

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === data.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer: string) {
      setSelectedAnswer(selectedAnswer);
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === data[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
          setSelectedAnswer("");
        }, 30);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(""),
    [handleSelectAnswer]
  );

  const shuffleAnswers = useCallback(() => {
    const newShuffledAnswers = [
      ...data?.[activeQuestionIndex]?.answers.filter(
        (answer) => !selectedAnswer.includes(answer)
      ),
    ];
    newShuffledAnswers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(newShuffledAnswers);
  }, [activeQuestionIndex, selectedAnswer]);

  useEffect(() => {
    if (!quizIsComplete) {
      shuffleAnswers();
    }
  }, [activeQuestionIndex, quizIsComplete, shuffleAnswers]);

  const remainingAnswers = shuffledAnswers.filter(
    (answer) => !selectedAnswer.includes(answer)
  );

  return (
    <div>
      {quizIsComplete ? (
        <Summary userAnswers={userAnswers} user={user}/>
      ) : (
        <>
          <div>
            <div className="flex justify-center items-center mb-8">
              <QuestionTimer
                key={activeQuestionIndex}
                timeout={timer}
                onTimeout={handleSkipAnswer}
              />
            </div>
            <div className="flex justify-center items-center">
              <h2 className="font-semibold text-xl">
                {data[activeQuestionIndex].question}
              </h2>
            </div>
            <div className="container mx-auto w-2/5 h-84 mt-8 rounded-lg mb-10 bg-white p-8 shadow-2xl shadow-gray-400 flex justify-center items-center">
              <img
                src={data[activeQuestionIndex].image}
                alt="quiz"
                className="size-5/6"
              />
            </div>

            <div className="flex justify-center mb-10">
              __________________________________________________________________________________________________
            </div>
            <h2 className="text-center text-xl font-semibold ">
              {selectedAnswer}
            </h2>
            <div className="flex justify-center mb-10">
              __________________________________________________________________________________________________
            </div>
            <div className="flex justify-center mb-10">
              __________________________________________________________________________________________________
            </div>

            <ul id="answers" className="flex justify-center items-center gap-x-36">
              {shuffledAnswers.map((answer) => {
                const isSelected =
                  userAnswers[userAnswers.length - 1] === answer;
                let cssClass = "bg-purple-300";

                if (answerState === "answered" && isSelected) {
                  cssClass = "bg-purple-400";
                } else if (answerState === "correct" && isSelected) {
                  cssClass = "bg-green-900";
                } else if (answerState === "wrong" && isSelected) {
                  cssClass = "bg-red-900";
                }

                return (
                  <li
                    key={answer}
                    className="rounded-lg flex justify-center items-center mb-10 text-center"
                  >
                    <button
                      onClick={() => handleSelectAnswer(answer)}
                      className={`cursor-pointer ${cssClass} mx-auto px-5 py-2 rounded-lg  font-semibold shadow-md shadow-gray-900 hover:bg-purple-400`}
                    >
                      {answer}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Questions;
