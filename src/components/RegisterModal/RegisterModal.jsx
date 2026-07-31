import React from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onCloseModal, openLoginModal, onRegister }) {
  const { values, errors, isValid, handleChange, handleReset } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister({
        email: values.email,
        password: values.password,
        name: values.username,
      });
      handleReset();
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      altButtonText="Sign in"
      onAltClick={openLoginModal}
      isSubmitDisabled={!isValid}
      altButton={
        <p className="modal__alt-text">
          or
          <button
            type="button"
            className="modal__alt-link"
            onClick={openLoginModal}
          >
            Sign in
          </button>
        </p>
      }
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleChange}
          minLength="8"
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>

      <label className="modal__label">
        Username
        <input
          type="text"
          name="username"
          className="modal__input"
          placeholder="Enter your username"
          value={values.username || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="modal__error">{errors.username}</span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
