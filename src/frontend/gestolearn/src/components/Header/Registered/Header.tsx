import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../../assets/logo.png";
import RightNavbar from "./RightNavbar";
import DisclosurePanel from "./DisclosurePanel";
import axios from "axios";
import { useEffect, useState } from "react";
import GetStartedButton from "./GetStartedButton";

export default function Header() {
  const [user, setUser] = useState({});
  console.log("user", user);

  const getUser = async () => {
    try {
      const url = "http://localhost:8000/auth/login/success";
      const response = await axios.get(url, { withCredentials: true });
      console.log("response", response);
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // const logoutHandler = () => {
  //   window.location.href = "http://localhost:8000/logout";
  // }

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 shadow-xl shadow-purple-200">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center gap-x-2">
                  <img className="h-8 w-auto" src={logo} alt="GestoLearn" />
                  <h3 className="text-black font-bold font-serif">
                    GestoLearn
                  </h3>
                </div>
              </div>
              {Object.keys(user).length > 0 ? (
                <RightNavbar />
              ) : (
                <GetStartedButton />
              )}
            </div>
          </div>

          <DisclosurePanel />
        </>
      )}
    </Disclosure>
  );
}
