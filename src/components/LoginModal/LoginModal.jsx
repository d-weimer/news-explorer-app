import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onCloseModal, openRegisterModal }) {
  const altButtonLink = (
    <p className="modal__alt-text">
      or{" "}
      <button
        type="button"
        className="modal__alt-link"
        onClick={openRegisterModal}
      >
        Sign up
      </button>
    </p>
  );

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={onCloseModal}
      altButton={altButtonLink}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          required
        />
        <span className="modal__error"></span>
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          required
        />
        <span className="modal__error"></span>
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
