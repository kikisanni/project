import AboutUs from "./AboutUs";
import unregister_bg from "../../../assets/unregister-background.jpg";
import Features from "./Features";
import Testimonials from "./Testimonials";
import FAQs from "../FAQs/FAQs";
import "./Main.css";
import Footer from "../../Footer/Footer";

interface UnregisteredUsersProps {
  user: any;
}

function HomePage({user}: UnregisteredUsersProps) {
  return (
    <div className="grid space-y-8 font-serif fade">
      <AboutUs imageUrl={unregister_bg} />
      <Features user={user}/>
      <Testimonials />
      <FAQs />
      <Footer user={user}/>
    </div>
  );
}

export default HomePage;
