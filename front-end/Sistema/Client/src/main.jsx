import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Usuarios from "./routes/Usuarios/Usuarios.jsx";
import Robos from "./routes/Robos/Robos.jsx";
import Postos from "./routes/Postos/Postos.jsx";
import Funcionarios from "./routes/Funcionarios/Funcionarios.jsx"
import Login from "./routes/Login/Login.jsx";

import CreatePosto from "./routes/CreatePosto/CreatePosto.jsx";
import CreateRobot from "./routes/CreateRobot/CreateRobot.jsx";
import CreateFuncionario from "./routes/CreateFuncionarios/CreateFuncionarios.jsx";

import EditPosto from "./routes/EditPosto/EditPosto.jsx";
import EditRobot from "./routes/EditRobot/EditRobot.jsx";
import EditFuncionario from "./routes/EditFuncionario/EditFuncionario.jsx"


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
      { path: "funcionarios", element: <Funcionarios /> },
      { path: "createfuncionario", element: <CreateFuncionario /> },
      { path: "createposto", element: <CreatePosto /> },
      { path: "createrobot", element: <CreateRobot /> },
      { path: "editposto", element: <EditPosto /> },
      { path: "editrobot", element: <EditRobot /> },
      { path: "editfuncionario", element: <EditFuncionario /> },

 
      

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
