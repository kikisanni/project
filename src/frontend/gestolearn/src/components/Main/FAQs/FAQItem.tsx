import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4">
      <button
        className="text-left w-full flex font-semibold text-lg bg-purple-300 hover:bg-purple-400 rounded-xl pr-6 pl-6 pt-6 pb-6"
        onClick={toggleOpen}
      >
        {question}
        <ChevronDownIcon
          className="-mr-1 h-5 w-5 text-black ml-auto "
          aria-hidden="true"
        />
      </button>
      {isOpen && <p className="mt-2">{answer}</p>}
    </div>
  );
};

export default FAQItem;
