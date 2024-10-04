import styles from "./CreatePosto.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Removido useLocation, não necessário aqui
import axios from "axios";
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";

const CreatePosto = () => {
  const navigate = useNavigate(); // Inicialize o hook useNavigate
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await axios.post(
        "https://apiaquaguardians.somee.com/api/RobotStations",
        {
          location,
          status,
          name,
          capacity,
        }
      );
      console.log("Item criado:", resposta.data);
      // Limpar os campos após o envio, se necessário
      setLocation("");
      setStatus("");
      setName("");
      setCapacity("");
    } catch (erro) {
      console.error("Erro ao criar o item:", erro);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Retorna à página anterior
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>Cadastrar Posto</h2>
        <ion-icon
          name="arrow-back-outline"
          type="button"
          onClick={handleGoBack} />
      </div>
      <hr style={{ background: "#17DEE2", color: "#17DEE2" }} />
      <div className={styles.container}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Localização"
          required
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Capacidade"
          required
        />
        <ButtonSubmit text="Adicionar Item" />
      </div>
    </form>
  );
};

export default CreatePosto;
