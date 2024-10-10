import { useNavigate } from "react-router-dom";
import styles from "./CreateEmpresa.module.css";
import { useState } from "react";
import axios from "axios";
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";

const CreateEmpresa = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();

    try {
      const response = await axios.post(
        "https://apiaquaguardians.somee.com/api/Companies",
        {
          name,
          contactName,
          contactEmail,
          contactPhone,
          address,
          createdAt: currentDate,
        }
      );
      console.log("Empresa cadastrada:", response.data);
      //Limpar os campos após o envio
      setName("");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setAddress("");
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);
      console.error("Error status:", error.response?.status); // Check status code for clues
      console.error("Error data:", error.response?.data); // May contain error messages
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2> Cadstrar Empresa </h2>
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Nome para Contato"
          required
        />
        <input
          type="text"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Email para Contato"
          required
        />
        <input
          type="text"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="Telefone para Contato"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Endereço"
          required
        />
        <input
          type="text"
          value={new Date().toISOString()}
          placeholder="Data de Cadastro"
          readOnly
        />
        <ButtonSubmit text="Adicionar Item" />
      </div>
    </form>
  );
};
export default CreateEmpresa;
