import { NavLink } from 'react-router-dom';
import ChangeTheme from '../UI/ChangeTheme';
import './Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Logout from './Logout/Logout';

const Navbar = ({ navItems }) => {
  const { auth } = useContext(AuthContext);
  return (
    <nav>
      {!auth.loggedIn &&
        navItems.map((item) => (
          <NavLink key={item.name} to={item.link}>
            {item.name}
          </NavLink>
        ))}
      {auth.loggedIn && (
        <>
          <NavLink to="/account">Hi {auth.username} My Account</NavLink>
          <Logout />
        </>
      )}
      <ChangeTheme />
    </nav>
  );
};

export default Navbar;
