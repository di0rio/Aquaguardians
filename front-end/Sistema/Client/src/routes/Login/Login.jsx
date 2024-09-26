import styles from "./Login.module.css";

import { Link } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

const navigation = [{ componente: "/users", name: "Login" }];

const Login = () => {
  return (
    <div className={styles.Page}>
      <div className={styles.Container}>
        <div className={styles.Conteudo}>
          <div className={styles.Title}>
            <h2>LOGIN</h2>
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
            <a href="#">Esqueceu a senha?</a>
          </div>
        </div>
        <div>
          <div className={styles.Btn}>
            {navigation.map((nav) => (
              <Link
                className="nav-link nav-item py-1 py-md-none px-md-3 text-light fs-5"
                key={nav.name}
                to={nav.componente}
              >
                <button className={styles.divBtn}>{nav.name}</button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
