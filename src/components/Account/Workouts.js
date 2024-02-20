import { useState } from 'react';
import useAxiosPrivate from '../../hooks/use-axios-private';
import useLoading from '../../hooks/use-loading';
import Loader from '../UI/Loader';
import './Workouts.css';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { CgClose } from 'react-icons/cg';
import { useOutletContext } from 'react-router-dom';
import WorkoutDetails from './WorkoutDetails';
import AddWorkout from './AddWorkout';

const Workouts = () => {
  const axiosPrivate = useAxiosPrivate();
  const { exercises, workouts, setWorkouts } = useOutletContext();
  // key value pair of exercise id to exercise details object
  const exerciseMap = {};
  exercises.forEach((element) => {
    exerciseMap[element['_id']] = element;
  });

  const { isLoading, showLoading, hideLoading } = useLoading();
  //workout object to show details
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsWorkoutModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsWorkoutModalOpen(false);
  };

  const openWorkoutDetailsModal = (workoutObj) => {
    setSelectedWorkout(workoutObj);
  };

  const closeWorkoutDetailsModal = () => {
    setSelectedWorkout(null);
  };

  const successHandler = (workouts) => {
    setWorkouts(workouts);
    closeModalHandler();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
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
          <AddWorkout onSuccess={successHandler} exercises={exercises} />
        </Modal>
      )}{' '}
      {!isLoading && exercises.length > 0 && (
        <div className="workout-cards-wrapper">
          {workouts.map((workout, index) => {
            const date = new Date(workout.date).toDateString();
            return (
              <div className="workout">
                <p>{index + 1}:</p>
                <p>{date}</p>
                <p>Total volume: {workout.volume}</p>
                <p>Exercises performed: {workout.exercises.length}</p>
                <Button
                  classes={['standard-btn']}
                  buttonText="Show Details"
                  key={index}
                  onClick={() => openWorkoutDetailsModal(workout)}
                />
              </div>
            );
          })}
          {selectedWorkout && (
            <Modal
              classes={['workout-details-modal']}
              onClose={closeWorkoutDetailsModal}
            >
              <button
                className="modal-close"
                onClick={closeWorkoutDetailsModal}
              >
                <CgClose />
              </button>
              <WorkoutDetails
                exerciseMap={exerciseMap}
                workout={selectedWorkout}
              />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Workouts;
