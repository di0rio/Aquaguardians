import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Produtos.module.css"; // Altere o nome do módulo de CSS
import { Link } from "react-router-dom";

const navigation = [
  { componente: "/createproductcategory", name: "Criar Categoria" },
  { componente: "/createproduct", name: "Criar Produto" }
];

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://apiaquaguardians.somee.com/api/ProductCategories");
        console.log("Categorias:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        setError("Erro ao carregar categorias.");
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://apiaquaguardians.somee.com/api/Products");
        console.log("Produtos:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setError("Erro ao carregar produtos.");
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta categoria?")) {
      try {
        await axios.delete(`https://apiaquaguardians.somee.com/api/ProductCategories/${id}`);
        setCategories(categories.filter((category) => category.productCategoryId !== id));
      } catch (error) {
        console.error("Erro ao deletar a categoria:", error);
        alert("Erro ao deletar a categoria.");
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cont}>
        {navigation.map((nav) => (
          <Link key={nav.name} to={nav.componente}>
            <button className={styles.button}>{nav.name}</button>
          </Link>
        ))}
      </div>
      <h2>Categorias De Produtos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.productCategoryId}>
              <td>{category.productCategoryId}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Link to="/editproductcategory" state={{ productCategoryId: category.productCategoryId }}>
                  <button className={styles.Btn} style={{ background: "rgb(200,201, 200)" }}>
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                <button
                  className={styles.Btn}
                  onClick={() => handleDelete(category.productCategoryId)}
                  style={{ background: "rgb(250, 10, 20)" }}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Produtos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Preço</th>
            <th scope="col">Quantidade em Estoque</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>R${product.price}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <Link to="/editproduct" state={{ productId: product.productId }}>
                  <button className={styles.Btn} style={{ background: "rgb(200,201, 200)" }}>
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                <button className={styles.Btn} style={{ background: "rgb(250, 10, 20)" }}>
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategories;
