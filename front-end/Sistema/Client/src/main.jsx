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

import CreatePosto from "./routes/CreatePosto/CreatePosto.jsx";
import CreateRobot from "./routes/CreateRobot/CreateRobot.jsx";
import CreateFuncionario from "./routes/CreateFuncionarios/CreateFuncionarios.jsx";
import CreateProduct  from "./routes/CreateProduct/CreateProduct.jsx";
import CreateProductCategory from "./routes/CreateProdutoCategory/CreateProductCategory.jsx";
import CreateUser from "./routes/CreateUser/CreateUser.jsx";


import EditPosto from "./routes/EditPosto/EditPosto.jsx";
import EditRobot from "./routes/EditRobot/EditRobot.jsx";
import EditFuncionario from "./routes/EditFuncionario/EditFuncionario.jsx"
import EditUser from "./routes/EditUser/EditUser.jsx";
import EditProduct from "./routes/EditProduct/EditProduct.jsx";
import EditProductCategory from "./routes/EditProductCategory/EditProductCategory.jsx";


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

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
