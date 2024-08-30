// import styles from "./Footer.module.css"


// import MuiButton from '@mui/material/Button';


// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import GitHubIcon from '@mui/icons-material/GitHub';

// const Footer = () => {
//     return (


//         <div className={styles.div}>
//             <div className={styles.list1}>
//                 <ul className={styles.list}>
//                     <h1>Info</h1>
//                     <h3>Formatos</h3>
//                     <h3>Compressão</h3>
//                     <h3>Preços</h3>
//                     <h3>Status</h3>
//                     <h3>Politica</h3>
//                 </ul>
//                 <ul className={styles.list}>
//                     <h1>Iniciando</h1>
//                     <h3>Documentação</h3>
//                     <h3>Uso</h3>
//                     <h3>Elementos</h3>
//                     <h3>Global</h3>
//                 </ul>

//                 <ul className={styles.list}>
//                     <h1>Recursos</h1>
//                     <h3>API</h3>
//                     <h3>DNS</h3>
//                     <h3>Acessibilidade</h3>
//                     <h3>Loja</h3>
//                     <h3>Visibilidade</h3>
//                     <h3>Comunidade</h3>
//                 </ul>
//             </div>
//             <div className={styles.div2}>
//                 <ul className={styles.list2}>
//                     <h1>Noticias</h1>
//                     <h2>Receba atualizações semanalmente sobre nosso jogo, além de ficar por dentro de todas as novidades tecnológicas</h2>
//                     <li>


//                         <input type="text" placeholder="Email" />

//                         <MuiButton color='success' sx={{ color: 'black', background: 'white', borderRadius: '10px', height: '5vh', }} variant="contained">Inscreva-se</MuiButton>

//                     </li>
//                     <div className={styles.icones}>

//                         <li><InstagramIcon /> </li>
//                         <li><GitHubIcon /> </li>
//                         <li><FacebookIcon /> </li>
//                         <li><LinkedInIcon /> </li>
//                     </div>
//                 </ul>

//             </div>



//         </div>
//     )
// }

// export default Footer
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h3>Info</h3>
            <ul>
              <li>Formatos</li>
              <li>Compressão</li>
              <li>Preços</li>
              <li>Status</li>
              <li>Política</li>
            </ul>
          </div>
          <div className={styles.col}>
            <h3>Iniciando</h3>
            <ul>
              <li>Documentação</li>
              <li>Uso</li>
              <li>Elementos</li>
              <li>Global</li>
            </ul>
          </div>
          <div className={styles.col}>
            <h3>Recursos</h3>
            <ul>
              <li>API</li>
              <li>Acessibilidade</li>
              <li>Loja</li>
              <li>Global</li>
              <li>Visibilidade</li>
              <li>Comunidade</li>
              <li>Forms de Validação</li>
            </ul>
          </div>
          <div className={styles.col}>
            <h3>Notícias</h3>
            <p>
              Receba atualizações semanalmente sobre nosso jogo, além de ficar
              por dentro de todas as novidades tecnológicas.
            </p>
            <div className={styles.submeter}>
              <form className={styles.formulario}>
                <input
                  className={styles.email}
                  type="email"
                  placeholder="Seu email"
                />

                <button type="submit" className="enviar">
                  Inscreva-se
                </button>
              </form>
            </div>
            <div>
            <a  className={styles.ins}  href="https://www.instagram.com/">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a  className={styles.lin} href="https://www.linkedin.com/">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a  className={styles.git} href="https://github.com/">
              <ion-icon name="logo-github"></ion-icon>
            </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


