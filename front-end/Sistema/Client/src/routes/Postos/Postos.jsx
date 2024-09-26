import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Postos.module.css";
import { Link } from "react-router-dom";

const navigation = [
  { componente: "/create", name: "Criar" },
  // { componente: "/edit", name: "Editar" },
];

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
              {" "}
              {/* Verifique se RobotStationId é único */}
              <td>{posto.robotStationId}</td>
              <td>{posto.name}</td>
              <td>{posto.location}</td>
              <td>{posto.status}</td>
              <td>{posto.capacity}</td>
              <td>
                <button style={{ background: "rgb(200, 201, 200)" }}>
                  <ion-icon name="create-outline"></ion-icon>
                </button>
                <button style={{ background: "rgb(250, 10, 20)" }}>
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
