import { useNavigate } from "react-router-dom";
import styles from "./EditUser.module.css";
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";

const EditUser = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className={styles.form}>
        <div className={styles.header}>
          <h2>Editar Usuário</h2>
          <div className={styles.iconVoltar}>
            <ion-icon
              name="arrow-back-outline"
              type="button"
              onClick={handleGoBack}
            />
          </div>
        </div>
        <form className={styles.Container}>
          <input
            type="text"
            name="name"
            // value={formData.name}
            // onChange={handleChange}
            placeholder="Nome do Robô"
            required
          />
          <input
            type="text"
            name="model"
            // value={formData.model}
            // onChange={handleChange}
            placeholder="Modelo do Robô"
            required
          />
          <label>
            <input
            className={styles.custombox}
              type="checkbox"
              name="isAvaliableForRent"
              // checked={formData.isAvaliableForRent}
              // onChange={handleChange}
            />
            Status
          </label>
          <ButtonSubmit text="Editar" />
        </form>
      </div>
    </div>
  );
};

export default EditUser;
