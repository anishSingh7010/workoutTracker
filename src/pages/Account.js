import AccountNavigation from '../components/Account/AccountNavigation';
import { Outlet } from 'react-router-dom';
import './Account.css';
import useAxiosPrivate from '../hooks/use-axios-private';
import { useEffect, useState } from 'react';
import useLoading from '../hooks/use-loading';
import Loader from '../components/UI/Loader';

const EXERCISE_ENDPOINT = '/account/exercises';
const WORKOUTS_ENDPOINT = '/account/workouts';

const Account = () => {
  const axiosPrivate = useAxiosPrivate();
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // loading start
        showLoading();
        const responseExercises = await axiosPrivate.get(EXERCISE_ENDPOINT);
        const responseWorkouts = await axiosPrivate.get(WORKOUTS_ENDPOINT);
        setExercises(responseExercises.data.exercises);
        setWorkouts(responseWorkouts.data.workouts);
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
    <div className="account-page">
      <AccountNavigation />
      <div className="wrapper">
        {isLoading && <Loader />}
        <Outlet
          context={{
            exercises,
            workouts,
            setExercises,
            setWorkouts,
          }}
        />
      </div>
    </div>
  );
};

export default Account;
