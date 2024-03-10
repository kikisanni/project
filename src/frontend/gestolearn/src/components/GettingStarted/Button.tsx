import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";

function Button() {
  return (
    <div className="space-y-4 grid h-10 mt-12 font-serif">
      <h3 className="font-bold text-center">Let's get started!</h3>

      <GoogleButton />

      <GithubButton />
    </div>
  );
}

export default Button;
