import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import UnregisteredUsers from "./components/Main/UnregisteredUsers";
import RegisteredUsers from "./components/Main/RegisteredUsers";
import FAQs from "./components/Main/FAQs";
import Login from "./components/GettingStarted/Login";
import Username from "./components/GettingStarted/Username";
import CommunitySection from "./components/Community/Community";
import RootLayout from "./components/Root";
import DefaultLayout from "./components/DefaultRoot";
import Dashboard from "./components/Dashboard/Dashboard";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <UnregisteredUsers /> },
//       { path: "login", element: <Login /> },
//     ],
//   },

//   {
//     path: "/registered",
//     element: <DefaultLayout />,
//     children: [
//       { index: true, element: <RegisteredUsers /> },
//       { path: "faqs", element: <FAQs /> },
//       { path: "profile", element: <Username /> },
//       { path: "community", element: <CommunitySection /> },
//       { path: "dashboard", element: <Dashboard /> },
//     ],
//   },

// ]);

function App() {
  // return <RouterProvider router={router} />;

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


  return (
    <>
      <Routes >
        <Route element={<RootLayout />}>
          <Route path="/" element={<UnregisteredUsers />} />
          <Route path="login" element={<Login />} />
          <Route path="registered" element={user && <RegisteredUsers />} />
          <Route path="community" element={user && <CommunitySection />} />
          <Route path="dashboard" element={user && <Dashboard />} />
          <Route path="faqs" element={user && <FAQs />} />
          <Route path="profile" element={user && <Username />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
