import styles from "./ButtonSubmit.module.css"

const ButtonSubmit = (text) => {
  return (
    <button type="submit" className={styles.ButtonSubmit}>{text.text}</button>
  )
}

export default ButtonSubmit