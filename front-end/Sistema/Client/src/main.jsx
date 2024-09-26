import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Usuarios from "./routes/Usuarios/Usuarios.jsx";
import Robos from "./routes/Robos/Robos.jsx";
import Postos from "./routes/Postos/Postos.jsx";
import Login from "./routes/Login/Login.jsx";
import CreatePosto from "./routes/CreatePosto/CreatePosto.jsx";
import EditPosto from "./routes/EditPosto/EditPosto.jsx";

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
      { path: "editposto", element: <EditPosto /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
