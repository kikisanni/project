import google from "../../assets/google-logo.png";

export default function GoogleButton() {
  const handleClick = () => {
    window.location.href = "http://localhost:8000/auth/google/";
  };

  return (
    <button onClick={handleClick} className="w-full bg-purple-300 text-white py-2 px-4 rounded-lg hover:bg-sky-300 transition duration-300 flex gap-x-2">
      <img src={google} alt="login-image" className="size-4 mt-1" />
      Continue with Google
    </button>
  );
}
