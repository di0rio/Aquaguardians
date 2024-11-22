import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EditRobot.module.css";
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";

const EditRobot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    robotId: "", // ID do robô
    robotStationId: "", // ID da estação
    name: "",
    model: "",
    createdAt: "", // Inicialize com uma string vazia
    isAvaliableForRent: false,
  });

  const [stations, setStations] = useState([]);

  const fetchStations = async () => {
    try {
      const response = await axios.get(
        `https://aquaguardians.somee.com/api/RobotStations`
      );
      if (response.status === 200) {
        setStations(response.data);
      } else {
        console.error("Erro ao buscar estações:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar estações:", error);
    }
  };

  useEffect(() => {
    fetchStations();

    if (!location.state || !location.state.robotId) {
      console.error("RobotId não está disponível.");
      alert("Robô não encontrado. Redirecionando...");
      navigate(-1);
      return;
    }

    const fetchRobot = async () => {
      try {
        const response = await axios.get(
          `https://aquaguardians.somee.com/api/Robots/${location.state.robotId}`
        );
        console.log("Dados do robô:", response.data);
        setFormData({
          robotId: location.state.robotId, // Adicione o robotId
          robotStationId: response.data.robotStationId || "", // Garante uma string vazia se não estiver definido
          name: response.data.name || "", // Garante que tenha um valor
          model: response.data.model || "", // Garante que tenha um valor
          createdAt: response.data.createdAt || "", // Garante que tenha um valor
          isAvaliableForRent: response.data.isAvaliableForRent || false, // Garante um booleano
        });
      } catch (error) {
        console.error("Erro ao buscar dados do robô:", error);
        alert("Erro ao carregar os dados do robô.");
      }
    };

    fetchRobot();
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://aquaguardians.somee.com/api/Robots/${formData.robotId}`,
        formData
      );

      if (response.status === 200 || response.status === 204) {
        alert("Robô editado com sucesso!");
        navigate(-1);
      } else {
        alert("Erro ao editar robô. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error(
        "Erro ao editar robô:",
        error.response ? error.response.data : error
      );
      alert("Erro ao editar robô. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h2>Editar Robô</h2>
        <div className={styles.iconVoltar}>
          <ion-icon
            name="arrow-back-outline"
            type="button"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <hr style={{ background: "#17DEE2", color: "#17DEE2" }} />
      <form className={styles.Container} onSubmit={handleEdit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome do Robô"
          required
        />
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Modelo do Robô"
          required
        />
        <input
          type="text"
          name="createdAt"
          value={formData.createdAt} // Certifique-se de que sempre tenha um valor
          placeholder="Data de Criação"
          readOnly
        />
        <label>
          <input
            className={styles.custombox}
            type="checkbox"
            name="isAvaliableForRent"
            checked={formData.isAvaliableForRent}
            onChange={handleChange}
          />
          Disponível para Aluguel
        </label>
        <select
          className={styles.Label}
          name="robotStationId"
          value={formData.robotStationId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Selecione a Estação
          </option>
          {stations.map((station) => (
            <option key={station.robotStationId} value={station.robotStationId}>
              {station.name}
            </option>
          ))}
        </select>
        <ButtonSubmit text="Editar" />
      </form>
    </div>
  );
};

export default EditRobot;
