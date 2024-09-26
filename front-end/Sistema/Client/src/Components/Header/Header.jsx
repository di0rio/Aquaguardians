import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

import styles from "./Header.module.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const navigation = [
  { componente: "/users", name: "Usuários" },
  { componente: "/robos", name: "Robôs" },
  { componente: "/postos", name: "Postos" },
];

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className={styles.container}>
      <nav className="navbar navbar-expand-md bg-info top-0 container-fluid px-5">

          {/* 
            data-bs-toggle="collapse": ativa a função de Colapso do Bootstrap, que mostra ou esconde um elemento (data-bs-target)
            data-bs-target="#navbarNav": referencia o elemento que vai ser mostrado ou colapsado
          */}

          {/* Logo do AquaGuardians */}
          <a className={styles.aquaGuardians} href="/">AquaGuardians</a>


          {/* Ícone NavBar no Mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
            <i class="bi bi-justify"></i>
          </button>

          {/* Restante da NavBar */}
          <div className="offcanvas offcanvas-start" id="offcanvasNavbar">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Nome do Administrador</h5>

              <div className="dropstart ms-5">
                <button className="dropdown" data-bs-toggle="dropdown">
                  <i class="bi bi-person-circle"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><p className="mx-2 text-center">Perfil</p></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li> <button className="dropdown-item" href="#"> Dark/Light Mode </button> </li>
                  <li><a className="dropdown-item text-bg-danger" href="#">Sair</a></li>
                </ul>
              </div>

              <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>

            <hr className="m-0" />

            <div className="offcanvas-body justify-content-end nav-underline px-5">
              {navigation.map((nav) => (
                <Link className="nav-link nav-item my-1 my-md-none mx-md-3" key={nav.name} to={nav.componente}>{nav.name}</Link>   
                ))
              }
            </div>

          </div>
          
          {/* 
            Dropdown a direita em desktop
          */}
          <div className="d-none d-md-inline-flex">
            <p className="my-auto ms-5 me-3">Nome do Adiministrador</p>
            <div className="dropstart">
              <button className="dropdown" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle"></i>
              </button>
              <ul class="dropdown-menu">
                <li><p className="mx-2 text-center">Perfil do Administrador</p></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Dark/Light Mode</a></li>
                <li><a className="dropdown-item text-bg-danger" href="#">Sair</a></li>
              </ul>
            </div>
          </div>
      </nav>
    </div>
  )
}

export default Header;
