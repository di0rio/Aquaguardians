import styles from "./Robos.module.css";

import { Link } from "react-router-dom";

const navigation = [{ componente: "/create", name: "Criar" }];

// const navigation2 = [{ componente: "/edit", name: "Editar" }];

const Robos = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Conteudo}>
        <div className={styles.Title}>
          <h2>Robôs</h2>
        </div>
      </div>
      <div className={styles.Btn}>
        {navigation.map((nav) => (
          <Link key={nav.name} to={nav.componente}>
            {nav.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Robos;
