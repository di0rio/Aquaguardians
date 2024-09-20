import styles from "./Login.module.css";

import { Link } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

const navigation = [{ componente: "/users", name: "Usuários" }];

const Login = () => {
  return (
    <div className={styles.Container}>
      {navigation.map((nav) => (
        <Link
          className={styles.Btn}
          key={nav.name}
          to={nav.componente}
        >
          {nav.name}
        </Link>
      ))}
    </div>
  );
};

export default Login;
