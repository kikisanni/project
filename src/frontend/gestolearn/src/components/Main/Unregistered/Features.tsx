import Videos from "./Videos";
import Quiz from "./Quiz";
import Assessment from "./Assessment";
import Community from "./Community";

const textWithLineBreaks2 = `Challenge your wits with our 
 dynamic Quizzes! Every question 
 is a chance to prove your mastery 
 and sharpen your skills in an 
 exciting way.
`;

interface FeaturesProps {
  user: any;
}

export default function Features({user}: FeaturesProps) {
  return (
    <div className="container mx-auto space-y-2 grid max-w-full">
      <Videos user={user}/>

      <Quiz user={user}/>

      <Assessment user={user}/>

      <Community user={user}/>
    </div>
  );
}
