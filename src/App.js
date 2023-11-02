import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import RootLayout from './components/RootLayout/RootLayout';
import { createContext, useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import HeroBanner from './components/Homepage/HeroBanner';
import Signin from './pages/Signin';
import { AuthProvider } from './components/context/AuthContext';
import Account from './pages/Account';
import Footer from './components/Footer/Footer';

export const ThemeContext = createContext();
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <RootLayout />
        </>
      ),
      errorElement: <div>WRONG ROUTE</div>,
      children: [
        {
          element: (
            <>
              <Navigation />
              <HeroBanner />
              <Footer />
            </>
          ),
          index: true,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/signin',
          element: <Signin />,
        },
        {
          path: '/account',
          element: <Account />,
        },
      ],
    },
  ]);

  const currentTheme = localStorage.getItem('workout-tracker-theme');
  const [theme, setTheme] = useState(
    currentTheme ? currentTheme : 'light-theme'
  );

  const toggleTheme = () => {
    setTheme((currTheme) => {
      let newTheme = currTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
      // saving user's theme preference
      localStorage.setItem('workout-tracker-theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme }}>
      <AuthProvider>
        <div className="App " id={theme}>
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </ThemeContext.Provider>
  );
}

export default App;
