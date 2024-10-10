import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CreateTransiction.module.css"; // Estilos para o componente

const CreateTransiction = () => {
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
        const playersResponse = await axios.get("https://apiaquaguardians.somee.com/api/Players");
        const paymentMethodsResponse = await axios.get("https://apiaquaguardians.somee.com/api/PaymentMethods");
        
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
      await axios.post("https://apiaquaguardians.somee.com/api/Transactions", payload);
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

  return (
    <div className={styles.container}>
      <h1>Criar Transação</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data da Transação:</label>
          <input
            type="date"
            name="transactionDate"
            value={transactionData.transactionDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Tipo:</label>
          <input
            type="text"
            name="type"
            value={transactionData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Jogador:</label>
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
        </div>
        <div>
          <label>Método de Pagamento:</label>
          <select
            name="paymentMethodId"
            value={transactionData.paymentMethodId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um método de pagamento</option>
            {paymentMethods.map((method) => (
              <option key={method.paymentMethodId} value={method.paymentMethodId}>
                {method.name} {/* Nome do método de pagamento visível ao usuário */}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Criar Transação"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateTransiction;
