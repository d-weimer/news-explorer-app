import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onCloseModal, openLoginModal }) {
  const altButtonLink = (
    <p className="modal__alt-text">
      or{" "}
      <button
        type="button"
        className="modal__alt-link"
        onClick={openLoginModal}
      >
        Sign in
      </button>
    </p>
  );

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
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
      <label className="modal__label">
        Username
        <input
          type="text"
          name="username"
          className="modal__input"
          placeholder="Enter your username"
          required
        />
        <span className="modal__error"></span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
