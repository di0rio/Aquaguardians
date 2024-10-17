import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Funcionarios.module.css";
import { Link } from "react-router-dom";

const navigation = [{ componente: "/createfuncionario", name: "Criar" }];

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState(""); // Texto de pesquisa

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/Employes"
        );
        setFuncionarios(response.data);
      } catch (error) {
        setError("Erro ao carregar dados dos funcionários.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este funcionário?")) {
      try {
        await axios.delete(
          `https://apiaquaguardians.somee.com/api/Employes/${id}`
        );
        setFuncionarios(
          funcionarios.filter((funcionario) => funcionario.employeeId !== id)
        );
      } catch (error) {
        console.error("Erro ao deletar o funcionário:", error);
        alert("Erro ao deletar o funcionário.");
      }
    }
  };

  const openModal = (funcionario) => {
    setSelectedFuncionario(funcionario);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFuncionario(null);
  };

  // Função para filtrar funcionários com base na entrada de pesquisa
  const filteredFuncionarios = funcionarios.filter((funcionario) => {
    const searchValue = search.toLowerCase();
    
    // Permite pesquisa de ID usando números e letras
    const idMatches = funcionario.employeeId.toString().toLowerCase().includes(searchValue);

    // Permite pesquisa de nome apenas usando letras
    const nameMatches = funcionario.name.toLowerCase().includes(searchValue);

    // Retorna true se corresponder ao ID (números e letras) ou ao nome (apenas letras)
    return idMatches || nameMatches;
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
          <Link to="/funcionarios/create">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Departamento</th>
            <th scope="col">Cargo</th>
            <th scope="col">Salário</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuncionarios.map((funcionario) => (
            <tr key={funcionario.employeeId}>
              <td>{funcionario.employeeId}</td>
              <td>{funcionario.name}</td>
              <td>{funcionario.department}</td>
              <td>{funcionario.position}</td>
              <td>{funcionario.salary}</td>
              <td>
                <button
                  onClick={() => openModal(funcionario)}
                  className={styles.button2}
                >
                  Ver Detalhes
                </button>
                <Link
                  to="/funcionarios/edit/:id"
                  state={{ employeeId: funcionario.employeeId }}
                >
                  <button
                    className={styles.Btn}
                    style={{ background: "rgb(200,201, 200)" }}
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                <button
                  className={styles.Btn}
                  onClick={() => handleDelete(funcionario.employeeId)}
                  style={{ background: "rgb(250, 10, 20)" }}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedFuncionario && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Detalhes do Funcionário</h2>
            <p>
              <strong>ID:</strong> {selectedFuncionario.employeeId}
            </p>
            <p>
              <strong>Nome:</strong> {selectedFuncionario.name}
            </p>
            <p>
              <strong>Departamento:</strong> {selectedFuncionario.department}
            </p>
            <p>
              <strong>Cargo:</strong> {selectedFuncionario.position}
            </p>
            <p>
              <strong>Email:</strong> {selectedFuncionario.email}
            </p>
            <p>
              <strong>Telefone:</strong> {selectedFuncionario.phoneNumber}
            </p>
            <p>
              <strong>Endereço:</strong> {selectedFuncionario.adress}
            </p>
            <p>
              <strong>Data de Nascimento:</strong> {selectedFuncionario.dateOfBirth}
            </p>
            <p>
              <strong>Data de Admição:</strong> {selectedFuncionario.hireDate}
            </p>
            <p>
              <strong>Salário:</strong> {selectedFuncionario.salary}
            </p>
            <button onClick={closeModal} className={styles.closeButton}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funcionarios;
