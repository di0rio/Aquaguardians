import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";



import Usuarios from "./routes/Usuarios/Usuarios.jsx";
import Robos from "./routes/Robos/Robos.jsx";
import Postos from "./routes/Postos/Postos.jsx";
import Funcionarios from "./routes/Funcionarios/Funcionarios.jsx"
import Login from "./routes/Login/Login.jsx";
import Produtos from "./routes/Produtos/Produtos.jsx"
import Empresas from "./routes/Empresas/Empresas.jsx"

import CreatePosto from "./routes/CreatePosto/CreatePosto.jsx";
import CreateRobot from "./routes/CreateRobot/CreateRobot.jsx";
import CreateFuncionario from "./routes/CreateFuncionarios/CreateFuncionarios.jsx";
import CreateProduct  from "./routes/CreateProduct/CreateProduct.jsx";
import CreateProductCategory from "./routes/CreateProdutoCategory/CreateProductCategory.jsx";
import CreateEmpresas from "./routes/CreateEmpresa/CreateEmpresa.jsx"
import CreateUser from "./routes/CreateUser/CreateUser.jsx";


import EditPosto from "./routes/EditPosto/EditPosto.jsx";
import EditRobot from "./routes/EditRobot/EditRobot.jsx";
import EditFuncionario from "./routes/EditFuncionario/EditFuncionario.jsx"
import EditUser from "./routes/EditUser/EditUser.jsx";
import EditProduct from "./routes/EditProduct/EditProduct.jsx";
import EditProductCategory from "./routes/EditProductCategory/EditProductCategory.jsx";
import EditEmpresa from "./routes/EditEmpresa/EditEmpresa.jsx"


const router = createBrowserRouter([  
  {
    path: "/",
    element: <App />,
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
      { path: "produtos", element: <Produtos /> },
      { path: "createfuncionario", element: <CreateFuncionario /> },
      { path: "createposto", element: <CreatePosto /> },
      { path: "createproduct", element: <CreateProduct /> },
      { path: "createproductcategory", element: <CreateProductCategory /> },
      { path: "createrobot", element: <CreateRobot /> },
      { path: "createuser", element: <CreateUser /> },
      { path: "editposto", element: <EditPosto /> },
      { path: "editrobot", element: <EditRobot /> },
      { path: "edituser", element: <EditUser /> },
      { path: "editproduct", element: <EditProduct /> },
      { path: "editproductcategory", element: <EditProductCategory /> },
      { path: "editfuncionario", element: <EditFuncionario /> },
      { path: "empresas", element: <Empresas /> },
      { path: "createempresa", element: <CreateEmpresas /> },
      { path: "editempresa", element: <EditEmpresa /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
