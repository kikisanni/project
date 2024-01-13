import { Outlet } from "react-router";
import Header from "./Header/Registered/Header";


function RootLayout() {
  
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
