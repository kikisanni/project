import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  user: any;
}

function Footer({ user }: FooterProps) {
  return (
    <div className="mt-24">
      <svg
        className="w-full h-10 md:h-20 -mt-10 md:-mt-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#BFDBFE"
          fillOpacity="1"
          d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,250.7C672,256,768,224,864,192C960,160,1056,128,1152,138.7C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <footer className="bg-blue-200 text-gray-700 p-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <h2 className="text-4xl font-semibold"> GestoLearn</h2>

          <div>
            <h5 className="font-bold mb-3">Navigate</h5>
            <ul>
              <li className="mb-1">
                {" "}
                {Object.keys(user).length > 0 ? (
                  <Link key="home" to="/registered">
                    Home
                  </Link>
                ) : (
                  <Link key="home" to="/login">
                    Home
                  </Link>
                )}
              </li>

              <li className="mb-1">
                {Object.keys(user).length > 0 ? (
                  <Link key="community" to="/community">
                    Community
                  </Link>
                ) : (
                  <Link key="community" to="/login">
                    Community
                  </Link>
                )}
              </li>

              <li className="mb-1">
                {Object.keys(user).length > 0 ? (
                  <Link key="faqs" to="/faqs">
                    FAQs
                  </Link>
                ) : (
                  <Link key="faqs" to="/login">
                    FAQs
                  </Link>
                )}
              </li>

              <li className="mb-1">
                {Object.keys(user).length > 0 ? (
                  <Link key="dashboard" to="/dashboard">
                    Dashboard
                  </Link>
                ) : (
                  <Link key="dashboard" to="/login">
                    Dashboard
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-3">Learn</h5>
            <ul>
              <li className="mb-1">
                {Object.keys(user).length > 0 ? (
                  <Link key="lessons" to="/registered">
                    Lessons
                  </Link>
                ) : (
                  <Link key="lessons" to="/login">
                    Lessons
                  </Link>
                )}
              </li>

              <li className="mb-1">
                {Object.keys(user).length > 0 ? (
                  <Link key="quiz" to="/registered">
                    Quizzes
                  </Link>
                ) : (
                  <Link key="quiz" to="/login">
                    Quizzes
                  </Link>
                )}
              </li>

              <li className="mb-1">
                {Object.keys(user).length > 0 ? (
                  <Link key="assessment" to="/registered">
                    Assessments
                  </Link>
                ) : (
                  <Link key="assessment" to="/login">
                    Assessments
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-3">Let's Stay Connected</h5>
            <p>Enter your email</p>
            <form className="mt-2">
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 text-gray-700 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="p-2 bg-purple-300 rounded-xl ml-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="flex text-sm mt-8 justify-around">
          <h2 className="">Dublin City University</h2>
          <h2 className="">Computer Applications Final Year Project</h2>
          <h2 className="">© 2024 Okikiola Sanni & Effa Al Bulushi</h2>
          <div className="flex gap-x-3">
            <Link
              to="/guidelines"
              className="underline underline-offset-8 decoration-purple-400"
            >
              Community Guidelines
            </Link>
            <h2> | </h2>
            <Link
              to="/terms"
              className="underline underline-offset-8 decoration-purple-400"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
