import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Robos.module.css";
import { Link } from "react-router-dom";

const navigation = [{ componente: "/createrobot", name: "Criar" }];

const Robos = () => {
  const [robos, setRobos] = useState([]);
  const [estacoes, setEstacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/RobotStations"
        );
        console.log("Estações:", response.data); // Verificando a estrutura
        setEstacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar estações:", error);
        setError("Erro ao carregar estações.");
      }
    };

    const fetchRobos = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/Robots"
        );
        console.log("Robôs:", response.data); // Verificando a estrutura
        setRobos(response.data);
      } catch (error) {
        setError("Erro ao carregar dados dos robôs.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstacoes();
    fetchRobos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este robô?")) {
      try {
        await axios.delete(
          `https://apiaquaguardians.somee.com/api/Robots/${id}`
        );
        setRobos(robos.filter((rob) => rob.robotId !== id));
      } catch (error) {
        console.error("Erro ao deletar o robô:", error);
        alert("Erro ao deletar o robô.");
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const estacaoMap = estacoes.reduce((map, estacao) => {
    map[estacao.robotStationId] = estacao.name;
    return map;
  }, {});

  return (
    <div className={styles.container}>
      {navigation.map((nav) => (
        <Link key={nav.name} to={nav.componente}>
          <button className={styles.create}>{nav.name}</button>
        </Link>
      ))}
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Modelo</th>
            <th scope="col">Criado</th>
            <th scope="col">Estação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {robos.map((rob) => (
            <tr key={rob.robotId}>
              <td>{rob.robotId}</td>
              <td>{rob.name}</td>
              <td>{rob.model}</td>
              <td>{rob.createdAt}</td>
              <td>{rob.robotStationId || "Desconhecida"}</td>
              <td>
                <Link to="/editrobot" state={{ robotId: rob.robotId }}>
                  <button style={{ background: "rgb(200,201, 200)" }}>
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(rob.robotId)}
                  style={{ background: "rgb(250, 10, 20)" }}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Robos;
