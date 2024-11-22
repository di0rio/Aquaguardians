import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EditFuncionario.module.css";
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";

const EditFuncionario = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    employeeId: "", // ID do funcionário
    department: "",
    position: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    hireDate: "",
    salary: "",
  });

  useEffect(() => {
    // Verifica se o ID do funcionário está disponível
    if (!location.state || !location.state.employeeId) {
      console.error("EmployeeId não está disponível.");
      alert("Funcionário não encontrado. Redirecionando...");
      navigate(-1);
      return;
    }

    const fetchFuncionario = async () => {
      try {
        const response = await axios.get(
          `https://aquaguardians.somee.com/api/Employes/${location.state.employeeId}`
        );
        console.log("Dados do funcionário:", response.data);
        setFormData({
          employeeId: location.state.employeeId,
          department: response.data.department || "",
          position: response.data.position || "",
          name: response.data.name || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          address: response.data.address || "",
          dateOfBirth: response.data.dateOfBirth || "",
          hireDate: response.data.hireDate || "",
          salary: response.data.salary || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados do funcionário:", error);
        alert("Erro ao carregar os dados do funcionário.");
      }
    };

    fetchFuncionario();
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://aquaguardians.somee.com/api/Employes/${formData.employeeId}`,
        formData
      );

      if (response.status === 200 || response.status === 204) {
        alert("Funcionário editado com sucesso!");
        navigate(-1);
      } else {
        alert(
          "Erro ao editar funcionário. Verifique os dados e tente novamente."
        );
      }
    } catch (error) {
      console.error(
        "Erro ao editar funcionário:",
        error.response ? error.response.data : error
      );
      alert("Erro ao editar funcionário. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h2>Editar Funcionário</h2>
        <div className={styles.iconVoltar}>
          <ion-icon
            name="arrow-back-outline"
            type="button"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <hr />
      <div>
        <form className={styles.Container} onSubmit={handleEdit}>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Departamento"
            required
          />
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Cargo"
            required
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Telefone"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Endereço"
            required
          />
          <input
            type="hidden"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            readOnly // Apenas visualização
          />
          <input
            type="hidden"
            name="hireDate"
            value={formData.hireDate}
            readOnly // Apenas visualização
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salário"
            required
          />
          <ButtonSubmit text="Editar" />
        </form>
      </div>
    </div>
  );
};

export default EditFuncionario;
