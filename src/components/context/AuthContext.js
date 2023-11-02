import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let initialState = { loggedIn: false };
  const username = localStorage.getItem('username');
  if (username) {
    initialState.loggedIn = true;
    initialState.username = username;
  }
  const [auth, setAuth] = useState(initialState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
