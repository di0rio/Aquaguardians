import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EditTransiction.module.css"; // Estilos para o componente
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";

const EditTransiction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transactionId } = location.state || {};

  const [transactionData, setTransactionData] = useState({
    transactionId: transactionId, // Adicione o transactionId aqui
    transactionDate: "",
    amount: 0,
    type: "",
    playerId: "",
    paymentMethodId: "",
  });
  const [players, setPlayers] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transResponse = await axios.get(
          `https://apiaquaguardians.somee.com/api/Transactions/${transactionId}`
        );
        const playersResponse = await axios.get(
          "https://apiaquaguardians.somee.com/api/Players"
        );
        const paymentMethodsResponse = await axios.get(
          "https://apiaquaguardians.somee.com/api/PaymentMethods"
        );

        // Preenche todos os campos necessários
        setTransactionData({
          transactionId: transResponse.data.transactionId,
          transactionDate: transResponse.data.transactionDate.split("T")[0], // Formata a data
          amount: transResponse.data.amount,
          type: transResponse.data.type,
          playerId: transResponse.data.playerId,
          paymentMethodId: transResponse.data.paymentMethodId,
        });
        setPlayers(playersResponse.data);
        setPaymentMethods(paymentMethodsResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError("Erro ao carregar dados da transação.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transactionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `https://apiaquaguardians.somee.com/api/Transactions/${transactionId}`,
        transactionData
      );
      alert("Transação atualizada com sucesso!");
      navigate("/transiction"); // Redireciona de volta para a lista de transações
    } catch (err) {
      console.error("Erro ao atualizar transação:", err);
      setError("Erro ao atualizar transação.");
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2> Editar Transação </h2>
        <div className={styles.iconVoltar}>
          <ion-icon
            name="arrow-back-outline"
            type="button"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <hr />
      <div className={styles.container}>
        <input
          type="date"
          name="transactionDate"
          value={transactionData.transactionDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          value={transactionData.amount}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          type="text"
          name="type"
          value={transactionData.type}
          onChange={handleChange}
          required
        />
        <select
          name="playerId"
          value={transactionData.playerId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um jogador</option>
          {players.map((player) => (
            <option key={player.playerId} value={player.playerId}>
              {player.nickname}
            </option>
          ))}
        </select>
        <select
          name="paymentMethodId"
          value={transactionData.paymentMethodId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um método de pagamento</option>
          {paymentMethods.map((method) => (
            <option key={method.paymentMethodId} value={method.paymentMethodId}>
              {method.name}
            </option>
          ))}
        </select>
        <ButtonSubmit text="Editar Transação" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Transação"}
        </ButtonSubmit>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </form>
  );
};

export default EditTransiction;
