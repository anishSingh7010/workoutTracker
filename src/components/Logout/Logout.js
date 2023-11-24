import useLogout from '../../hooks/use-logout';
import Button from '../UI/Button';

const Logout = () => {
  const { logoutUser } = useLogout();

  return (
    <Button
      buttonText="Logout"
      className="logout-button"
      onClick={logoutUser}
      classes={['logout-button']}
    />
  );
};

export default Logout;
