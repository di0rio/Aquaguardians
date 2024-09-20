import styles from "./Login.module.css";

import { Link } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

const navigation = [{ componente: "/users", name: "Login" }];

const Login = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Conteudo}>
        <div className={styles.Title}>
          <h2>Login</h2>
        </div>
        <div className={styles.Inputs}>
          <div className={styles.Email}>
            <input type="email" placeholder="E-mail" />
          </div>
          <div className={styles.Password}>
            <input type="password" placeholder="Senha" />
          </div>
        </div>
        <div className={styles.Duvida}>
          <a href="#">esqueceu a senha?</a>
        </div>
      </div>
      <div className={styles.divBtn}>
        <div className={styles.Btn}>
          {navigation.map((nav) => (
            <Link
              className="nav-link nav-item py-1 py-md-none px-md-3 text-light fs-5"
              key={nav.name}
              to={nav.componente}
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
