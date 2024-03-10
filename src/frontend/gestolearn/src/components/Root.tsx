import { Outlet } from "react-router";
import Header from "./Header/Header";


interface RootLayoutProps {
  user: any;
}

const RootLayout: React.FC<RootLayoutProps> = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
