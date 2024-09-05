import styles from "./Cards.module.css";
import React, { useState } from "react";

const Cards = ({ title, sub, data, game, img, desc }) => {
  return (
    <>
      <div className={styles.ContainerCard}>
        <div className={styles.Card}>
          <div>
            <img src={img} alt={desc} width={600} height={280} />
          </div>
          <div className={styles.Conteudo}>
            <div className={styles.Header}>
              <div className={styles.ContPart1}>
                <p>{title}</p>
              </div>
              <div className={styles.ContPart2}>
                <p>{data}</p>
              </div>
            </div>
            <div className={styles.Cont}>
              <div className={styles.ContPart4}>
                <p>{sub}</p>
              </div>
            </div>
            <div className={styles.Cont2}>
              <div className={styles.ContPart5}>
                <p>{game}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
