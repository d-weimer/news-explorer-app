import { useState, useCallback } from "react";

export function useForm(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value, validationMessage } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });

    if (evt.target.closest("form")) {
      setIsValid(evt.target.closest("form").checkValidity());
    }
  }

  const handleReset = useCallback(
    (newValues = defaultValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [defaultValues],
  );

  return { values, setValues, errors, isValid, handleChange, handleReset };
}
