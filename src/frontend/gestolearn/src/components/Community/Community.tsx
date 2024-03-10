import PostForm from "./PostForm";
import Posts from "./Posts";
import "../../../App.css";
import Copyright from "../Footer/Copyright";

interface CommunityProps {
  user: any;
}

const CommunitySection: React.FC<CommunityProps> = ({ user }) => {
  return (
    <div>
      <div className="container mx-auto mt-10 font-serif">
        <div className="text-center">
          <h2 className="mb-5 font-bold underline underline-offset-8 decoration-blue-400 text-3xl">
            {" "}
            Community
          </h2>
          <h2>
            Connect, Share, and Grow. A dynamic community for sharing knowledge
            in sign language.
          </h2>
        </div>

        <PostForm user={user} />
        <Posts />
      </div>
      <Copyright />
    </div>
  );
};

export default CommunitySection;
