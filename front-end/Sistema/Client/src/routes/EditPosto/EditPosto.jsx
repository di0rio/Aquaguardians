import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EditPosto.module.css";

const EditPosto = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    RobotStationId: "", // Adicionado ao estado
    location: "",
    status: "",
    name: "",
    capacity: "",
  });

  useEffect(() => {
    if (!location.state || !location.state.RobotStationId) {
      console.error("RobotStationId não está disponível.");
      alert("Posto não encontrado. Redirecionando...");
      navigate(-1); // Redireciona se não encontrar o ID
      return;
    }

    const fetchPosto = async () => {
      try {
        const response = await axios.get(
          `https://apiaquaguardians.somee.com/api/RobotStations/${location.state.RobotStationId}`
        );
        setFormData({
          RobotStationId: location.state.RobotStationId, // Adiciona o ID ao formData
          location: response.data.location,
          status: response.data.status,
          name: response.data.name,
          capacity: response.data.capacity,
        });
      } catch (error) {
        console.error("Erro ao buscar dados do posto:", error);
        alert("Erro ao carregar os dados do posto.");
      }
    };

    fetchPosto();
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async () => {
    try {
      // Faz a requisição PUT para atualizar os dados do posto
      const response = await axios.put(
        `https://apiaquaguardians.somee.com/api/RobotStations/${formData.RobotStationId}`,
        formData // Passando o objeto formData, que agora inclui o RobotStationId
      );

      if (response.status === 204) {
        alert("Posto editado com sucesso!");
        navigate(-1); // Redireciona de volta após a edição
      } else {
        alert("Erro ao editar posto. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error(
        "Erro ao editar posto:",
        error.response ? error.response.data : error
      );
      alert("Erro ao editar posto. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Conteudo}>
        <div className={styles.Title}>
          <h2>Editar</h2>
        </div>
        <div className={styles.Input}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome do Posto"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Status do Posto"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Localização do Posto"
              required
            />
          </div>
          <div>
            <input
              type="number" // Mantido como number para garantir um formato adequado
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Capacidade do Posto"
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.Btns}>
        <div className={styles.BtnCriar}>
          <button onClick={handleEdit}>Editar</button>
        </div>
        <div className={styles.BtnVoltar}>
          <button onClick={handleGoBack}>Voltar</button>
        </div>
      </div>
    </div>
  );
};

export default EditPosto;
