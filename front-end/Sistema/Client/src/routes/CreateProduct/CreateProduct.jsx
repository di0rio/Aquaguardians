import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateProduct.module.css"; // Estilos específicos para este componente

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [productCategoryId, setProductCategoryId] = useState("");
  const [categories, setCategories] = useState([]); // Estado para categorias
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar categorias ao montar o componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://aquaguardians.somee.com/api/ProductCategories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
        setError("Erro ao carregar categorias.");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("https://aquaguardians.somee.com/api/Products", {
        name,
        description,
        price,
        stockQuantity,
        productCategoryId,
      });
      alert("Produto criado com sucesso!");
      setName("");
      setDescription("");
      setPrice(0);
      setStockQuantity(0);
      setProductCategoryId("");
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      setError("Erro ao criar produto.");
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
        <h2> Criar Produto </h2>
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
        <div className={styles.Label}>
          <input
            placeholder="PREÇO"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            min="0"
          />
        </div>
        <div className={styles.Label}>
          <input
            placeholder="QNTD EM ESTOQUE"
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(parseInt(e.target.value))}
            required
            min="0"
          />
        </div>
        <div className={styles.Label}>
          <select
            placeholder="SELECIONAR CATEGORIA"
            value={productCategoryId}
            onChange={(e) => setProductCategoryId(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option
                key={category.productCategoryId}
                value={category.productCategoryId}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className={styles.ButtonSubmit}
          type="submit"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Produto"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateProduct;
