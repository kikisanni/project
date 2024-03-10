import waving from "../../../assets/waving.jpg";
import waterWave from "../../../assets/water_wave.gif";

interface IntroProps {
  user: {
    username: string;
  };
}

export default function Intro({ user }: IntroProps) {
  return (
    <div className="flex p-8 justify-center items-center gap-x-4 font-bold font-serif">
      <h2 className="text-center text-3xl">Hey, {user.username}!</h2>
      <img src={waving} alt="waving" className="size-12" />
      <img src={waterWave} alt="waving" className="size-12" />
    </div>
  );
}
