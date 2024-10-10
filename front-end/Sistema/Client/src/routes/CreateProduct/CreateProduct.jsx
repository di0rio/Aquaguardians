import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./CreateProduct.module.css"; // Estilos específicos para este componente

const CreateProduct = () => {
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
        const response = await axios.get("https://apiaquaguardians.somee.com/api/ProductCategories");
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
      await axios.post("https://apiaquaguardians.somee.com/api/Products", {
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

  return (
    <div className={styles.container}>
      <h1>Criar Produto</h1>
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
        <div>
          <label>Preço:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            min="0"
          />
        </div>
        <div>
          <label>Quantidade em Estoque:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(parseInt(e.target.value))}
            required
            min="0"
          />
        </div>
        <div>
          <label>Selecionar Categoria:</label>
          <select
            value={productCategoryId}
            onChange={(e) => setProductCategoryId(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.productCategoryId} value={category.productCategoryId}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Produto"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateProduct;
