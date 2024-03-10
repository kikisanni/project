import { Link } from "react-router-dom";
import assessment from "../../../assets/assessment.jpg";

const textWithLineBreaks = `Experience comprehensive Sign 
Language Assessment paired with 
cutting-edge Emotion Detection 
technology. Improve your 
communication skills in real-time, 
with personalised feedback.
`;

const assessmentLineBreak = `Emotion Detection and 
Sign Language Assessment`;


interface AssessmentProps {
  user: any;
}

export default function Assessment({user}: AssessmentProps) {
  return (
    <div className=" container max-w-full flex p-10 justify-around gap-x-32 items-center">
    <img src={assessment} alt="videos" className=" size-72 rounded-3xl" />

    <div>
      <h1 className="font-bold text-3xl mb-2 text-violet-400" style={{ whiteSpace: "pre-line" }}>
       {assessmentLineBreak}
      </h1>
      <p className="text-2xl" style={{ whiteSpace: "pre-line" }}>
        {textWithLineBreaks}
      </p>
      <button className="mt-6 bg-purple-400 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      {Object.keys(user).length > 0 ? (<Link key="videos" to="/registered">
            Get Started
          </Link>) : (<Link key="assessment" to="/login">
            Get Started
          </Link>)}
      </button>
    </div>
  </div>
  );
}
