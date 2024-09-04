import styles from "./Cards.module.css";

const Cards = ({ title, sub, data, game, img, desc }) => {
  return (
    <div className={styles.ConatinerCard}>
      <div>
        <img src={img} alt={desc} />
      </div>
      <div className={styles.Card}>
        <div className={styles.Conteudo}>
          <div>
            <div>
              <p>{title}</p>
            </div>
            <div>
              <p>{data}</p>
            </div>
          </div>
          <div>
            <div>
              <p>{sub}</p>
            </div>
          </div>
          <div>
            <div>{game}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
