import { NavLink } from "react-router-dom";

export default function GetStartedButton() {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button className="inline-flex w-full justify-center gap-x-1.5 bg-purple-400 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <NavLink key="login" to="/login">
          {" "}
          Get Started
        </NavLink>
      </button>
    </div>
  );
}
