import { useEffect, useState } from "react";
import styles from "./Empresas.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const navigation = [{ componente: "/createempresa", name: "Criar" }];
const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/Companies"
        );
        setEmpresas(response.data);
      } catch (error) {
        setError("Erro ao carregar dados das Empresas");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar essa empresa?")) {
      try {
        await axios.delete(
          `https://apiaquaguardians.somee.com/api/Companies/${id}`
        );
        setEmpresas(empresas.filter((empresa) => empresa.companyId !== id));
      } catch (error) {
        console.error("Erro ao deletar a empresa:", error);
        alert("Erro ao deletar a empresa.");
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
            <th scope="col">Nome para Contato</th>
            <th scope="col">Email para Contato</th>
            <th scope="col">Telefone para Contato</th>
            <th scope="col">Endereço</th>
            <th scope="col">Criado</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.companyId}>
              <td>{empresa.companyId}</td>
              <td>{empresa.name}</td>
              <td>{empresa.contactName}</td>
              <td>{empresa.contactEmail}</td>
              <td>{empresa.contactPhone}</td>
              <td>{empresa.address}</td>
              <td>{empresa.createdAt}</td>
              <td>
                <Link
                  to="/editempresa"
                  state={{ companyId: empresa.companyId }}
                >
                  <button style={{ background: "rgb(200,201, 200)" }}>
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(empresa.companyId)}
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

export default Empresas;
