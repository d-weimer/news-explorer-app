import React from "react";

function RegisterSuccessModal({ isOpen, onCloseModal, openLoginModal }) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_success">
        <button onClick={onCloseModal} type="button" className="modal__close" />
        <h3 className="modal__title modal__title_type_success">
          Registration successfully completed!
        </h3>
        <button
          type="button"
          className="modal__alt-link modal__alt-link_type_success"
          onClick={() => {
            onCloseModal();
            openLoginModal();
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterSuccessModal;
