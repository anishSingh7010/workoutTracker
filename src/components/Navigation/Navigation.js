import { useState } from 'react';
import Navbar from './Navbar';
import './Navigation.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import Logo from '../../assets/logo.png';
import Modal from '../UI/Modal';
import { Link } from 'react-router-dom';

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

  return (
    <header>
      {/*Only used for alignment purposes*/}
      <button className="hamburger-menu hidden">
        <GiHamburgerMenu />
      </button>
      <Link to="/" className="logo">
        <img src={Logo} alt="Workout Tracker" />
      </Link>
      {/*Desktop only navigation; Mobile navigation will be rendered in a modal*/}
      <div className="d-none desktop-nav">
        <Navbar navItems={navItems} />
      </div>
      <button onClick={openModalHandler} className="hamburger-menu">
        <GiHamburgerMenu />
      </button>
      {isNavModalOpen && (
        <Modal onClose={closeModalHandler}>
          <div className="mobile-nav">
            <Navbar navItems={navItems} />
          </div>
          <button className="self-start" onClick={closeModalHandler}>
            <CgClose />
          </button>
        </Modal>
      )}
    </header>
  );
};

export default Navigation;
