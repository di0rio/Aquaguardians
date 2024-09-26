import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Postos.module.css";

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
        console.log(response.data); // Verifique a estrutura dos dados
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

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Localização</th>
            <th scope="col">Status</th>
            <th scope="col">Capacidade</th>
          </tr>
        </thead>
        <tbody>
          {postos.map((posto) => (
            <tr key={posto.robotStationId}>
              {" "}
              {/* Verifique se RobotStationId é único */}
              <td>{posto.robotStationId}</td>
              <td>{posto.name}</td>
              <td>{posto.location}</td>
              <td>{posto.status}</td>
              <td>{posto.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Postos;
