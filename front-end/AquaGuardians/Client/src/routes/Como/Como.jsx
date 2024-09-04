import Cards from "../../components/Cards/Cards";

import styles from "./Como.module.css";

const Como = () => {
  return (
    <div className={styles.Conatiner}>
      <div className={styles.Header}>
        <div className={styles.Box}>
          <div className={styles.Title}>
            <p>COMO JOGAR</p>
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

export default Como;
