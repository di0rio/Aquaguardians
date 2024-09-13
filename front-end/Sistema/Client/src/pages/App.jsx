import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

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
