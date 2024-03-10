import { useState, useRef } from "react";
import OutsideClick from "./OutsideClick";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const SortingDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Filter");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleOptionClicked = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  OutsideClick(dropdownRef, closeDropdown);

  return (
    <div
      className="relative inline-block text-left justify-end"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        {selectedOption}

        <ChevronDownIcon
          className="-mr-1 h-5 w-5 text-black"
          aria-hidden="true"
        />
      </button>

      {/* Dropdown panel, rendered conditionally based on `isOpen` */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={(e) => {
                e.preventDefault();
                handleOptionClicked("Most Recent");
              }}
            >
              Most Recent
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
              onClick={(e) => {
                e.preventDefault();
                handleOptionClicked("Oldest");
              }}
            >
              Oldest
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingDropdown;
