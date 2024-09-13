import { Link } from "react-router-dom"

import style from "./Header.module.css"

const navigation = [
  { componente: "/", name: "Usuários" },
  { componente: "/robos", name: "Robôs" },
  { componente: "/postos", name: "Postos" },
];

const Header = () => {
  return (
    <div className={style.container}>
      <div>
        <h1>AQG</h1>
      </div>
      <div>
        <nav className={style.links}>
          {navigation.map((nav) => (
            <Link className={style.link} key={nav.name} to={nav.componente}>{nav.name}</Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Header