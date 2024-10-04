import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Usuarios from "./routes/Usuarios/Usuarios.jsx";
import Robos from "./routes/Robos/Robos.jsx";
import Postos from "./routes/Postos/Postos.jsx";
import Login from "./routes/Login/Login.jsx";
import CreatePosto from "./routes/CreatePosto/CreatePosto.jsx";
import CreateRobot from "./routes/CreateRobot/CreateRobot.jsx";
import EditPosto from "./routes/EditPosto/EditPosto.jsx";
import EditRobot from "./routes/EditRobot/EditRobot.jsx";
import CreateUser from "./routes/CreateUser/CreateUser.jsx";
import EditUser from "./routes/EditUser/EditUser.jsx";


const router = createBrowserRouter([  
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Login /> },
      { path: "users", element: <Usuarios /> },
      { path: "robos", element: <Robos /> },
      { path: "postos", element: <Postos /> },
      { path: "createposto", element: <CreatePosto /> },
      { path: "createrobot", element: <CreateRobot /> },
      { path: "createuser", element: <CreateUser /> },
      { path: "editposto", element: <EditPosto /> },
      { path: "editrobot", element: <EditRobot /> },
      { path: "edituser", element: <EditUser /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
