import axios from "axios";
import { useState, useEffect } from "react";

import styles from "./Usuarios.module.css";

import { Link } from "react-router-dom";

const navigation = [{ componente: "/createrobot", name: "Criar" }];

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/Players"
        );
        console.log("Usuários:", response.data); // Verificando a estrutura
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        setError("Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este Usuário?")) {
      try {
        await axios.delete(
          `https://apiaquaguardians.somee.com/api/Players/${id}`
        );
        setUsuarios(users.filter((u) => u.playerId !== id));
      } catch (error) {
        console.error("Erro ao deletar o usuário:", error);
        alert("Erro ao deletar o usuário.");
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
      <div className={styles.cont}>
        {navigation.map((nav) => (
          <Link key={nav.name} to={nav.componente}>
            <button className={styles.button}>Create</button>
          </Link>
        ))}

        <div className={styles.pesquisa}>
          <div className={styles.radioInputs}>
            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>ID</span>
            </label>

            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>NOME</span>
            </label>

            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>STATUS</span>
            </label>
          </div>
          <div className={styles.group}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              className={styles.input}
              type="search"
              placeholder="Search"
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
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.playerId}>
              <td>{u.playerId}</td>
              <td>{u.nickname}</td>
              <td>{u.email}</td>
              <td>{u.createdAt}</td>
              <td>
                <Link to="/edituser" state={{ playerId: u.playerId }}>
                  <button style={{ background: "rgb(200,201, 200)" }}>
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(u.playerId)}
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

export default Usuarios;
