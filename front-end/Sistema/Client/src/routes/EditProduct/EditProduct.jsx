import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditProduct.module.css"; // Certifique-se de ter um arquivo CSS apropriado

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const productId = location.state?.productId;

  const [product, setProduct] = useState({
    productId: "",
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    productCategoryId: "",
    orderItems: [], // Assumindo que este campo pode ser vazio inicialmente
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://apiaquaguardians.somee.com/api/Products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        setError("Erro ao carregar produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stockQuantity"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `https://apiaquaguardians.somee.com/api/Products/${productId}`,
        product
      );
      alert("Produto editado com sucesso!");
      navigate("/produtos"); // Redirecionar para a lista de produtos
    } catch (err) {
      console.error("Erro ao editar produto:", err);
      setError("Erro ao editar produto.");
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
        <h2>Editar Produto</h2>
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
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Quantidade em Estoque:</label>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>ID da Categoria do Produto:</label>
          <input
            type="text"
            name="productCategoryId"
            value={product.productCategoryId}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className={styles.ButtonSubmit}
          type="submit"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Produto"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default EditProduct;
