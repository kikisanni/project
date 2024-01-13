import facebook from "../../assets/fb-logo.jpg";
import yahoo from "../../assets/yahoo-logo.png";
import microsoft from "../../assets/microsoft-logo.png";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";

function Button() {
  return (
    <div className="space-y-2 grid h-10 mt-8 font-serif">
      <h3 className="font-bold text-center">Let's get started!</h3>

      <GoogleButton />

      <FacebookButton />

      <button className="w-full bg-purple-300 text-white py-2 px-4 rounded-lg hover:bg-sky-300 transition duration-300 flex gap-x-2">
        <img src={yahoo} alt="login-image" className=" size-5 mt-1" />
        Continue with Yahoo
      </button>

      <button className="w-full bg-purple-300 text-white py-2 px-4 rounded-lg hover:bg-sky-300 transition duration-300 flex gap-x-2">
        <img src={microsoft} alt="login-image" className=" size-5 mt-1" />
        Continue with Mail
      </button>
    </div>
  );
}

export default Button;
