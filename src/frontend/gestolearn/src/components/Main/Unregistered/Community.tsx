import { Link } from "react-router-dom";
import community from "../../../assets/community.jpg";

const textWithLineBreaks = `Join our vibrant Community! 
Connect, share, and grow with 
fellow learners in a space that 
celebrates every step of your 
educational journey.
`;

interface CommunityProps {
  user: any;
}

export default function Community({ user }: CommunityProps) {
  return (
    <div className=" container max-w-full flex p-10 justify-around gap-x-32 items-center">
      <div>
        <h1 className="font-bold text-3xl mb-2 text-violet-400">Community</h1>
        <p className="text-2xl" style={{ whiteSpace: "pre-line" }}>
          {textWithLineBreaks}
        </p>
        <button className="mt-6 bg-purple-400 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {Object.keys(user).length > 0 ? (
            <Link key="community" to="/registered">
              Get Started
            </Link>
          ) : (
            <Link key="community" to="/login">
              Get Started
            </Link>
          )}
        </button>
      </div>

      <img src={community} alt="login-image" className=" size-72 rounded-3xl" />
    </div>
  );
}
