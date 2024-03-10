import { useState, useCallback, useRef, useEffect } from "react";
import data from "./data";
import QuestionTimer from "./QuestionTimer";
import "./question.css";
import Summary from "./Summary";
import React, { useContext } from "react";
import { UserAnswersContext } from "../../../../App";

interface QuestionProps {
  user: any;
}

function Questions({ user }: QuestionProps) {
  const [shuffledAnswers, setShuffledAnswers] = useState<
    { answer: string; option: string }[]
  >([]);
  const [answerState, setAnswerState] = useState("");
  const [answerTimeoutId, setAnswerTimeoutId] = useState<number | null>(null);
  const { userAnswers, setUserAnswers } = useContext(UserAnswersContext);

  const timer = 10000;

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === data.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer: string) => {
      // Clear any existing timeout
      if (answerTimeoutId) {
        clearTimeout(answerTimeoutId);
      }

      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);

      const timeoutId = window.setTimeout(() => {
        if (selectedAnswer === data[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        const innerTimeoutId = window.setTimeout(() => setAnswerState(""), 1000);
        setAnswerTimeoutId(innerTimeoutId);
      }, 1000);

      setAnswerTimeoutId(timeoutId);
    },
    [activeQuestionIndex, answerTimeoutId]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer("skipped"),
    [handleSelectAnswer]
  );

  useEffect(() => {
    if (!quizIsComplete) {
      // Shuffle only the answers
      const shuffledAnswers = [...data[activeQuestionIndex].answers];
      shuffledAnswers.sort(() => Math.random() - 0.5);

      // Map the static options to the shuffled answers
      const answersWithOptions = shuffledAnswers.map((answer, index) => ({
        answer,
        option: data[activeQuestionIndex].options[index],
      }));

      setShuffledAnswers(answersWithOptions);
    }
  }, [activeQuestionIndex, quizIsComplete]);

  // Cleanup useEffect
  useEffect(() => {
    return () => {
      if (answerTimeoutId) {
        clearTimeout(answerTimeoutId);
      }
    };
  }, [answerTimeoutId]);

  return (
    <div>
      {quizIsComplete ? (
        <Summary userAnswers={userAnswers} user={user} />
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
                {data[activeQuestionIndex]?.question}
              </h2>
            </div>
            <div className="container mx-auto w-2/5 h-84 mt-4 mb-5 p-8  shadow-gray-400 flex justify-center items-center">
              <img
                src={data[activeQuestionIndex]?.image}
                alt="quiz"
                className="size-6/6 rounded-lg"
              />
            </div>

            <ul id="answers">
              {shuffledAnswers.map((item, index) => {
                const isSelected =
                  userAnswers[userAnswers.length - 1] === item.answer;
                let cssClass = "bg-purple-300";

                if (answerState === "answered" && isSelected) {
                  cssClass = "bg-purple-400";
                } else if (answerState === "correct" && isSelected) {
                  cssClass = "bg-green-900 border border-green-900 text-black";
                } else if (answerState === "wrong" && isSelected) {
                  cssClass = "bg-red-900 border border-red-900 text-black";
                }

                return (
                  <li
                    key={item.answer}
                    className="container mx-auto w-2/5 h-2/6 pt-3 pb-3 pl-4 rounded-lg mb-1 text-center hover:text-purple-600"
                  >
                    <button
                      onClick={() => handleSelectAnswer(item.answer)}
                      className={`cursor-pointer ${cssClass} w-full h-full py-2 rounded-lg flex justify-start items-center border border-purple-500 shadow-md shadow-gray-900`}
                    >
                      {/* Static option label */}
                      <span className="border border-purple-500 ml-2 rounded-md pl-1 pr-1 mr-2">
                        {`${data[activeQuestionIndex].options[index]}.`}
                      </span>{" "}
                      {/* Answer text */}
                      <span className="flex-grow font-semibold">{item.answer}</span>
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
