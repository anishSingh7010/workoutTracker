import { useContext, useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './use-refresh-token';
import { AuthContext } from '../components/context/AuthContext';

const useAxiosPrivate = () => {
  const { refresh } = useRefreshToken();
  const { auth } = useContext(AuthContext);

  // adding interceptors to request response here
  useEffect(() => {
    // adding access token in the authorization headers
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      // expired token or no token found
      async (error) => {
        // resend after getting new access token
        const prevRequest = error?.config;
        console.log(error);
        if (error?.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        // forbidden or invalid refresh token
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
