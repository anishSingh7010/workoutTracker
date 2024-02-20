import { useState } from 'react';
import useAxiosPrivate from '../../hooks/use-axios-private';
import useLoading from '../../hooks/use-loading';
import Loader from '../UI/Loader';
import ExerciseCard from '../UI/ExerciseCard';
import './Exercises.css';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { CgClose } from 'react-icons/cg';
import AddExercise from './AddExercise';
import { useOutletContext } from 'react-router-dom';

const DELETE_EXERCISE_ENDPOINT = '/account/delete-exercise';

const Exercises = () => {
  const { exercises, setExercises } = useOutletContext();
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, showLoading, hideLoading } = useLoading();
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsExerciseModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsExerciseModalOpen(false);
  };

  const deleteExcerciseHandler = async (id) => {
    try {
      showLoading();
      const response = await axiosPrivate.delete(DELETE_EXERCISE_ENDPOINT, {
        data: { exerciseId: id },
      });
      setExercises(response.data.exercises);
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  const successHandler = (exercises) => {
    setExercises(exercises);
    closeModalHandler();
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>EXERCISES</h1>
      <Button
        onClick={openModalHandler}
        classes={['standard-btn', 'add-exercise']}
        buttonText="Add Exercise"
      />
      {isLoading && <Loader />}
      {!isLoading && !exercises.length && (
        <h1>You have no exercises added, please add them.</h1>
      )}
      {isExerciseModalOpen && (
        <Modal onClose={closeModalHandler}>
          <button className="modal-close" onClick={closeModalHandler}>
            <CgClose />
          </button>
          <AddExercise onSuccess={successHandler} />
        </Modal>
      )}{' '}
      {!isLoading && exercises.length > 0 && (
        <div className="exercises-cards-wrapper">
          {exercises.map((exercise) => (
            <ExerciseCard
              type={exercise.exerciseType}
              name={exercise.name}
              key={exercise['_id']}
              onClick={deleteExcerciseHandler.bind(null, exercise['_id'])}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercises;
