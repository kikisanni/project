import { Outlet } from "react-router";
import Header from "./Header/Registered/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


function DefaultLayout() {

//   const [user, setUser] = useState({});
//   console.log("user", user);

//   const getUser = async () => {
//     try {
//       const url = "http://localhost:8000/auth/login/success";
//       const response = await axios.get(url, { withCredentials: true });
//       console.log("response", response);
//       setUser(response.data.user);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   if(Object.keys(user).length > 0) {
//     return <Navigate replace to={"/registered"} />;
//   }
  
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DefaultLayout;
