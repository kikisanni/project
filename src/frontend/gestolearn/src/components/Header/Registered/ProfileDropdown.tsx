import classNames from "../ClassNames";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";

const logoutHandler = () => {
  window.location.href = "http://localhost:8000/auth/logout";
};

export default function ProfileDropdown() {
  return (
    <Menu as="div" className="relative inline-block ml-3">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-purple-400 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          kikisanni
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <NavLink
                to="/dashboard"
                className={classNames(
                  active ? "bg-purple-200" : "",
                  "block px-4 py-2 text-sm text-black"
                )}
              >
                Dashboard
              </NavLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <NavLink
                to="/profile"
                className={classNames(
                  active ? "bg-purple-200" : "",
                  "block px-4 py-2 text-sm text-black"
                )}
              >
                Edit Profile
              </NavLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <NavLink
                to="#"
                className={classNames(
                  active ? "bg-purple-200" : "",
                  "block px-4 py-2 text-sm text-black"
                )}
                onClick={logoutHandler}
              >
                Sign out
              </NavLink>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
