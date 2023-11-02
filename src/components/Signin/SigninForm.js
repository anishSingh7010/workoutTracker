import { useContext } from 'react';
import useInput from '../../hooks/use-input';
import Input from '../UI/Input';
import { AuthContext } from '../context/AuthContext';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const SIGNIN_ENDPOINT = '/login';

const SigninForm = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
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
    return value.trim().length > 0;
  }, `Please enter a valid password.`);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    // reset server side error validations after form has been submitted
    resetEmailError();
    resetPasswordError();

    let siginData = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      const response = await axios.post(
        SIGNIN_ENDPOINT,
        JSON.stringify(siginData),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      // all errors handled
      // redirect to account page
      setAuth({
        loggedIn: true,
        username: response.data.name,
        accessToken: response.data.accessToken,
      });

      localStorage.setItem('username', response.data.name);
      // delete on logout or when refresh token expires
      alert('User logged in successfully');
      navigate('/account');
    } catch (err) {
      if (!err?.response || err?.response?.status === 500) {
        alert('Something went wrong. Please try again');
        return;
      }

      // array of errors is returned if status code is 400 or 409
      if (err.response.status === 400 || err.response.status === 401) {
        setErrors(err.response.data);
        return;
      }
    }
  };

  // set state for error responses
  const setErrors = (errors) => {
    errors.forEach((errorObject) => {
      switch (errorObject.path) {
        case 'email':
          setEmailErrorMessage(errorObject.msg);
          setEmailHasError(true);
          break;
        case 'password':
          break;
        default:
          break;
      }
    });
  };

  const isFormValid = emailIsValid && passwordIsValid;

  return (
    <div className="signin-form-wrapper">
      <form onSubmit={submitFormHandler}>
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
        <button disabled={!isFormValid ? 'disabled' : ''}>Submit</button>
      </form>
    </div>
  );
};

export default SigninForm;
