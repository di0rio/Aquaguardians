import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Usuarios from "../routes/Usuarios/Usuarios.jsx";
import Robos from "../routes/Robos/Robos.jsx";
import Postos from "../routes/Postos/Postos.jsx";
import Funcionarios from "../routes/Funcionarios/Funcionarios.jsx";
import Login from "../routes/Login/Login.jsx";
import Produtos from "../routes/Produtos/Produtos.jsx";
import Empresas from "../routes/Empresas/Empresas.jsx";
import Transiction from "../routes/Transictions/Transictions.jsx";
import CreatePosto from "../routes/CreatePosto/CreatePosto.jsx";
import CreateRobot from "../routes/CreateRobot/CreateRobot.jsx";
import CreateFuncionario from "../routes/CreateFuncionarios/CreateFuncionarios.jsx";
import CreateProduct from "../routes/CreateProduct/CreateProduct.jsx";
import CreateProductCategory from "../routes/CreateProdutoCategory/CreateProductCategory.jsx";
import CreateEmpresas from "../routes/CreateEmpresa/CreateEmpresa.jsx";
import CreateTransiction from "../routes/CreateTransiction/CreateTransiction.jsx";
import EditPosto from "../routes/EditPosto/EditPosto.jsx";
import EditRobot from "../routes/EditRobot/EditRobot.jsx";
import EditFuncionario from "../routes/EditFuncionario/EditFuncionario.jsx";
import EditUser from "../routes/EditUser/EditUser.jsx";
import EditProduct from "../routes/EditProduct/EditProduct.jsx";
import EditProductCategory from "../routes/EditProductCategory/EditProductCategory.jsx";
import EditEmpresa from "../routes/EditEmpresa/EditEmpresa.jsx";
import EditTransiction from "../routes/EditTransiction/EditTransiction.jsx";
import AdminRoute from "../routes/AdminRoute.jsx";
import { AuthProvider } from "../Auth.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.js";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AdminRoute />}>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Usuarios />} />
            {/* Protege todas as rotas abaixo */}
            {/* Rota padrão */}
            <Route path="/users/edit/:id" element={<EditUser />} />
            {/* Rota com parâmetro */}
            <Route path="/robos" element={<Robos />} />
            <Route path="/robos/create" element={<CreateRobot />} />
            <Route path="/robos/edit/:id" element={<EditRobot />} />
            <Route path="/postos" element={<Postos />} />
            <Route path="/postos/create" element={<CreatePosto />} />
            <Route path="/postos/edit/:id" element={<EditPosto />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route
              path="/funcionarios/create"
              element={<CreateFuncionario />}
            />
            <Route
              path="/funcionarios/edit/:id"
              element={<EditFuncionario />}
            />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/create" element={<CreateProduct />} />
            <Route path="/produtos/edit/:id" element={<EditProduct />} />
            <Route
              path="/produtos/category/create"
              element={<CreateProductCategory />}
            />
            <Route
              path="/produtos/category/edit/:id"
              element={<EditProductCategory />}
            />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/empresas/create" element={<CreateEmpresas />} />
            <Route path="/empresas/edit/:id" element={<EditEmpresa />} />
            <Route path="/transiction" element={<Transiction />} />
            <Route
              path="/transiction/create"
              element={<CreateTransiction />}
            />
            <Route
              path="/transiction/edit/:id"
              element={<EditTransiction />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
