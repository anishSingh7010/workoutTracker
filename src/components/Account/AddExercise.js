import { useState } from 'react';
import useInput from '../../hooks/use-input';
import useLoading from '../../hooks/use-loading';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Loader from '../UI/Loader';
import SelectInput from '../UI/SelectInput';
import './AddExercise.css';
import useAxiosPrivate from '../../hooks/use-axios-private';

const ADD_EXERCISE_ENDPOINT = '/account/add-exercise';

const AddExercise = ({ onSuccess }) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    value: exerciseNameValue,
    hasError: exerciseNameHasError,
    valueChangeHandler: exerciseNameChangeHandler,
    inputBlurHandler: exerciseNameBlurHandler,
    resetError: resetExerciseNameError,
    isValid: exerciseNameIsValid,
    setHasError: setExerciseNameHasError,
    errorMessage: exerciseNameErrorMessage,
    setErrorMessage: setExerciseNameErrorMessage,
  } = useInput((value) => {
    return value.trim().length > 0;
  }, 'Please enter a valid exercise name.');

  const isFormValid = exerciseNameIsValid;
  const { isLoading, showLoading, hideLoading } = useLoading();
  const [exerciseType, setExerciseType] = useState('push');

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    // reset server side error validations after form has been submitted
    resetExerciseNameError();

    let exerciseData = {
      exerciseName: exerciseNameValue,
      exerciseType: exerciseType,
    };

    try {
      showLoading();
      const response = await axiosPrivate.post(
        ADD_EXERCISE_ENDPOINT,
        JSON.stringify(exerciseData)
      );
      onSuccess(response.data.exercises);
    } catch (err) {
      if (
        !err?.response ||
        err?.response?.status === 500 ||
        err?.response?.status === 400
      ) {
        alert('Something went wrong. Please try again');
        return;
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <div className="add-exercise-form-wrapper">
        <form onSubmit={submitFormHandler}>
          <Input
            placeholder="Exercise Name*"
            identifier="exerciseName"
            input={{ type: 'text' }}
            value={exerciseNameValue}
            hasError={exerciseNameHasError}
            onChangeHandler={exerciseNameChangeHandler}
            onBlurHandler={exerciseNameBlurHandler}
            errorMessage={exerciseNameErrorMessage}
          />
          <SelectInput
            default={exerciseType}
            options={['push', 'pull', 'legs']}
            onChangeHandler={setExerciseType}
          />
          <Button
            classes={['standard-btn']}
            buttonText="ADD"
            isDisabled={!isFormValid}
          />
        </form>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default AddExercise;
