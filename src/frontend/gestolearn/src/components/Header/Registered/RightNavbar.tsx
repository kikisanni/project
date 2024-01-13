import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { navigation } from "./navigation";

export default function RightNavbar() {

  return (
    <div>
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div className="hidden sm:ml-6 sm:block sm-justify-end">
        <div className="flex space-x-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-200 text-black rounded-md"
                  : "text-black hover:bg-purple-300 hover:text-black rounded-md px-3 py-2 text-sm font-medium"
              }
              end
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Profile dropdown */}
      <ProfileDropdown />
    </div>
    </div>
  );
}
