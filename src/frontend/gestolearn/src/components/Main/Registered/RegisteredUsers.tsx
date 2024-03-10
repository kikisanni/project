import ProgressCards from "./ProgressCards";
import MapGamification from "./MapGamification";
import Intro from "./Intro";
import "../../../../App.css";
import Footer from "../../Footer/Footer";
import Copyright from "../../Footer/Copyright";

interface RegisteredUsersProps {
  user: any;
}

function RegisteredUsers({ user }: RegisteredUsersProps) {

  return (
    <div className="font-serif">
      <Intro user={user} />
      {/* <button onClick={startAudio}>Start Audio</button>
      <audio ref={audioRef} src="/mixkit-game-level.wav" loop /> */}
      <div className="flex flex-col items-center justify-center -ml-px pl-20 pr-16 py-12 px-16 max-md:px-5">
        <div className="ml-12 mr-4 mt-1 max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[69%] max-md:w-full max-md:ml-0">
              <MapGamification />
            </div>
            <ProgressCards />
          </div>
        </div>
      </div>
      <Copyright/>
    </div>
  );
}
export default RegisteredUsers;
