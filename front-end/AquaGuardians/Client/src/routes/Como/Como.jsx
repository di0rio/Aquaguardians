import Cards from "../../components/Cards/Cards";

import styles from "./Como.module.css";

const Como = () => {
  return (
    <div className={styles.Conatiner}>
      <div className={styles.Header}>
        <div className={styles.Box}>
          <div className={styles.Title}>
            <p>COMO JOGAR?</p>
          </div>
        </div>
      </div>
      <div className={styles.Card1}>
        <Cards
          title={"Passo 1"}
          sub={"Controle seu robô: Utilize as teclas de seta ou joystick para mover seu robô submarino pelos ambientes aquáticos."}
        ></Cards>
        <Cards
          title={"Passo 2"}
          sub={"Identifique o lixo: Observe atentamente o fundo do mare os rios para encontrar os diferentes tipos de lixo,como garrafas de plástico, latas e redes de pesca.  "}
        ></Cards>
      </div>
      <div className={styles.Card2}>
        <Cards
          title={"Passo 3"}
          sub={"Transporte o lixo: Navegue cuidadosamente até o posto de coleta, evitando obstáculos e outros perigossubaquáticos."}
        ></Cards>
        <Cards
          title={"Passo 4"}
          sub={"Transporte o lixo: Navegue cuidadosamente até o posto de coleta, evitando obstáculos e outrosperigos subaquáticos."}
        ></Cards>
      </div>
    </div>
  );
};

export default Como;
