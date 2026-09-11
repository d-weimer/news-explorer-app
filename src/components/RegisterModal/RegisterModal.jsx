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
      isFormValid={isValid}
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
          id="register-email"
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password
        <input
          id="register-password"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleChange}
          autoComplete="new-password"
          minLength="8"
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>

      <label className="modal__label">
        Username
        <input
          id="register-username"
          type="text"
          name="username"
          className="modal__input"
          placeholder="Enter your username"
          value={values.username || ""}
          onChange={handleChange}
          autoComplete="username"
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
