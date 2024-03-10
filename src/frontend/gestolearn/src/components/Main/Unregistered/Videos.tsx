import { Link } from "react-router-dom";
import videos from "../../../assets/videos.jpg";

const textWithLineBreaks = `Dive into the heart of learning with 
our Interactive Videos! Engage 
with content like never before, as 
you click and explore knowledge 
in action.
`;

interface VideosProps {
  user: any;
}

export default function Videos({ user }: VideosProps) {
  return (
    <div className=" container max-w-full flex p-10 justify-around gap-x-32 items-center">
      <img src={videos} alt="videos" className=" size-72 rounded-3xl" />

      <div>
        <h1 className="font-bold text-3xl mb-2 text-violet-400">
          Interactive Videos
        </h1>
        <p className="text-2xl" style={{ whiteSpace: "pre-line" }}>
          {textWithLineBreaks}
        </p>
        <button className="mt-6 bg-purple-400 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {Object.keys(user).length > 0 ? (
            <Link key="videos" to="/registered">
              Get Started
            </Link>
          ) : (
            <Link key="videos" to="/login">
              Get Started
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}
