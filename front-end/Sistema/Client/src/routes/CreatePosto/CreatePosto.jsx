import styles from "./CreatePosto.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Removido useLocation, não necessário aqui
import axios from "axios";

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
        "http://apiaquaguardians.somee.com/api/RobotStations",
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
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.Content}>
        <h2>Cadastrar Posto</h2>
      </div>
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
      <div className={styles.btns}>
        {/* Modificado para chamar handleGoBack */}
        <button className={styles.Add} type="submit">
          Adicionar Item
        </button>
        <button className={styles.Voltar} type="button" onClick={handleGoBack}>
          Voltar
        </button>{" "}
      </div>
    </form>
  );
};

export default CreatePosto;
