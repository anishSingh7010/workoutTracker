import { NavLink } from 'react-router-dom';
import ChangeTheme from '../UI/ChangeTheme';

const Navbar = ({ navItems }) => {
  return (
    <nav>
      {navItems.map((item) => (
        <NavLink key={item.name} to={item.link}>
          {item.name}
        </NavLink>
      ))}
      <ChangeTheme />
    </nav>
  );
};

export default Navbar;
