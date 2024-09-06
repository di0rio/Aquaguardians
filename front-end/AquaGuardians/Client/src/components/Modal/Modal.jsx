import React from "react";
import "./Modal.css";

const Modal = ({ children, handleClose, title }) => {
  return (
    <>
      <div className="telaInteira overflow-hidden" onClick={handleClose}>

        <div className="modal show d-block" tabIndex="-1">

          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">{children}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                  style={{background:'rgb(50, 88, 161, 0.4)', border: 'none'}}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </>
  );
};

export default Modal;
