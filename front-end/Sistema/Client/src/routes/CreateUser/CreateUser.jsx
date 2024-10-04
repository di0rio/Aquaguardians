import styles from "./CreateUser.module.css";

import { useNavigate, useLocation } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Conteudo}>
        <div className={styles.Title}>
          <h2>Adicionar</h2>
        </div>
        <div className={styles.Input}>
          <div>
            <input type="text" placeholder="" />
          </div>
          <div>
            <input type="text" placeholder="" />
        </div>
        </div>
      </div>
      <div className={styles.Btns}>
        <div className={styles.BtnCriar}>
          <button onClick={handleGoBack}>Adicionar</button>
        </div>
        <div onClick={handleGoBack} className={styles.BtnVoltar}>
          <button>Voltar</button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
