import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditEmpresa.module.css";
import { useEffect, useState } from "react";
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";

const EditEmpresa = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    createdAt: "",
  });

  useEffect(() => {
    if (!location.state || !location.state.companyId) {
      console.error("companyId não está disponível");
      alert("Empresa não encontrada. Redirecionando...");
      navigate(-1);
      return;
    }

    const fetchEmpresa = async () => {
      try {
        const response = await axios.get(
          `https://apiaquaguardians.somee.com/api/Companies/${locations.state.companyId}`
        );
        console.log("Dados do funcionário:", response.data);
        setFormData({
          companyId: location.state.companyId,
          name: response.data.name || "",
          contactName: response.data.contactName || "",
          contactEmail: response.data.contactEmail || "",
          contactPhone: response.data.name || "",
          address: response.data.address || "",
          createdAt: response.data.createdAt || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados da empresa", error);
      }
    };
    fetchEmpresa();
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try{
        const response = axios.put(
            `https://apiaquaguardians.somee.com/api/Companies/${formData.companyId}`,
        formData
        );

        if (response.status === 200 || response.status === 204){
            alert("Empresa editada com sucesso!");
            navigate(-1);
        } else {
            alert(
                "Erro ao editar empresa. Verifique os dados e tente novamente."
            );
        }
    } catch (error) {
        console.error(
            "Erro ao editar empresa:", error.response ? error.response.data : error
        );
        alert("Erro ao editar empresa. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleEdit} className={styles.form}>
      <div className={styles.header}>
        <h2> Editar Empresa </h2>
        <div className={styles.iconVoltar}>
          <ion-icon
            name="arrow-back-outline"
            type="button"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <hr />
      <div className={styles.container}>
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          value={formData.contactName}
          onChange={handleChange}
          placeholder="Nome para Contato"
          required
        />
        <input
          type="text"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="Email para Contato"
          required
        />
        <input
          type="text"
          value={formData.contactPhone}
          onChange={handleChange}
          placeholder="Telefone para Contato"
          required
        />
        <input
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Endereço"
          required
        />
        <input
          type="text"
          placeholder="Data de Cadastro"
          readOnly
        />
        <ButtonSubmit text="Editar" />
      </div>
    </form>
  )
};

export default EditEmpresa;
