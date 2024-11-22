import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateProductCategory.module.css"; // Estilos específicos para este componente

const CreateProductCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "https://aquaguardians.somee.com/api/ProductCategories",
        {
          name,
          description,
        }
      );
      alert("Categoria criada com sucesso!");
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Erro ao criar categoria:", err);
      setError("Erro ao criar categoria.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h2> Criar Categoria </h2>
        <div className={styles.iconVoltar}>
          <ion-icon
            name="arrow-back-outline"
            type="button"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <hr />
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.Label}>
          <input
            placeholder="NOME"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.Label}>
          <input
            placeholder="DESCRIÇÃO"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          className={styles.ButtonSubmit}
          type="submit"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Categoria"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateProductCategory;
