import { Outlet } from "react-router";
import Header from "./Header/Unregistered/Header";

function RootL() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootL;
