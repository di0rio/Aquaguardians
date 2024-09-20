import styles from "./Postos.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Postos = () => {
  return (
    <div className={styles.tabelas}>

      <table class="table" >
          <thead className={styles.Header}>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Localização</th>
              <th scope="col">Status</th>
              <th scope="col">Capacidade</th>
            </tr>
          </thead>
        <tbody className={styles.Row}>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@twitter</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>

      <div></div>
    </div>
  );
};

export default Postos;
