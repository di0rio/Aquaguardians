import styles from "./Button.module.css"
import MuiButton from "@mui/material/Button"

const Button = ({children, img, link}) => {
  return (
    <MuiButton variant="contained" href={link}>{children}</MuiButton>
  )
}

export default Button