import facebook from "../../assets/fb-logo.jpg";

export default function FacebookButton() {
  return (
    <button className="w-full bg-purple-300 text-white py-2 px-4 rounded-lg hover:bg-sky-300 transition duration-300 flex gap-x-2">
      <img src={facebook} alt="login-image" className=" size-5 mt-1" />
      Continue with Facebook
    </button>
  );
}
