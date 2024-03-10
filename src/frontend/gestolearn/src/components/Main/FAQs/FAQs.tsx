import React from "react";
import FAQItem from "./FAQItem";
import "../../../../App.css";
import Copyright from "../../Footer/Copyright";
const faqs = [
  {
    question: "How do I track my learning progress?",
    answer:
      "Your learning progress can be tracked on your personalised dashboard, which displays your achievements and lessons completed. This can be accessed in the navbar by clicking your username.",
  },
  {
    question: "How does the real-time assessment work?",
    answer:
      "Our assessment page uses emotion detection and sign capture technology to provide immediate feedback to adjust your facial expression (this feature is only available for the emotional state category). During the assessment, you will have a timer to capture the sign language after the emotion detection feedback has been given. ",
  },
  {
    question: "Is emotion detection taken into account for points?",
    answer:
      "No, emotion detection is not taken into account for gaining or losing points, the capturing of the sign language  is.",
  },
  {
    question: "Is GestoLearn suitable for beginners?",
    answer:
      "Absolutely! The aim of GestoLearn is to create an easy-to-use tool that can educate people on sign language for basic or commonly-used words.",
  },
  {
    question: "Is there a cost for using GestoLearn?",
    answer:
      "Latest information on subscriptions and any free trial offerings will be updated in due course.",
  },
];

const FAQs: React.FC = () => {
  return (
      <div className=" container mx-auto mt-10 mb-10 font-serif">
        <div className="text-center">
          <h2 className="mb-3 font-bold underline underline-offset-8 decoration-blue-400 text-3xl">
            {" "}
            Frequently Asked Questions
          </h2>
        </div>

        <div className="container mx-auto w-4/5 mt-8 rounded-lg mb-10">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
  );
};

export default FAQs;
