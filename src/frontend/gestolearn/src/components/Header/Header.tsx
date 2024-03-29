import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import RightNavbar from "./RightNavbar";
import DisclosurePanel from "./DisclosurePanel";
import GetStartedButton from "./GetStartedButton";
import { useNavigate, Navigate } from 'react-router-dom';
import '../../../App.css';

interface HeaderProps {
  user: any;
}

const Header: React.FC<HeaderProps> = ({ user }) =>{
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    if (Object.keys(user).length > 0) {
      navigate('/registered');
    } else {
      navigate('/');
    }
  };

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 shadow-xl ">
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
                <div className="flex flex-shrink-0 items-center gap-x-2 cursor-pointer" onClick={handleLogoClick}>
                  <img className="h-8 w-auto" src={logo} alt="GestoLearn" />
                  <h3 className="text-black font-bold font-serif">
                    GestoLearn
                  </h3>
                </div>
              </div>
              {Object.keys(user).length > 0 ? (
                <RightNavbar user={user}/>
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


export default Header;