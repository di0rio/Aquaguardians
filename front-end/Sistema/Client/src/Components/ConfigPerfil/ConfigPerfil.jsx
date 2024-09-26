import styles from './ConfigPerfil.module.css'

const ConfigPerfil = () => {
  return (
    <div className={styles.container}>
      <div className="dropstart">
          <button className="dropdown" data-bs-toggle="dropdown">
            <i class="bi bi-person-circle"></i>
          </button>
          <ul class="dropdown-menu">
            <li><h5 className="text-center my-0">Perfil</h5></li>
            <li><hr className="dropdown-divider mx-3 my-2" style={{backgroundColor:"#fff"}}/></li>
            <li><a className="dropdown-item" href="#">Dark/Light Mode</a></li>
            <li><button className="dropdown-item text-bg-danger" href="#">Sair</button></li>
          </ul>
      </div> 
    </div>
  )
}

export default ConfigPerfil