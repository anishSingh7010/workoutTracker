import useLogout from '../../../hooks/use-logout';

const Logout = () => {
  const { logoutUser } = useLogout();

  return <button onClick={logoutUser}>LOGOUT</button>;
};

export default Logout;
