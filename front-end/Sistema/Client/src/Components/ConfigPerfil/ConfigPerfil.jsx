import { useState, useEffect } from "react";
import { useAuth } from "../../Auth";
import styles from "./ConfigPerfil.module.css";

const ConfigPerfil = () => {
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Altera o tema do body baseado no estado darkMode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-white");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-white");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

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
            <button
              className="dropdown-item"
              onClick={toggleDarkMode}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
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
