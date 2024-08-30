import Button from "../../components/Button/Button"
import styles from "./Home.module.css"
import Imgrobo from "./../../assets/Imgrobo.svg"
import Coins from "./../../assets/Coins.svg"
import Planet from "./../../assets/Planet.svg"
import Plataformas from "./../../assets/Plataformas.svg"
import Skins from "./../../assets/Skins.svg"
import robos from "./../../assets/robos.svg"
import Space from "./../../assets/Space.svg"
import { Link } from "react-router-dom"


const navigation = [
  { component: "registro", name: "Registro" },

]


export const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.Jogue}>
      <Link to={"/registro"}> <MuiButton sx={{
          bgcolor: '#F9FF3A',
          minWidth: 300,
          minHeight: 60,
          borderRadius: 5,
          color: '#082255',
          fontWeight: 600,
          fontSize: 25,
          marginBottom: 5,
          cursor: 'pointer'
        }} >Jogue Agora</MuiButton> </Link>
      </div>

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
          <div style={{ alignItems: 'end' }} className={styles.textos}>
            <p>Quanto mais lixo você coleta, mais pontos você acumula.</p>
            <p>Seus pontos podem ser trocados por recompensas ou dinheiro!</p>
            <p>Sua jogada, seu lucro.</p>
          </div>
          <Link to={"/registro"}><MuiButton sx={{
            bgcolor: '#A1FFE0',
            minWidth: 500,
            minHeight: 60,
            borderRadius: 5,
            color: '#082255',
            fontWeight: 600,
            fontSize: 20,
            marginTop: 10,
            cursor: 'pointer'
          }} >GANHE DINHEIRO SE DIVERTINDO!</MuiButton> </Link>
        </div>
      </div>

      <div style={{ backgroundColor: '#160B28', width: '100%', padding: '100px 0px' }} className={styles.Box}>
        <img style={{ position: 'absolute', maxWidth: '100%', zIndex: '0' }} src={Space} alt="" />
        <div className={styles.Cont}>
          <div className={styles.Titulos}>
            <h4>ESCOLHA SEU</h4>
            <h2>CAMPO DE BATALHA</h2>
          </div>
          <img style={{ zIndex: '1', width: '650px' }} src={Planet} alt="" />
        </div>
      </div>

      <div className={styles.Box}>
        <div className={styles.Cont}>
          <div className={styles.Titulos}>
            <h4>PERSONALIZE</h4>
            <h2>SEU GUARDIAN</h2>
            <div className={styles.Images}>
              <img style={{ width: '400px' }} src={Imgrobo} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.Images}>
          <img style={{ width: '400px' }} src={Skins} alt="" />
        </div>
      </div>

      <div className={styles.Box}>
        <div className={styles.Images}>
          <img src={robos} alt="" />
        </div>
        <div className={styles.Cont}>
          <div style={{ marginBottom: '223px' }} className={styles.Titulos}>
            <h4>JOGUE COM OS </h4>
            <h2>AMIGOS</h2>
          </div>

          <Link to={"/registro"}><MuiButton sx={{
            bgcolor: '#A1FFE0',
            minWidth: 300,
            minHeight: 60,
            borderRadius: 5,
            color: '#082255',
            fontWeight: 600,
            fontSize: 20,
            cursor: 'pointer'
          }} >JOGUE AGORA!</MuiButton></Link>
        </div>
      </div>


      <div className={styles.Box}>
        <div className={styles.Cont}>
          <div className={styles.Titulos}>
            <div style={{ margin: '50px', width: '1000px', height: '5px', background: '#A1FFE0' }}></div>
            <h2>PLATAFORMAS</h2>
            <h4>DISPONÍVEIS</h4>
          </div>
          <img src={Plataformas} alt="" />
        </div>
      </div>

      <div style={{ height: '600px', background: 'rgba(50, 88, 161, 0.9)' }} className={styles.Box}>
        <div className={styles.Cont}>
          <div className={styles.Titulos}>
            <h2 style={{ color: '#A1FFE0' }}>AQUAGUARDIANS</h2>
            <h4 style={{ color: "white" }}>FACA PARTE DESSA MUDANCA!</h4>
          </div>
          <Link to={"/registro"}> <MuiButton sx={{
            bgcolor: '#A1FFE0',
            minWidth: 300,
            minHeight: 60,
            borderRadius: 5,
            color: '#082255',
            fontWeight: 600,
            fontSize: 25,
            marginTop: 15,
            cursor: 'pointer'
          }} >COMECE AGORA</MuiButton></Link>
        </div>
      </div>

    </div>
  )
}

export default Home