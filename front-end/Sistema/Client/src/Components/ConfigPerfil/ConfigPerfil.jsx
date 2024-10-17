import { useAuth } from "../../Auth";
import styles from "./ConfigPerfil.module.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ConfigPerfil = () => {
  const { logout } = useAuth();
  return (
    <div className={styles.container}>
      <div className="dropstart">
        <button
          className="dropdown p-0"
          type="button"
          data-bs-toggle="dropdown"
        >
          <i className="bi bi-person-circle" />
        </button>
        <ul className="dropdown-menu">
          <li>
            <h5 className="text-center my-0">Perfil</h5>
          </li>
          <li>
            <hr
              className="dropdown-divider mx-3 my-2"
              style={{ backgroundColor: "#fff" }}
            />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Dark/Light Mode
            </a>
          </li>
          <li>
            <button className="dropdown-item text-bg-danger" onClick={logout}>
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConfigPerfil;
