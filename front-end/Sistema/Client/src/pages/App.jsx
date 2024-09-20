import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const App = () => {
  return (
    <div className="container">
      <div>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
