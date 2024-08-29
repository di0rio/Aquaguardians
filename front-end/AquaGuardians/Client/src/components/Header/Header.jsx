import { Link } from "react-router-dom"
import styles from "./Header.module.css"

const navigation = [
    { component: "/", name: "Home" },
    { component: "/contact", name: "Contato" }
]

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.agua}>

                <h2>AQUAGUARDIANS</h2>
            </div>
            <div className={styles.rotas}>

                <Link to={"/"}><p><u>PÁGINA INICIAL</u></p></Link>
                <Link to={"/contato"}><p><u>NOTAS DE ATUALIZAÇÃO</u></p></Link>
                <Link to={"/como"}><p><u>COMO JOGAR?</u></p></Link>

            </div>
        </div>
    )
}

export default Header