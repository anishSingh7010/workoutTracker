import useInput from '../../hooks/use-input';
import Input from '../UI/Input';

const MIN_PASSWORD_LENGTH = 8;
const REGISTER_API = 'http://localhost:5000/account/register';

const RegisterForm = () => {
  const {
    value: nameValue,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetError: resetNameError,
    isValid: nameIsValid,
    setHasError: setNameHasError,
    errorMessage: nameErrorMessage,
    setErrorMessage: setNameErrorMessage,
  } = useInput((value) => {
    return value.trim() !== '';
  }, 'Name is required.');

  const {
    value: emailValue,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetError: resetEmailError,
    isValid: emailIsValid,
    setHasError: setEmailHasError,
    errorMessage: emailErrorMessage,
    setErrorMessage: setEmailErrorMessage,
  } = useInput((value) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return value.trim() !== '' && emailRegex.test(value);
  }, 'Please enter a valid email.');

  const {
    value: passwordValue,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetError: resetPasswordError,
    isValid: passwordIsValid,
    errorMessage: passwordErrorMessage,
  } = useInput((value) => {
    return value.trim().length >= MIN_PASSWORD_LENGTH;
  }, `Password should have atleast ${MIN_PASSWORD_LENGTH} characters`);

  const {
    value: confirmPasswordValue,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    resetError: resetConfirmPasswordError,
    isValid: confirmPasswordIsValid,
    errorMessage: confirmPasswordErrorMessage,
  } = useInput((value) => {
    return value.trim() === passwordValue;
  }, 'Passwords do not match');

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    // reset server side error validations after form has been submitted
    resetNameError();
    resetEmailError();
    resetPasswordError();
    resetConfirmPasswordError();

    let registerData = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    };
    const response = await fetch(REGISTER_API, {
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response || response?.status === 500) {
      alert('Something went wrong. Please try again');
      return;
    }

    const responseJSON = await response.json();
    console.log(response.status);
    // array of errors is returned if status code is 400 or 409
    if (response.status === 400 || response.status === 409) {
      setErrors(responseJSON);
      return;
    }

    // all errors handled
    // redirect to account page
    alert('User created successfully');
  };

  // set state for error responses
  const setErrors = (errors) => {
    errors.forEach((errorObject) => {
      switch (errorObject.path) {
        case 'email':
          setEmailErrorMessage(errorObject.msg);
          setEmailHasError(true);
          break;
        case 'name':
          setNameErrorMessage(errorObject.msg);
          setNameHasError(true);
          break;
        default:
          break;
      }
    });
  };

  const isFormValid =
    nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid;

  return (
    <div className="register-form-wrapper">
      <form onSubmit={submitFormHandler}>
        <Input
          placeholder="Name*"
          identifier="name"
          input={{
            type: 'text',
            minLength: '1',
            maxLength: '25',
          }}
          value={nameValue}
          hasError={nameHasError}
          onChangeHandler={nameChangeHandler}
          onBlurHandler={nameBlurHandler}
          errorMessage={nameErrorMessage}
        />
        <Input
          placeholder="Email*"
          identifier="email"
          input={{ type: 'email' }}
          value={emailValue}
          hasError={emailHasError}
          onChangeHandler={emailChangeHandler}
          onBlurHandler={emailBlurHandler}
          errorMessage={emailErrorMessage}
        />
        <Input
          placeholder="Password*"
          identifier="password"
          input={{ type: 'password' }}
          value={passwordValue}
          hasError={passwordHasError}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={passwordBlurHandler}
          errorMessage={passwordErrorMessage}
        />
        <Input
          placeholder="Confirm Password*"
          identifier="confirmPassword"
          input={{ type: 'password' }}
          value={confirmPasswordValue}
          hasError={confirmPasswordHasError}
          onChangeHandler={confirmPasswordChangeHandler}
          onBlurHandler={confirmPasswordBlurHandler}
          errorMessage={confirmPasswordErrorMessage}
        />
        <button disabled={!isFormValid ? 'disabled' : ''}>Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
