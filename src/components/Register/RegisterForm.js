import { CgClose } from 'react-icons/cg';
import useInput from '../../hooks/use-input';
import Input from '../UI/Input';
import axios from '../../api/axios';
import './RegisterForm.css';
import Button from '../UI/Button';
import useLoading from '../../hooks/use-loading';
import Loader from '../UI/Loader';
import Modal from '../UI/Modal';
import { useState } from 'react';
import RegistrationModal from './RegistrationModal';
import { useNavigate } from 'react-router-dom';

const MIN_PASSWORD_LENGTH = 8;
const REGISTER_ENDPOINT = '/register';

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
    setHasError: setPasswordHasError,
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
    setHasError: setConfirmPasswordHasError,
    errorMessage: passwordErrorMessage,
    setErrorMessage: setPasswordErrorMessage,
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
    setErrorMessage: setConfirmPasswordErrorMessage,
  } = useInput((value) => {
    return value.trim() === passwordValue;
  }, 'Passwords do not match');

  const { isLoading, showLoading, hideLoading } = useLoading();
  const [registrationModal, setRegistrationModal] = useState({
    show: false,
    successful: false,
  });

  const navigate = useNavigate();

  const showSuccessfulRegistrationModal = () => {
    setRegistrationModal({
      show: true,
      successful: true,
    });
  };

  const showFailureRegistrationModal = () => {
    setRegistrationModal({
      show: true,
      successful: false,
    });
  };

  const hideRegistrationModal = () => {
    if (registrationModal.successful) {
      navigate('/signin');
    }
    setRegistrationModal({
      show: false,
      successful: false,
    });
  };

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

    try {
      showLoading();
      await axios.post(REGISTER_ENDPOINT, JSON.stringify(registerData), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // all errors handled
      hideLoading();
      showSuccessfulRegistrationModal();
    } catch (err) {
      if (!err || err?.response?.status === 500) {
        alert('Something went wrong. Please try again');
        showFailureRegistrationModal();
        return;
      }

      if (err?.response?.status === 400 || err?.response?.status === 409) {
        setErrors(err.response.data);
        return;
      }
    } finally {
      hideLoading();
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
        case 'name':
          setNameErrorMessage(errorObject.msg);
          setNameHasError(true);
          break;
        case 'password':
          setPasswordErrorMessage(errorObject.msg);
          setPasswordHasError(true);
          break;
        case 'confirmPassword':
          setConfirmPasswordErrorMessage(errorObject.msg);
          setConfirmPasswordHasError(true);
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
      {isLoading && <Loader />}
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
        <Button buttonText="REGISTER" isDisabled={!isFormValid} />
      </form>
      {registrationModal.show && (
        <Modal onClose={hideRegistrationModal}>
          <div className="registration-modal">
            <RegistrationModal result={registrationModal.successful} />
            <button className="modal-close" onClick={hideRegistrationModal}>
              <CgClose />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RegisterForm;
