import axios from "axios";
import React, { useState } from "react";
import styles from "./CreateProductCategory.module.css"; // Estilos específicos para este componente

const CreateProductCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("https://apiaquaguardians.somee.com/api/ProductCategories", {
        name,
        description,
      });
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

  return (
    <div className={styles.container}>
      <h1>Criar Categoria de Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Categoria"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateProductCategory;
