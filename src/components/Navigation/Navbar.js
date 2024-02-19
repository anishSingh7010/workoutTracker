import { NavLink } from 'react-router-dom';
import ChangeTheme from '../UI/ChangeTheme';
import './Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Logout from '../Logout/Logout';

const Navbar = ({ navItems, onModalClose, mobileAccountNavItems = [] }) => {
  const { auth } = useContext(AuthContext);
  return (
    <nav>
      {!auth.loggedIn &&
        navItems.map((item) => (
          <NavLink onClick={onModalClose} key={item.name} to={item.link}>
            {item.name}
          </NavLink>
        ))}
      {auth.loggedIn && (
        <>
          {mobileAccountNavItems.map((item) => (
            <NavLink onClick={onModalClose} key={item.name} to={item.link}>
              {item.name}
            </NavLink>
          ))}
          <NavLink onClick={onModalClose} to="/account">
            My Account
          </NavLink>
          <Logout />
        </>
      )}
      <ChangeTheme />
    </nav>
  );
};

export default Navbar;
