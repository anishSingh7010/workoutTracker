import Navbar from './Navbar';
import './Navigation.css';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navigation = () => {
  const navItems = [
    { name: 'Sign In', link: '/signin' },
    { name: 'Register', link: '/register' },
  ];

  return (
    <header>
      <button className="hamburger-menu hidden">
        <GiHamburgerMenu />
      </button>
      <span className="logo">LOGO</span>
      {/*Desktop only navigation; Mobile navigation will be rendered in a modal*/}
      <div className="d-none desktop-nav">
        <Navbar navItems={navItems} />
      </div>
      <button className="hamburger-menu">
        <GiHamburgerMenu />
      </button>
    </header>
  );
};

export default Navigation;
