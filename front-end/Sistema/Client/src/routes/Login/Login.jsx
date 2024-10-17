import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useAuth } from "../../Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginAsAdmin, loginAsUser, logout } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const correctEmail = "adm@gmail.com";
    const correctPassword = "admin";

    if (email === correctEmail && password === correctPassword) {
      // Autentica como admin
      loginAsAdmin(email);
      navigate("/users"); // Caminho absoluto
    } else {
      logout(); // Autentica como usuário comum
      setError("Email ou senha incorretos");
    }
  };

  return (
    <div className={styles.Page}>
      <div className={styles.Container}>
        <div className={styles.Conteudo}>
          <div className={styles.Title}>
            <h2>LOGIN</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className={styles.Inputs}>
              <div className={styles.Email}>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.Password}>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.Duvida}>
              <a href="#">Esqueceu a senha?</a>
            </div>
            <div className={styles.Btn}>
              <button type="submit" className={styles.divBtn}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
