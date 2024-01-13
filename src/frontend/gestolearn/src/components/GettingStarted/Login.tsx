import Button from "./Button";
import login from "../../assets/login.jpg";
import logo from "../../assets/logo.png";

function Login() {
  return (
    <div className="container mx-auto overscroll-none mt-48" >
      <div className="flex justify-center ">
        <img className="h-10 w-10" src={logo} alt="GestoLearn" />
        <h3 className="text-black font-bold font-serif text-3xl mb-6">GestoLearn</h3>
      </div>

      <div>
        <div className="flex justify-center items-center">
          <div className="bg-white p-8 shadow-2xl shadow-blue-200 flex gap-x-14">
            <div>
              <img src={login} alt="login-image" className=" size-72" />
            </div>
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
