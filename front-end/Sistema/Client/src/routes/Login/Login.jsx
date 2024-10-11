import styles from "./Login.module.css";
import { useState } from "react"; // Importa useState para gerenciar o estado
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate para redirecionar
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const navigation = [{ componente: "/users", name: "Login" }];

const Login = () => {
  const [email, setEmail] = useState(""); // Estado para o e-mail
  const [password, setPassword] = useState(""); // Estado para a senha
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleLogin = (e) => {
    e.preventDefault(); // Impede o envio do formulário

    // Verificação de e-mail e senha
    const correctEmail = "adm@gmail.com";
    const correctPassword = "Adm123@!#Ç";

    if (email === correctEmail && password === correctPassword) {
      navigate("/users"); // Redireciona para a próxima página
    } else {  alert("Email ou senha incorretos");
      setError(""); // Define mensagem de erro
    }
  };

  return (
    <div className={styles.Page}>
      <div className={styles.Container}>
        <div className={styles.Conteudo}>
          <div className={styles.Title}>
            <h2>LOGIN</h2>
          </div>
          <form onSubmit={handleLogin}> {/* Formulário para capturar o login */}
            <div className={styles.Inputs}>
              <div className={styles.Email}>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail
                  required
                />
              </div>
              <div className={styles.Password}>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
                  required
                />
              </div>
            </div>
            {error && <div className={styles.error}>{error}</div>} {/* Exibe mensagem de erro, se houver */}
            <div className={styles.Duvida}>
              <a href="#">Esqueceu a senha?</a>
            </div>
            <div className={styles.Btn}>
              <button type="submit" className={styles.divBtn}>Login</button> {/* Botão de envio */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
