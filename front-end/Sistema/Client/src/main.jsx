import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./routes/Login/Login.jsx";

import Usuarios from "./routes/Usuarios/Usuarios.jsx";
import CreateUser from "./routes/CreateUser/CreateUser.jsx";
import EditUser from "./routes/EditUser/EditUser.jsx";

import Robos from "./routes/Robos/Robos.jsx";
import CreateRobot from "./routes/CreateRobot/CreateRobot.jsx";
import EditRobot from "./routes/EditRobot/EditRobot.jsx";

import Postos from "./routes/Postos/Postos.jsx";
import CreatePosto from "./routes/CreatePosto/CreatePosto.jsx";
import EditPosto from "./routes/EditPosto/EditPosto.jsx";

import Funcionarios from "./routes/Funcionarios/Funcionarios.jsx"
import CreateFuncionario from "./routes/CreateFuncionarios/CreateFuncionarios.jsx";
import EditFuncionario from "./routes/EditFuncionario/EditFuncionario.jsx"

import Empresas from "./routes/Empresas/Empresas.jsx";
import CreateEmpresa from "./routes/CreateEmpresa/CreateEmpresa.jsx";
import EditEmpresa from "./routes/EditEmpresa/EditEmpresa.jsx";


const router = createBrowserRouter([  
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Login /> },

      { path: "users", element: <Usuarios /> },
      { path: "createuser", element: <CreateUser /> },
      { path: "edituser", element: <EditUser /> },

      { path: "robos", element: <Robos /> },
      { path: "createrobot", element: <CreateRobot /> },
      { path: "editrobot", element: <EditRobot /> },

      { path: "postos", element: <Postos /> },
      { path: "createposto", element: <CreatePosto /> },
      { path: "editposto", element: <EditPosto /> },

      { path: "funcionarios", element: <Funcionarios /> },
      { path: "createfuncionario", element: <CreateFuncionario /> },
      { path: "editfuncionario", element: <EditFuncionario /> },

      { path: "empresas", element: <Empresas /> },
      { path: "createempresa", element: <CreateEmpresa /> },
      { path: "editempresa", element: <EditEmpresa /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
