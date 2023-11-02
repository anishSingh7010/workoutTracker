import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './ChangeTheme.css';
import { ReactComponent as Sun } from '../../assets/Sun.svg';
import { ReactComponent as Moon } from '../../assets/Moon.svg';

const ChangeTheme = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  return (
    <>
      <input
        onChange={toggleTheme}
        className="dark_mode_input"
        type="checkbox"
        checked={currentTheme === 'dark-theme'}
        id="darkmode-toggle"
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </>
  );
};

export default ChangeTheme;
