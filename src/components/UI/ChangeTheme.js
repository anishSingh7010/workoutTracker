import { useContext } from 'react';
import { ThemeContext } from '../../App';

const ChangeTheme = () => {
  const themeContext = useContext(ThemeContext);
  return <button onClick={themeContext.toggleTheme}>Change Theme</button>;
};

export default ChangeTheme;
