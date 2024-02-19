import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/use-axios-private';
import useLoading from '../../hooks/use-loading';
import Loader from '../UI/Loader';
import ExerciseCard from '../UI/ExerciseCard';
import './Exercises.css';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { CgClose } from 'react-icons/cg';
import AddExercise from './AddExercise';

const EXERCISE_ENDPOINT = '/account/exercises';
const WORKOUTS_ENDPOINT = '/account/workouts';

const Workouts = () => {
  const axiosPrivate = useAxiosPrivate();
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsWorkoutModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsWorkoutModalOpen(false);
  };

  const successHandler = (exercises) => {
    setWorkouts(workouts);
    closeModalHandler();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // loading start
        showLoading();
        const exercisesResponse = await axiosPrivate.get(EXERCISE_ENDPOINT);
        const workoutsResponse = await axiosPrivate.get(EXERCISE_ENDPOINT);
        setExercises(exercisesResponse);
        setWorkouts(workoutsResponse);
      } catch (error) {
        console.log(error);
      } finally {
        //loading end
        hideLoading();
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>EXERCISES</h1>
      <Button
        onClick={openModalHandler}
        classes={['standard-btn', 'add-workout']}
        buttonText="Add Workout"
      />
      {isLoading && <Loader />}
      {!isLoading && !workouts.length && (
        <h1>You have no workouts added, please add them.</h1>
      )}
      {isWorkoutModalOpen && (
        <Modal onClose={closeModalHandler}>
          <button className="modal-close" onClick={closeModalHandler}>
            <CgClose />
          </button>
          {/** AddWORKOUTCOMPONENT */}
        </Modal>
      )}{' '}
      {!isLoading && exercises.length > 0 && (
        <div className="workout-cards-wrapper">
          {workouts.map((workout) => (
            // <ExerciseCard
            //   type={exercise.exerciseType}
            //   name={exercise.name}
            //   key={exercise['_id']}
            //   onClick={deleteExcerciseHandler.bind(null, exercise['_id'])}
            // />
            <h1></h1>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
