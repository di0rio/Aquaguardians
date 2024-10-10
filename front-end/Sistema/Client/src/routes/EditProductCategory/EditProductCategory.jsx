import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./EditProductCategory.module.css"; // Estilos específicos para este componente
import { useLocation, useNavigate } from "react-router-dom";

const EditProductCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productCategoryId } = location.state; // Obtém o ID da categoria da navegação

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]); // Estado para armazenar produtos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://apiaquaguardians.somee.com/api/ProductCategories/${productCategoryId}`
        );
        const category = response.data;
        setName(category.name);
        setDescription(category.description);
        setProducts(category.products || []); // Define os produtos ou um array vazio
      } catch (err) {
        console.error("Erro ao carregar categoria:", err);
        setError("Erro ao carregar categoria.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [productCategoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `https://apiaquaguardians.somee.com/api/ProductCategories/${productCategoryId}`,
        {
          productCategoryId, // ID da categoria
          name,
          description,
          products, // Passa a lista de produtos
        }
      );
      alert("Categoria atualizada com sucesso!");
      navigate("/produtos"); // Redireciona após a atualização
    } catch (err) {
      console.error("Erro ao atualizar categoria:", err);
      setError("Erro ao atualizar categoria.");
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h2>Editar Categoria de Produto</h2>
        <div className={styles.iconVoltar}>
          <ion-icon
            name="arrow-back-outline"
            type="button"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <hr />
      <form className={styles.Container} onSubmit={handleSubmit}>
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

        <button
          className={styles.ButtonSubmit}
          type="submit"
          disabled={loading}
        >
          {loading ? "Atualizando..." : "Atualizar Categoria"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default EditProductCategory;
