import { Link, useNavigate } from "react-router-dom";
import quiz from "../../../../assets/quiz.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Copyright from "../../../Footer/Copyright";

axios.defaults.withCredentials = true;

interface MainProps {
  user: any;
}

interface ExistingResults {
  hearts: number;
  completed: number;
}

function Main({ user }: MainProps) {
  const navigate = useNavigate();
  const [existingResults, setExistingResults] =
    useState<ExistingResults | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = user._id;
  const getResults = async () => {
    try {
      const resultsResponse = await axios.get(
        `http://localhost:8000/summary/results/${userId}`
      );
      const existingResults: any = resultsResponse.data;
      console.log("existing", existingResults);

      // Set the existingResults state with the fetched data
      setExistingResults(existingResults);
    } catch (error) {
      console.error("Error getting results:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  console.log("existing", existingResults?.hearts);
  console.log("completed", existingResults?.completed);

  const openModal = () => {
    if (existingResults) {
      if (existingResults!.completed > 1 && existingResults!.completed !== 1) {
        setIsModalOpen(true);
      } else {
        window.location.href = "/quiz-1-easy";
      }
    } else {
      // Navigate to the quiz page or use React Router navigation here
      window.location.href = "/quiz-1-easy";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteResults = async () => {
    try {
      // Send a DELETE request to delete the user's results
      await axios.delete(`http://localhost:8000/summary/delete/${userId}`);
    } catch (error) {
      console.error("Error deleting results:", error);
    }

    // navigate("/quiz-1-easy");
    window.location.href = '/quiz-1-easy';
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-serif">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-4 rounded-lg shadow-md z-10">
        <h2 className="text-xl font-semibold mb-2">Sorry,</h2>
        <p className="mb-4">
          This level has already been completed, and cannot be accessed!
        </p>
        <p>
          If you want to restart this quiz, understand that you will lose your
          previous points, XP, and leaderboard rank.
        </p>
        <div className="flex gap-x-10 mt-6">
          <button
            className="bg-blue-100 rounded-md py-1 px-2 hover:duration-75"
            onClick={closeModal}
          >
            Close
          </button>

          <button
            className="bg-blue-100 rounded-md py-1 px-2 hover:duration-75"
            onClick={deleteResults}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );

  const instructions = [
    "Make sure you have watched the lessons before attempting this quiz.",
    "Beware that you could lose hearts(s) if you get any question wrong.",
    "You need hearts to proceed to the next category. You cannot gain hearts",
    "If the answer you pick turns green, it means it is correct otherwise incorrect.",
  ];

  return (
    <div>
    <div className="container mx-auto mt-10 font-serif ">
      <div className="text-center">
        <h2 className="mb-3 font-bold underline underline-offset-8 decoration-blue-400 text-3xl">
          Quiz 1: Greetings - Easy
        </h2>
        <h2>Start this quiz, win Gesto points at the end!</h2>
      </div>

      <div className="container mx-auto w-2/5 h-64 mt-8 rounded-lg mb-10 bg-white p-8 shadow-2xl shadow-gray-400 flex justify-center items-center">
        <img src={quiz} alt="quiz" className="size-40" />
      </div>

      <div className="grid text-center mb-10">
        <h2 className="font-bold text-xl mb-4">Instructions</h2>
        <ul>
          {instructions.map((each) => {
            return <li key={each}>{each}</li>;
          })}
        </ul>
      </div>

      <menu className="flex gap-20 mt-4 justify-center mb-10">
        <li>
          <button className="hover:bg-white bg-white shadow-md shadow-gray-400 rounded-lg py-1 px-6 hover:duration-75">
            <Link to="/registered">Later</Link>
          </button>
        </li>
        <li>
          <button
            className="hover:bg-white shadow-md shadow-gray-400 bg-blue-100 rounded-md py-1 px-2 hover:duration-75"
            onClick={openModal}
          >
            Start Quiz
          </button>
        </li>
      </menu>
      {isModalOpen && modal}
    </div>
    <Copyright />
    </div>
  );
}

export default Main;
