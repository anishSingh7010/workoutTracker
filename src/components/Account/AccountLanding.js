import { NavLink } from 'react-router-dom';
import './AccountLanding.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AccountLanding = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="account-landing-wrapper">
      <div className="account-landing-text">
        Hi {auth.username}, Start tracking your workouts!
      </div>
      <NavLink className="add-workout-link" to="/account/workouts">
        Add Workout
      </NavLink>
    </div>
  );
};
export default AccountLanding;
