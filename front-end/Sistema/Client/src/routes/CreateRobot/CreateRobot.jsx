import styles from "./CreateRobot.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateRobot = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [robotStationId, setRobotStationId] = useState("");
  const [stations, setStations] = useState([]);
  const [isAvaliableForRent, setIsAvaliableForRent] = useState(false);

  const fetchStations = async () => {
    try {
      const resposta = await axios.get(
        "https://apiaquaguardians.somee.com/api/RobotStations"
      );
      if (resposta.status === 200) {
        setStations(resposta.data);
      } else {
        console.error("Erro ao buscar estações:", resposta.statusText);
      }
    } catch (erro) {
      console.error("Erro ao buscar estações:", erro);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();

    try {
      const resposta = await axios.post(
        "https://apiaquaguardians.somee.com/api/Robots",
        {
          name,
          model,
          createdAt: currentDate,
          isAvaliableForRent,
          robotStationId, // Converte para número
        }
      );

      if (resposta.status === 201) {
        console.log("Item criado:", resposta.data);
        setName("");
        setModel("");
        setRobotStationId("");
        setIsAvaliableForRent(false);
      } else {
        console.error("Erro ao criar o item:", resposta.statusText);
      }
    } catch (erro) {
      if (erro.response && erro.response.data) {
        console.error("Erro de validação:", erro.response.data);
      } else {
        console.error("Erro ao criar o item:", erro);
      }
      alert("Erro ao criar o robô. Verifique os dados e tente novamente.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        required
      />
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Modelo"
        required
      />
      <input
        type="text"
        value={new Date().toISOString()} // Mostrando a data atual
        placeholder="Horário de Criação"
        readOnly // Campo somente leitura
      />
      <label>
        <input
          type="checkbox"
          checked={isAvaliableForRent}
          onChange={(e) => setIsAvaliableForRent(e.target.checked)}
        />
        Disponível
      </label>
      <select
        value={robotStationId}
        onChange={(e) => setRobotStationId(e.target.value)}
        required
      >
        <option value="" disabled>
          Selecione a estação
        </option>
        {stations.map((station) => (
          <option key={station.robotStationId} value={station.robotStationId}>
            {station.name} {/* Exibindo o nome da estação */}
          </option>
        ))}
      </select>

      <button type="submit">Adicionar Item</button>
      <button type="button" onClick={handleGoBack}>
        Voltar
      </button>
    </form>
  );
};

export default CreateRobot;
