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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await axios.get(
          "https://aquaguardians.somee.com/api/RobotStations"
        );
        console.log("Estações:", response.data);
        setEstacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar estações:", error);
        setError("Erro ao carregar estações.");
      }
    };

    const fetchRobos = async () => {
      try {
        const response = await axios.get(
          "https://aquaguardians.somee.com/api/Robots"
        );
        console.log("Robôs:", response.data);
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
        await axios.delete(`https://aquaguardians.somee.com/api/Robots/${id}`);
        setRobos(robos.filter((rob) => rob.robotId !== id));
      } catch (error) {
        console.error("Erro ao deletar o robô:", error);
        alert("Erro ao deletar o robô.");
      }
    }
  };

  const filteredRobos = robos.filter((rob) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      rob.robotId.toLowerCase().includes(searchLower) || // Busca por ID
      rob.name.toLowerCase().includes(searchLower) || // Busca por Nome
      (rob.status && rob.status.toLowerCase().includes(searchLower)) // Busca por Status
    );
  });

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
      <div className={styles.cont}>
        {navigation.map((nav) => (
          <Link to="/robos/create">
            <button className={styles.button}>Criar</button>
          </Link>
        ))}
        <div className={styles.pesquisa}>
          <div className={styles.group}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              className={styles.input}
              type="search"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

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
          {filteredRobos.map((rob) => (
            <tr key={rob.robotId}>
              <td>{rob.robotId}</td>
              <td>{rob.name}</td>
              <td>{rob.model}</td>
              <td>{rob.createdAt}</td>
              <td>{estacaoMap[rob.robotStationId] || "Desconhecida"}</td>
              <td>
                <Link to="/robos/edit/:id" state={{ robotId: rob.robotId }}>
                  <button
                    className={styles.Btn}
                    style={{ background: "rgb(200,201, 200)" }}
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>

                <button
                  className={styles.Btn}
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
