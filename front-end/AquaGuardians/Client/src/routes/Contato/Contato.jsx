import styles from "./Contato.module.css";

import Cards from "../../components/Cards/Cards";

export const Contato = () => {
  return (
    <div className={styles.Conatiner}>
      <div className={styles.Header}>
        <div className={styles.Box}>
          <div className={styles.Title}>
            <p>NOTAS DE ATUALIZAÇÃO</p>
          </div>
        </div>
      </div>
      <div className={styles.Card1}>
        <Cards></Cards>
        <Cards></Cards>
      </div>
      <div className={styles.Card2}>
        <Cards></Cards>
        <Cards></Cards>
      </div>
    </div>
  );
};

export default Contato;
