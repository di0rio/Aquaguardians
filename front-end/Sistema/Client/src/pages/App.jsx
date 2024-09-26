import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const App = () => {
  return (
    <div>
      <div>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
