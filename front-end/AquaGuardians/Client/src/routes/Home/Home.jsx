import MuiButton from "../../components/Button/Button";
import styles from "./Home.module.css";
import Imgrobo from "./../../assets/Imgrobo.svg";
import Coins from "./../../assets/Coins.svg";
import Planet from "./../../assets/Planet.svg";
import Plataformas from "./../../assets/Plataformas.svg";
import Skins from "./../../assets/Skins.svg";
import robos from "./../../assets/robos.svg";
import { Link } from "react-router-dom";
import { useState } from "react";


const navigation = [{ component: "registro", name: "Registro" }];

export const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div className={styles.Home}>
      <div className={styles.Jogue}>
        <Link to={"/registro"}>
        <button className={styles.Link}>JOGUE AGORA</button>
        </Link>
      </div>
      <div className={styles.Sessoes}>
        <div className={styles.Box}>
          <div className={styles.Cont}>
            <div className={styles.Titulos}>
              <h4>O ROBÔ AQUÁTICO</h4>
              <h2>PURIFY</h2>
            </div>
            <div className={styles.textos}>
              <p>Movido a energia sustentável!</p>
              <p>Projetado para coleta de lixo na água.</p>
              <p>Tecnologia a serviço da natureza.</p>
              <p>Controle um Pufiry de qualquer lugar, a qualquer momento!</p>
            </div>
          </div>
          <div className={styles.Images}>
            <img src={Imgrobo} alt="" />
          </div>
        </div>

        <div className={styles.Box}>
          <div className={styles.Images}>
            <img src={Coins} alt="" />
          </div>
          <div className={styles.Cont}>
            <div className={styles.Titulos}>
              <h4>FACA UMA</h4>
              <h2>RENDA EXTRA</h2>
            </div>
            <div className={styles.textos}>
              <p>Quanto mais lixo você coleta, mais pontos você acumula.</p>
              <p>Seus pontos podem ser trocados por recompensas ou dinheiro!</p>
              <p>Sua jogada, seu lucro.</p>
            </div>
            <Link to={"/registro"}>
              <button className={styles.Link}>GANHE DINHEIRO SE DIVERTINDO!</button>
            </Link>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#160B28",
          }}
          className={styles.Box}
        >
          <div className={styles.Cont}>
            <div className={styles.Titulos}>
              <h4>ESCOLHA SEU</h4>
              <h2>CAMPO DE BATALHA</h2>
            </div>
            <img
              className={styles.Images}
              style={{ zIndex: "1", width: "100% " }}
              src={Planet}
              alt=""
            />
          </div>
        </div>

        <div className={styles.Box}>
          <div className={styles.Cont}>
            <div className={styles.Titulos}>
              <h4>PERSONALIZE</h4>
              <h2>SEU GUARDIAN</h2>
              <div className={styles.Images}>
                <img style={{ width: "400px" }} src={Imgrobo} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.Images}>
            <img style={{ width: "400px" }} src={Skins} alt="" />
          </div>
        </div>

        <div className={styles.Box}>
          <div className={styles.Cont}>
            <div className={styles.Images}>
              <img style={{ width: "420px" }} src={robos} alt="" />
            </div>
            <div className={styles.Titulos}>
              <h4>JOGUE COM OS </h4>
              <h2>AMIGOS</h2>
            </div>
            <Link to={"/registro"}>
              <button className={styles.Link}>JOGUE AGORA!</button>
            </Link>
          </div>
        </div>
        
        <div className={styles.Box}>
          <div className={styles.Cont}>
            <div className={styles.Titulos}>
              <div
                style={{
                  margin: "50px",
                  maxWidth: "800px",
                  minWidth: "300px",
                  height: "5px",
                  background: "#A1FFE0",
                }}
              ></div>
              <h2>PLATAFORMAS</h2>
              <h4>DISPONÍVEIS</h4>
            </div>
            <img className={styles.celulares} src={Plataformas} alt="" />
          </div>
        </div>

        <div
          style={{ height: "600px", background: "rgba(50, 88, 161, 0.9)" }}
          className={styles.Box}
        >
          <div className={styles.Cont}>
            <div className={styles.Titulos}>
              <h2 style={{ color: "#A1FFE0" }}>AQUAGUARDIANS</h2>
              <h4 style={{ color: "white" }}>FACA PARTE DESSA MUDANCA!</h4>
            </div>
            <Link to={"/registro"}>
            {/* <MuiButton
                sx={{
                  bgcolor: "#A1FFE0",
                  minWidth: 300,
                  minHeight: 60,
                  borderRadius: 5,
                  color: "#082255",
                  fontWeight: 600,
                  fontSize: 25,
                  marginTop: 15,
                  cursor: "pointer",
                }}
              >
                COMECE AGORA
              </MuiButton> */}
            <button className={styles.Link}>COMEÇE AGORA</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
