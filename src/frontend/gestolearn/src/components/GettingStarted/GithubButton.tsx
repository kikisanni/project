import github from "../../assets/github-logo.png";

export default function GithubButton() {
  const handleClick = () => {
    window.location.href = "http://localhost:8000/auth/github/";
  };
  return (
    <button onClick={handleClick} className="w-full bg-purple-300 text-black py-2 px-4 rounded-lg hover:bg-sky-300 transition duration-300 flex gap-x-2">
      <img src={github} alt="login-image" className=" size-5 mt-1" />
      Continue with Github
    </button>
  );
}
