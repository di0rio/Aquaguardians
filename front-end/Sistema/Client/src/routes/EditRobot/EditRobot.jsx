import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EditRobot.module.css";

const EditRobot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    robotStationId: "", // ID da estação
    name: "",
    model: "",
    createdAt: "",
    isAvaliableForRent: false,
  });

  const [stations, setStations] = useState([]);

  // Fetch stations for the select dropdown
  const fetchStations = async () => {
    try {
      const response = await axios.get(
        `https://apiaquaguardians.somee.com/api/RobotStations`
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

    console.log("location.state:", location.state);

    // !location.state ||     || !location.state.RobotStationId
    if (!location.state.robotId) {
      console.error("RobotId ou RobotStationId não estão disponíveis.");
      alert("Robô ou Estação não encontrados. Redirecionando...");
      navigate(-1);
      return;
    }

    const fetchRobot = async () => {
      try {
        const response = await axios.get(
          `https://apiaquaguardians.somee.com/api/Robots/${location.state.robotId}`
        );
        console.log("Dados do robô:", response.data);
        // Verifique se robotStationId existe na resposta
        setFormData({
          robotStationId: response.data.robotStationId || "",
          name: response.data.name,
          model: response.data.model,
          createdAt: response.data.createdAt,
          isAvaliableForRent: response.data.isAvaliableForRent,
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
        `https://apiaquaguardians.somee.com/api/Robots/${location.state.robotId}`,
        formData // Passando o objeto formData
      );

      if (response.status === 200) {
        alert("Robô editado com sucesso!");
        navigate(-1); // Redireciona de volta após a edição
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
    <div className={styles.Container}>
      <h2>Editar Robô</h2>
      <form onSubmit={handleEdit}>
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
          value={formData.createdAt} // Exibir a data de criação
          placeholder="Data de Criação"
          readOnly // Campo somente leitura
        />
        <label>
          <input
            type="checkbox"
            name="isAvaliableForRent"
            checked={formData.isAvaliableForRent}
            onChange={handleChange}
          />
          Disponível para Aluguel
        </label>
        <select
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

        <button type="submit">Editar Robô</button>
        <button type="button" onClick={handleGoBack}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default EditRobot;
