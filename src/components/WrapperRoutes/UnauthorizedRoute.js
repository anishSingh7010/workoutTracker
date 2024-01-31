// only available to unauthorized users

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const UnauthorizedRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth.loggedIn ? <Navigate to="/account" /> : <Outlet />;
};

export default UnauthorizedRoute;
