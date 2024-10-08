import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Produtos.module.css"; // Altere o nome do módulo de CSS
import { Link } from "react-router-dom";

const navigation = [
  { componente: "/createproductcategory", name: "Criar Categoria" },
];

const navigation2 = [{ componente: "/createproduct", name: "Criar Produto" }];

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/ProductCategories"
        );
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
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/Products"
        );
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
        await axios.delete(
          `https://apiaquaguardians.somee.com/api/ProductCategories/${id}`
        );
        setCategories(
          categories.filter((category) => category.productCategoryId !== id)
        );
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
        <div className={styles.pesquisa}>
          <div className={styles.radioInputs}>
            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>ID</span>
            </label>

            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>NOME</span>
            </label>

            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>STATUS</span>
            </label>
          </div>
          <div className={styles.group}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              className={styles.input}
              type="search"
              placeholder="Search"
            />
          </div>
        </div>
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
                <Link
                  to="/editproductcategory"
                  state={{ productCategoryId: category.productCategoryId }}
                >
                  <button
                    className={styles.Btn}
                    style={{ background: "rgb(200,201, 200)" }}
                  >
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

      <div className={styles.cont}>
        {navigation2.map((nav) => (
          <Link key={nav.name} to={nav.componente}>
            <button className={styles.button}>{nav.name}</button>
          </Link>
        ))}
        <div className={styles.pesquisa}>
          <div className={styles.radioInputs}>
            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>ID</span>
            </label>

            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>NOME</span>
            </label>

            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>STATUS</span>
            </label>
          </div>
          <div className={styles.group}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              className={styles.input}
              type="search"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
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
                <Link
                  to="/editproduct"
                  state={{ productId: product.productId }}
                >
                  <button
                    className={styles.Btn}
                    style={{ background: "rgb(200,201, 200)" }}
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>
                <button
                  className={styles.Btn}
                  style={{ background: "rgb(250, 10, 20)" }}
                >
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
