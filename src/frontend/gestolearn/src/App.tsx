import { Routes, Route } from "react-router-dom";
import axios from "axios";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
} from "react";

import HomePage from "./components/Main/Unregistered/HomePage";
import RegisteredUsers from "./components/Main/Registered/RegisteredUsers";
import FAQs from "./components/Main/FAQs/FAQs";
import Login from "./components/GettingStarted/Login";
import Username from "./components/GettingStarted/Username";
import CommunitySection from "./components/Community/Community";
import RootLayout from "./components/Root";
import Dashboard from "./components/Dashboard/Dashboard";
import Main from "./components/Quiz/Category1/Easy/Main";
import Greetings from "./components/Lessons/Greetings";
import Family from "./components/Lessons/Family";
import Emotions from "./components/Lessons/Emotions";
import Quiz from "./components/Quiz/Category1/Easy/Quiz";
import Summary from "./components/Quiz/Category1/Easy/Summary";
import Medium from "./components/Quiz/Category1/Medium/Medium";
import MediumQuiz from "./components/Quiz/Category1/Medium/MediumQuiz";
import MainEmotions from "./components/Quiz/Category3/Easy/MainEmotions";
import QuizEmotions from "./components/Quiz/Category3/Easy/QuizEmotions";
import MediumEmotions from "./components/Quiz/Category3/Medium/MediumEmotion";
import MediumQuizEmotions from "./components/Quiz/Category3/Medium/MediumQuizEmotions";
import MainFamily from "./components/Quiz/Category2/Easy/MainFamily";
import QuizFamily from "./components/Quiz/Category2/Easy/QuizFamily";
import MediumFamily from "./components/Quiz/Category2/Medium/MediumFamily";
import MediumQuizFamily from "./components/Quiz/Category2/Medium/MediumQuizFamily";
import GreetingsAssessmentMain from "./components/Assessment/Category1/Main";
import FamilyAssessmentMain from "./components/Assessment/Category2/Main";
import EmotionsAssessmentMain from "./components/Assessment/Category3/Main";
import GreetingsAssessment from "./components/Assessment/Category1/Assessment";
import EmotionAssessment from "./components/Assessment/Category3/Assessment";
import CommunityGuidelines from "./components/Footer/CommunityGuidelines";
import Terms from "./components/Footer/Terms";
import Footer from "./components/Footer/Footer";

type UserAnswersContextType = {
  userAnswers: string[];
  setUserAnswers: Dispatch<SetStateAction<string[]>>;
};

// Providing a default value for the context
const defaultValue: UserAnswersContextType = {
  userAnswers: [],
  setUserAnswers: () => {}, // empty function as a placeholder
};

export const UserAnswersContext =
  createContext<UserAnswersContextType>(defaultValue);

function App() {
  const [user, setUser] = useState({});
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
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

  return (
    <UserAnswersContext.Provider value={{ userAnswers, setUserAnswers }}>
      <Routes>
        <Route element={<RootLayout user={user} />}>
          <Route path="/" element={<HomePage user={user} />} />
          <Route
            path="registered"
            element={
              Object.keys(user).length > 0 ? (
                <RegisteredUsers user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />
          <Route
            path="community"
            element={
              Object.keys(user).length > 0 ? (
                <CommunitySection user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />
          <Route
            path="dashboard"
            element={
              Object.keys(user).length > 0 ? (
                <Dashboard user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />
          <Route
            path="faqs"
            element={
              Object.keys(user).length > 0 ? <FAQs /> : <HomePage user={user} />
            }
          />

          <Route
            path="quiz-1"
            element={
              Object.keys(user).length > 0 ? (
                <Main user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />
          <Route
            path="quiz-1-easy"
            element={
              Object.keys(user).length > 0 ? (
                <Quiz user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-1b"
            element={
              Object.keys(user).length > 0 ? (
                <Medium user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-1-medium"
            element={
              Object.keys(user).length > 0 ? (
                <MediumQuiz user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-2"
            element={
              Object.keys(user).length > 0 ? (
                <MainFamily user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-2-easy"
            element={
              Object.keys(user).length > 0 ? (
                <QuizFamily user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-2b"
            element={
              Object.keys(user).length > 0 ? (
                <MediumFamily user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-2-medium"
            element={
              Object.keys(user).length > 0 ? (
                <MediumQuizFamily user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-3"
            element={
              Object.keys(user).length > 0 ? (
                <MainEmotions user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-3-easy"
            element={
              Object.keys(user).length > 0 ? (
                <QuizEmotions user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-3b"
            element={
              Object.keys(user).length > 0 ? (
                <MediumEmotions user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="quiz-3-medium"
            element={
              Object.keys(user).length > 0 ? (
                <MediumQuizEmotions user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="greetings"
            element={
              Object.keys(user).length > 0 ? (
                <Greetings />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="emotions"
            element={
              Object.keys(user).length > 0 ? (
                <Emotions />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="family"
            element={
              Object.keys(user).length > 0 ? (
                <Family />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="assessment1"
            element={
              Object.keys(user).length > 0 ? (
                <GreetingsAssessmentMain user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="assessment1-hard"
            element={
              Object.keys(user).length > 0 ? (
                <GreetingsAssessment />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="assessment2"
            element={
              Object.keys(user).length > 0 ? (
                <FamilyAssessmentMain user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />

          <Route
            path="assessment3"
            element={
              Object.keys(user).length > 0 ? (
                <EmotionsAssessmentMain user={user} />
              ) : (
                <HomePage user={user} />
              )
            }
          />
        </Route>

        <Route
          path="assessment3-hard"
          element={
            Object.keys(user).length > 0 ? (
              <EmotionAssessment />
            ) : (
              <HomePage user={user} />
            )
          }
        />

        <Route path="/guidelines" element={<CommunityGuidelines />} />
        <Route path="/terms" element={<Terms />} />

        <Route
          path="profile"
          element={Object.keys(user).length > 0 && <Username />}
        />

        <Route path="login" element={<Login />} />
      </Routes>
    </UserAnswersContext.Provider>
  );
}

export default App;
