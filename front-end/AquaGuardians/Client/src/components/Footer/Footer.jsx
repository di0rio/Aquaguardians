import React from 'react'

import styles from "./Footer.module.css"


import MuiButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (


        <div className={styles.div}>
            <div className={styles.list1}>
                <ul className={styles.list}>
                    <h1>Info</h1>
                    <h3>Formatos</h3>
                    <h3>Compressão</h3>
                    <h3>Preços</h3>
                    <h3>Status</h3>
                    <h3>Politica</h3>
                </ul>
                <ul className={styles.list}>
                    <h1>Iniciando</h1>
                    <h3>Documentação</h3>
                    <h3>Uso</h3>
                    <h3>Elementos</h3>
                    <h3>Global</h3>
                </ul>

                <ul className={styles.list}>
                    <h1>Recursos</h1>
                    <h3>API</h3>
                    <h3>DNS</h3>
                    <h3>Acessibilidade</h3>
                    <h3>Loja</h3>
                    <h3>Visibilidade</h3>
                    <h3>Comunidade</h3>
                </ul>
            </div>
            <div className={styles.div2}>
                <ul className={styles.list2}>
                    <h1>Noticias</h1>
                    <h2>Receba atualizações semanalmente sobre nosso jogo, além de ficar por dentro de todas as novidades tecnológicas</h2>
                    <li>


                        <input type="text" placeholder="Email" />

                        <MuiButton color='success' sx={{ color: 'black', background: 'white', borderRadius: '10px', height: '5vh', }} variant="contained">Inscreva-se</MuiButton>

                    </li>
                    <div className={styles.icones}>

                        <li><InstagramIcon /> </li>
                        <li><GitHubIcon /> </li>
                        <li><FacebookIcon /> </li>
                        <li><LinkedInIcon /> </li>
                    </div>
                </ul>

            </div>



        </div>
    )
}

export default Footer