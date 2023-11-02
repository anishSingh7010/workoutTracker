import { useContext } from 'react';
import { AuthContext } from '../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const useLogout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const LOGOUT_API = 'http://localhost:5000/logout';
      await axios.post(LOGOUT_API, { method: 'POST' });
      setAuth({ loggedIn: false });
      localStorage.removeItem('username');
    } catch (err) {
      alert('Something went wrong');
    } finally {
      navigate('/');
    }
  };

  return { logoutUser };
};
export default useLogout;
