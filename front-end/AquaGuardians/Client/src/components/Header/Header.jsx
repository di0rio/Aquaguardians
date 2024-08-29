import { Link } from "react-router-dom"
import styles from "./Header.module.css"

const navigation = [
    { component: "/", name: "Home" },
    { component: "/contact", name: "Contato" }
]

const Header = () => {
    return (
        <div className={styles.container}>
            <Link to={"/"}><p>PÁGINA INICIAL</p></Link>
            <Link to={"/contato"}><p>Contato</p></Link>
        </div>
    )
}

export default Header