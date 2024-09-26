import styles from "./Usuarios.module.css";

import { Link } from "react-router-dom";

const navigation = [
  { componente: "/create", name: "Criar" },
  // { componente: "/edit", name: "Editar" },
];

const Usuarios = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Conteudo}>
        <div className={styles.Title}>
          <h2>Usuários</h2>
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

export default Usuarios;
