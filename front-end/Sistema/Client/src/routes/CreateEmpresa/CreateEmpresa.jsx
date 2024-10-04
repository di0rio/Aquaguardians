import { useNavigate } from "react-router-dom";
import styles from "./CreateEmpresa.module.css";
import { useState } from "react";
import axios from "axios";

const CreateEmpresa = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmai, setContactEmai] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://apiaquaguardians.somee.com/api/Companies",
        {
          name,
          contactName,
          contactEmai,
          contactPhone,
          address,
          createdAt,
        }
      );
      console.log("Empresa cadastrada:", response.data);
      //Limpar os campos após o envio
      setName("");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setAdsress("");
      setCreatedAt("");
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);
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
      <div>Inputs</div>
    </form>
  );
};

export default CreateEmpresa;
