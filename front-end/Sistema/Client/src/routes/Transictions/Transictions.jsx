import { useEffect, useState } from "react";
import styles from "./Transictions.module.css"; // Estilos específicos para este componente
import axios from "axios";
import { Link } from "react-router-dom";

const Transacoes = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/Transactions"
        );
        setTransacoes(response.data);
      } catch (error) {
        setError("Erro ao carregar dados das Transações");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(
          "https://apiaquaguardians.somee.com/api/PaymentMethods"
        );
        const methods = {};
        response.data.forEach(method => {
          methods[method.paymentMethodId] = method.name; // Armazena o ID e o nome do método
        });
        setPaymentMethods(methods);
      } catch (error) {
        console.error("Erro ao carregar métodos de pagamento:", error);
      }
    };

    fetchTransacoes();
    fetchPaymentMethods();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar essa transação?")) {
      try {
        await axios.delete(
          `https://apiaquaguardians.somee.com/api/Transactions/${id}`
        );
        setTransacoes(transacoes.filter((transacao) => transacao.transactionId !== id));
      } catch (error) {
        console.error("Erro ao deletar a transação:", error);
        alert("Erro ao deletar a transação.");
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
        <Link to="/createtransiction">
          <button className={styles.button}>Criar Transação</button>
        </Link>

        <div className={styles.pesquisa}>
          <div className={styles.radioInputs}>
            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>ID</span>
            </label>

            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>DATA</span>
            </label>

            <label className={styles.radio}>
              <input type="radio" name="radio" />
              <span className={styles.name}>VALOR</span>
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
              placeholder="Pesquisar"
            />
          </div>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Data</th>
            <th scope="col">Valor</th>
            <th scope="col">Tipo</th>
            <th scope="col">Método de Pagamento</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao) => (
            <tr key={transacao.transactionId}>
              <td>{transacao.transactionId}</td>
              <td>{new Date(transacao.transactionDate).toLocaleDateString()}</td>
              <td>{transacao.amount}</td>
              <td>{transacao.type}</td>
              <td>{paymentMethods[transacao.paymentMethodId] || 'Desconhecido'}</td> {/* Exibe o nome do método de pagamento */}
              <td>
                <Link
                  to="/edittransiction"
                  state={{ transactionId: transacao.transactionId }}
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
                  onClick={() => handleDelete(transacao.transactionId)}
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

export default Transacoes;
