import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CreateTransiction.module.css"; // Estilos para o componente
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";
import { useNavigate } from "react-router-dom";

const CreateTransiction = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState({
    transactionDate: "",
    amount: 0,
    type: "",
    playerId: "",
    paymentMethodId: "",
  });

  const [players, setPlayers] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayersAndPaymentMethods = async () => {
      try {
        const playersResponse = await axios.get(
          "https://apiaquaguardians.somee.com/api/Players"
        );
        const paymentMethodsResponse = await axios.get(
          "https://apiaquaguardians.somee.com/api/PaymentMethods"
        );

        setPlayers(playersResponse.data);
        setPaymentMethods(paymentMethodsResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError("Erro ao carregar jogadores ou métodos de pagamento.");
      }
    };

    fetchPlayersAndPaymentMethods();
  }, []);

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

    // Estruturando os dados conforme esperado pela API
    const payload = {
      transactionDate: transactionData.transactionDate,
      amount: transactionData.amount,
      type: transactionData.type,
      playerId: transactionData.playerId,
      paymentMethodId: transactionData.paymentMethodId,
    };

    try {
      await axios.post(
        "https://apiaquaguardians.somee.com/api/Transactions",
        payload
      );
      alert("Transação criada com sucesso!");
      // Resetando o formulário após a criação
      setTransactionData({
        transactionDate: "",
        amount: 0,
        type: "",
        playerId: "",
        paymentMethodId: "",
      });
    } catch (err) {
      console.error("Erro ao criar transação:", err);
      setError("Erro ao criar transação.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2> Registrar Transação </h2>
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
          placeholder="Valor"
        />
        <input
          type="text"
          name="type"
          value={transactionData.type}
          onChange={handleChange}
          required
          placeholder="Tipo"
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
              {player.nickname} {/* Nome do jogador visível ao usuário */}
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
              {method.name}{" "}
              {/* Nome do método de pagamento visível ao usuário */}
            </option>
          ))}
        </select>
        <ButtonSubmit disabled={loading} text="Registrar Transação">
          {loading ? "Salvando..." : "Criar Transação"}
        </ButtonSubmit>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </form>
  );
};

export default CreateTransiction;
