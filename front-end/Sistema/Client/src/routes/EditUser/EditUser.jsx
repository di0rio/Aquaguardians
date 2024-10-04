import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EditUser.module.css";

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    playerId: "",
    userId: "",
    nickname: "",
    email: "",
    points: 0,
    address: "",
    createdAt: "",
  });

  useEffect(() => {
    if (!location.state || !location.state.playerId) {
      console.error("PlayerId não está disponível.");
      alert("Usuário não encontrado. Redirecionando...");
      navigate(-1);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://apiaquaguardians.somee.com/api/Players/${location.state.playerId}`
        );
        console.log("Dados do usuário:", response.data);
        setFormData({
          playerId: response.data.playerId || "",
          userId: response.data.userId || "",
          nickname: response.data.nickname || "",
          email: response.data.email || "",
          points: response.data.points || 0,
          address: response.data.address || "",
          createdAt: response.data.createdAt || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("Erro ao carregar os dados do usuário.");
      }
    };

    fetchUser();
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "points" ? parseInt(value, 10) : value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      playerId: formData.playerId,
      userId: formData.userId,
      nickname: formData.nickname,
      email: formData.email,
      points: formData.points,
      address: formData.address,
    };

    console.log("playerId que está sendo usado:", formData.playerId);
    console.log("Dados a serem enviados:", dataToSend);

    try {
      const response = await axios.put(
        `https://apiaquaguardians.somee.com/api/Players/${formData.playerId}`,
        dataToSend
      );

      if (response.status === 200 || response.status === 204) {
        alert("Usuário editado com sucesso!");
        navigate("/users");
      } else {
        alert("Erro ao editar usuário. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error.response?.data || error);
      alert("Erro ao editar usuário. Verifique os dados e tente novamente.");
      if (error.response) {
        console.error("Dados da resposta de erro:", error.response.data);
        console.error("Código de status:", error.response.status);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.form}>
        <div className={styles.header}>
          <h2>Editar Usuário</h2>
          <div className={styles.iconVoltar}>
            <ion-icon
              name="arrow-back-outline"
              type="button"
              onClick={handleGoBack}
            />
          </div>
        </div>
      <hr className={styles.linha} style={{ background: "#17DEE2", color: "#17DEE2" }} />
      <form className={styles.Container} onSubmit={handleEdit}>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="Nome do Usuário"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email do Usuário"
          required
        />
        {/* Campos invisíveis para o usuário */}
        <input type="hidden" name="points" value={formData.points} />
        <input type="hidden" name="address" value={formData.address} />
        
        <div className={styles.Input}>
          <label>Data de Criação:</label>
          <span>{new Date(formData.createdAt).toLocaleString()}</span>
        </div>
        <input type="hidden" name="userId" value={formData.userId} />
        <button className={styles.ButtonSubmit} type="submit">Editar</button>
      </form>
    </div>
  );
};

export default EditUser;
