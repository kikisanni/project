import login from "../../assets/login.jpg";
import logo from "../../assets/logo.png";
import UsernameForm from "./UsernameForm";
import '../../../App.css';

function Username() {
  return (
    <div className="container mx-auto overscroll-none mt-40" >
    <div className="flex justify-center ">
      <h3 className="text-black font-bold font-serif text-3xl mb-6">Create Username</h3>
    </div>

    <div>
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 shadow-2xl shadow-gray-400 flex gap-x-14">
          <div>
            <img src={login} alt="login-image" className=" size-72" />
          </div>
          <UsernameForm />
        </div>
      </div>
    </div>
  </div>
  );
}

export default Username;
