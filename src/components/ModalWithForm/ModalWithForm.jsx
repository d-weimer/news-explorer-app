import "./ModalWithForm.css";
import modalClose from "../../assets/modal-close.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  altButton,
  buttonClassName,
  isFormValid = true,
}) {
  const submitButtonClassName = `modal__submit ${
    isFormValid ? "modal__submit_active" : ""
  }`;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={modalClose}
            alt="Close Button"
            className="modal__close-button"
          />
        </button>
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={handleFormSubmit} className="modal__form">
          {children}
          <div className="modal__submit-container">
            <button
              type="submit"
              className={buttonClassName || submitButtonClassName}
              disabled={!isFormValid}
            >
              {buttonText}
            </button>
            {altButton && altButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
