import { Link } from "react-router-dom"

import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const navigation = [
  { componente: "/users", name: "Usuários" },
  { componente: "/robos", name: "Robôs" },
  { componente: "/postos", name: "Postos" },
];

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md bg-info top-0">
      <div className="container-fluid">

        {/* 
          data-bs-toggle="collapse": ativa a função de Colapso do Bootstrap, que mostra ou esconde um elemento (data-bs-target)
          data-bs-target="#navbarNav": referencia o elemento que vai ser mostrado ou colapsado
        */}

        <a className="navbar-brand" href="/">AquaGuardians</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas offcanvas-start" id="offcanvasNavbar">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body justify-content-end">
            {navigation.map((nav) => (
              <Link className="nav-link nav-item py-1 py-md-none px-md-3" key={nav.name} to={nav.componente}>{nav.name}</Link>   
              ))
            }
          </div>
        </div>
        
        <div className="d-none d-md-inline-flex">
          <p className="my-auto ms-5 me-3">Nome do Adiministrador</p>
          <div className="dropstart">
            <button className="dropdown-toggle" data-bs-toggle="dropdown">
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

      </div>
    </nav>
  )
}

export default Header