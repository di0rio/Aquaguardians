import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EditEmpresa.module.css"; // Estilos específicos para este componente

const EditEmpresa = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { companyId } = location.state; // Obtém o ID da empresa da navegação

  const [empresa, setEmpresa] = useState({
    name: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get(
          `https://apiaquaguardians.somee.com/api/Companies/${companyId}`
        );
        setEmpresa(response.data);
      } catch (err) {
        console.error("Erro ao carregar dados da empresa:", err);
        setError("Erro ao carregar dados da empresa.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresa();
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `https://apiaquaguardians.somee.com/api/Companies/${companyId}`,
        empresa
      );
      alert("Empresa atualizada com sucesso!");
      navigate("/empresas"); // Redireciona para a lista de empresas
    } catch (err) {
      console.error("Erro ao atualizar a empresa:", err);
      setError("Erro ao atualizar a empresa.");
    } finally {
      setLoading(false);
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
      <h1>Editar Empresa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={empresa.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nome para Contato:</label>
          <input
            type="text"
            name="contactName"
            value={empresa.contactName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email para Contato:</label>
          <input
            type="email"
            name="contactEmail"
            value={empresa.contactEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefone para Contato:</label>
          <input
            type="tel"
            name="contactPhone"
            value={empresa.contactPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            name="address"
            value={empresa.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Atualizando..." : "Salvar Alterações"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default EditEmpresa;