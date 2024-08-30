import React from "react";
import style from "./Registro.module.css";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Registro = () => {
  return (
    <div className={style.container}>
      <div className={style.bloco}>
        <div className={style.form}>
          <form className="d-flex flex-column align-items-center">
            <h2>CRIAR CONTA</h2>

            <div class="input-group mb-3 d-flex align-items-end">
              <span className="pb-2">
                <PersonIcon></PersonIcon>
              </span>
              <input
                type="text"
                placeholder="Usuário"
                class="form-control"
                id="ii2"
                aria-describedby="emailHelp"
              ></input>
              <div id="emailHelp" class="form-text"></div>
            </div>

            <label for="exampleInputEmail1" class="form-label"></label>

            <div class="input-group mb-3 d-flex align-items-end">
              <span className="pb-2">
                <EmailIcon></EmailIcon>
              </span>
              <input
                type="text"
                placeholder="E-mail"
                class="form-control"
                id="ii"
                aria-describedby="emailHelp"
              ></input>
              <div id="emailHelp" class="form-text"></div>
            </div>
            <div class="input-group mb-5 d-flex align-items-center">
              <span className="pb-2">
                <LockOpenIcon></LockOpenIcon>
              </span>
              <label for="exampleInputPassword1" class="form-label"></label>
              <input
                type="text"
                placeholder="Senha"
                class="form-control"
                id="exampleInputPassword1"
              ></input>
            </div>

            <button type="submit" class="btn btn-primary mt-9">
              JOGUE AGORA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
