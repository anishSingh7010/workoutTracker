import { useContext } from 'react';
import { AuthContext } from '../components/context/AuthContext';
import axios from '../api/axios';
import useLogout from '../hooks/use-logout';

const useRefreshToken = () => {
  const REFRESH_TOKEN_ENDPOINT = '/refresh-token';
  const { setAuth } = useContext(AuthContext);
  const { logoutUser } = useLogout();
  const refresh = async () => {
    try {
      const response = await axios.post(REFRESH_TOKEN_ENDPOINT, '', {
        withCredentials: true,
      });
      setAuth((prev) => ({ ...prev, accessToken: response.data.token }));
      return response.data.token;
    } catch (err) {
      // logout user if there's an error getting a new access token
      logoutUser();
      return;
    }
  };
  return { refresh };
};

export default useRefreshToken;
