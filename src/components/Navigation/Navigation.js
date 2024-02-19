import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';

import ChangeTheme from '../UI/ChangeTheme';
import Navbar from './Navbar.js';
import './Navigation.css';
import Modal from '../UI/Modal';

const Navigation = () => {
  const navItems = [
    { name: 'Sign In', link: '/signin' },
    { name: 'Register', link: '/register' },
  ];

  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsNavModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsNavModalOpen(false);
  };

  let mobileAccountNavItems = [
    { name: 'Add/Show Exercises', link: '/account/exercises' },
    { name: 'Add/Show Workouts', link: '/account/workouts' },
    { name: 'Compare Exercises', link: '/account/compare-workouts' },
    { name: 'Compare Workouts', link: '/account/compare-exercises' },
  ];

  return (
    <header>
      <button onClick={openModalHandler} className="hamburger-menu">
        <GiHamburgerMenu />
      </button>
      <Link to="/" className="logo">
        LOGO
      </Link>
      {/*Desktop only navigation; Mobile navigation will be rendered in a modal*/}
      <div className="d-none desktop-nav">
        <Navbar navItems={navItems} />
      </div>

      {isNavModalOpen && (
        <Modal onClose={closeModalHandler}>
          <button className="modal-close" onClick={closeModalHandler}>
            <CgClose />
          </button>
          <div className="mobile-nav">
            <Navbar
              onModalClose={closeModalHandler}
              navItems={navItems}
              mobileAccountNavItems={mobileAccountNavItems}
            />
          </div>
        </Modal>
      )}
      <ChangeTheme />
    </header>
  );
};

export default Navigation;
