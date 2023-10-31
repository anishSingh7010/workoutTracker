import { useEffect, useState } from 'react';

const useInput = (validateValue, defaultError) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const [hasError, setHasError] = useState(!valueIsValid && isTouched);
  const [errorMessage, setErrorMessage] = useState(defaultError);

  useEffect(() => {
    setHasError(!valueIsValid && isTouched);
  }, [valueIsValid, isTouched]);

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetError = () => {
    setErrorMessage(defaultError);
    setHasError(!valueIsValid && isTouched);
  };

  return {
    value: enteredValue,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetError,
    isValid: valueIsValid,
    setHasError,
    errorMessage,
    setErrorMessage,
  };
};

export default useInput;
