import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Postos.module.css";
import { Link, useNavigate } from "react-router-dom";

const navigation = [{ componente: "/createposto", name: "Criar" }];
const Postos = () => {
  const [postos, setPostos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostos = async () => {
      try {
        const response = await axios.get(
          "http://apiaquaguardians.somee.com/api/RobotStations"
        );
        setPostos(response.data);
      } catch (error) {
        setError("Erro ao carregar dados dos postos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este posto?")) {
      try {
        await axios.delete(
          `http://apiaquaguardians.somee.com/api/RobotStations/${id}`
        );
        setPostos(postos.filter((posto) => posto.robotStationId !== id));
      } catch (error) {
        console.error("Erro ao deletar o posto:", error);
        alert("Erro ao deletar o posto.");
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            <th scope="col">Localização</th>
            <th scope="col">Status</th>
            <th scope="col">Capacidade</th>
            <th scope="col">Editar</th>
          </tr>
        </thead>
        <tbody>
          {postos.map((posto) => (
            <tr key={posto.robotStationId}>
              <td>{posto.robotStationId}</td>
              <td>{posto.name}</td>
              <td>{posto.location}</td>
              <td>{posto.status}</td>
              <td>{posto.capacity}</td>
              <td>
                <Link
                  to="/editposto"
                  state={{ RobotStationId: posto.robotStationId }}
                >
                  <button style={{ background: "rgb(200,201, 200)" }}>
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(posto.robotStationId)}
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

export default Postos;
