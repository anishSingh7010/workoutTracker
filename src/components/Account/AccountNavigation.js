import { NavLink } from 'react-router-dom';
import './AccountNavigation.css';

export const AccountNavigation = () => {
  const navItems = [
    // will have option to add workouts and exercises
    { name: 'Add/Show Exercises', link: '/account/exercises' },
    { name: 'Add/Show Workouts', link: '/account/workouts' },
    { name: 'Compare Exercises', link: '/account/compare-workouts' },
    { name: 'Compare Workouts', link: '/account/compare-exercises' },
  ];
  return (
    <div className="account-navigation">
      {navItems.map((item) => (
        <NavLink key={item.name} to={item.link}>
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default AccountNavigation;
