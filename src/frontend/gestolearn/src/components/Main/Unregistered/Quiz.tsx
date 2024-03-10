import { Link } from "react-router-dom";
import quiz from "../../../assets/quiz.jpg";

const textWithLineBreaks = `Challenge your wits with our 
 dynamic Quizzes! Every question 
 is a chance to prove your mastery 
 and sharpen your skills in an 
 exciting way.
`;

interface QuizProps {
  user: any;
}

export default function Quiz({user}: QuizProps) {
  return (
    <div className=" container max-w-full flex p-10 justify-around gap-x-32 items-center">
      <div>
        <h1 className="font-bold text-3xl mb-2 text-violet-400">Quiz</h1>
        <p className="text-2xl" style={{ whiteSpace: "pre-line" }}>
          {textWithLineBreaks}
        </p>
        <button className="mt-6 bg-purple-400 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {Object.keys(user).length > 0 ? (<Link key="quiz" to="/registered">
            Get Started
          </Link>) : (<Link key="quiz" to="/login">
            Get Started
          </Link>)}
        </button>
      </div>

      <img src={quiz} alt="login-image" className=" size-72 rounded-3xl" />
    </div>
  );
}
