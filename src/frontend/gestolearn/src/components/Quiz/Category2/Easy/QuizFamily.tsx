import { useSelector } from "react-redux";
import Questions from "./Questions";
import { useEffect } from "react";

type QuizProps = {
  user: any
};

function QuizFamily({user}:QuizProps) {
  const state = useSelector((state) => state);

  useEffect(() => {
    console.log("state", state);
  });

  return (
    <div className="grid  mt-8 mb-10 p-8">

      <Questions user={user}/>

    </div>
  );
}

export default QuizFamily;
