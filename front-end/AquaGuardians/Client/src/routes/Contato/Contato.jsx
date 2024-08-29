import styles from "./Contato.module.css"

export const Contato = () => {
    return (
        <form className={styles.form}>
            <p>CONTATE-NOS </p>
            <input placeholder="E-mail" type="text" />
            <input placeholder="Senha" type="text" />
            <input placeholder="Digite sua ideia!" type="text" />

            <button>ENVIAR</button>
        </form>
    )
}

export default Contato