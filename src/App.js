import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import RootLayout from './components/RootLayout/RootLayout';
import { createContext, useState } from 'react';
import Navigation from './components/Navigation/Navigation';

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
      children: [
        {
          element: (
            <>
              <Navigation />
            </>
          ),
          index: true,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
  ]);

  const currentTheme = localStorage.getItem('workout-tracker-theme');
  const [theme, setTheme] = useState(
    currentTheme ? currentTheme : 'light-theme'
  );

  const toggleTheme = () => {
    setTheme((currTheme) =>
      currTheme === 'light-theme' ? 'dark-theme' : 'light-theme'
    );
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme }}>
      <div className="App " id={theme}>
        <RouterProvider router={router} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
