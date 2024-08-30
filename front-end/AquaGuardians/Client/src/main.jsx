import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home/Home.jsx'
import Contato from './routes/Contato/Contato.jsx'
import Como from './routes/Como/Como.jsx'
import Error from './routes/Error/Error.jsx'
import Registro from './routes/Registro/Registro.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "contato", element: <Contato /> },
      { path: "como", element: <Como /> },
      { path: "registro", element: <Registro /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)