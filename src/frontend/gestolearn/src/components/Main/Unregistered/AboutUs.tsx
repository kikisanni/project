import aboutus from "../../../assets/aboutus.jpg";

interface BackgroundProps {
  imageUrl: string;
}

const AboutUs: React.FC<BackgroundProps> = ({ imageUrl }) => {
  // const backgroundStyle = {
  //   backgroundImage: `url(${imageUrl})`,
  //   // height: "40vh",
  //   // width: "2000px",
  //   backgroundRepeat: "no-repeat",
  // };

  const textWithLineBreaks = `Your immersive gateway to mastering American Sign Language (ASL)! 
  Dive into our engaging lessons, enriched with quizzes and hands-on
  activities. Connect with others in our vibrant community, track your
  progress on a personalised dashboard,and experience revolutionary
  real-time feedback with our innovative assessment tool. Begin your ASL
  journey with GestoLearn — where language flourishes at your
  fingertips!`;

  return (
    <div className="p-10 gap-x-12 bg-blue-200 container max-w-full flex">

      <div className="mt-11 mx-40" >
      <h1 className="font-bold text-2xl">Welcome to GestoLearn</h1>
      <p style={{ whiteSpace: "pre-line" }}>
        {textWithLineBreaks}
      </p>
      </div>
      
      <img src={aboutus} alt="login-image" className=" size-72 rounded-3xl" />
    </div>
  );
};

export default AboutUs;
