import styles from "./Contato.module.css";
import React, { useState } from "react";
import Cards from "../../components/Cards/Cards";
import Modal from "../../components/Modal/Modal";

export const Contato = () => {
  const [modal, setModal] = useState("none");

  const changeModal = (newModal) => {
    setModal(newModal);
  };
  return (
    <>
      <div className={styles.Header}>
        <div className={styles.Box}>
          <div className={styles.Title}>
            <p>NOTAS DE ATUALIZAÇÃO</p>
          </div>
        </div>
      </div>

      <div className={styles.Cards1}>
        <div className={styles.Card1} onClick={() => changeModal("Modal-01")}>
          <Cards
            title={"NOTAS DA ATUALIZAÇÂO"}
            data={"01/08/20024"}
            sub={"Mudanças na gameplay do jogo..."}
            game={"AQUAGUARDIANS"}
          ></Cards>
        </div>

        <div className={styles.Card2} onClick={() => changeModal("Modal-02")}>
          <Cards
            title={"NOTAS DA ATUALIZAÇÂO"}
            data={"01/08/20024"}
            sub={"Mudanças na gameplay do jogo..."}
            game={"AQUAGUARDIANS"}
          ></Cards>
        </div>
      </div>
      <div className={styles.Cards2}>
        <div className={styles.Card3} onClick={() => changeModal("Modal-03")}>
          <Cards
            title={"NOTAS DA ATUALIZAÇÂO"}
            data={"01/08/20024"}
            sub={"Mudanças na gameplay do jogo..."}
            game={"AQUAGUARDIANS"}
          ></Cards>
        </div>

        <div className={styles.Card4} onClick={() => changeModal("Modal-04")}>
          <Cards
            title={"NOTAS DA ATUALIZAÇÂO"}
            data={"01/08/2024"}
            sub={"Mudanças na gameplay do jogo..."}
            game={"AQUAGUARDIANS"}
          ></Cards>
        </div>
      </div>

      {modal === "Modal-01" && (
        <Modal title={"Modal-01"} handleClose={() => changeModal("none")}>
          Texto modal 01
        </Modal>
      )}
      {modal === "Modal-02" && (
        <Modal title={"Modal-02"} handleClose={() => changeModal("none")}>
          Texto modal 02
        </Modal>
      )}
      {modal === "Modal-03" && (
        <Modal title={"Modal-03"} handleClose={() => changeModal("none")}>
          Texto modal 03
        </Modal>
      )}
      {modal === "Modal-04" && (
        <Modal title={"Modal-04"} handleClose={() => changeModal("none")}>
          Texto modal 04
        </Modal>
      )}
    </>
  );
};

export default Contato;
