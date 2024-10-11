import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Postos.module.css";
import { Link } from "react-router-dom";

const navigation = [{ componente: "/createposto", name: "Criar" }];

const Postos = () => {
  const [postos, setPostos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPostos = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/RobotStations"
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
          `https://apiaquaguardians.somee.com/api/RobotStations/${id}`
        );
        setPostos(postos.filter((posto) => posto.robotStationId !== id));
      } catch (error) {
        console.error("Erro ao deletar o posto:", error);
        alert("Erro ao deletar o posto.");
      }
    }
  };

  const filteredPostos = postos.filter((posto) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      posto.robotStationId.toString().toLowerCase().includes(searchValue) ||
      posto.name.toLowerCase().includes(searchValue)
    );
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cont}>
        {navigation.map((nav) => (
          <Link key={nav.name} to={nav.componente}>
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
            <th scope="col">Localização</th>
            <th scope="col">Status</th>
            <th scope="col">Capacidade</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPostos.map((posto) => (
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
                  <button
                    style={{ background: "rgb(200,201, 200)" }}
                    className={styles.Btn}
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                
                <button
                  className={styles.Btn}
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
