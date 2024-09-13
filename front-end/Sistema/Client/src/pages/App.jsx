import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "../Components/Header/Header";
import Footer from "../components/Footer/Footer";

const App = () => {
  return (
    <div className="container">
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default App;
