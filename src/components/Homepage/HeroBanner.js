import { Link } from 'react-router-dom';
import './HeroBanner.css';
import HeroImageDesktop from '../../assets/desktop-hero-image.jpg';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const HeroBanner = () => {
  const { auth } = useContext(AuthContext);
  let heroText = 'Take your fitness journey to the next level!';
  let heroButton = 'Sign Up';
  let heroButtonLink = '/register';

  if (auth.loggedIn) {
    heroText = `Hi, ${auth.username}! Let's Track Some Workouts!`;
    heroButton = 'My Account';
    heroButtonLink = '/account';
  }
  return (
    <div
      className="hero-banner-wrapper"
      style={{
        backgroundImage: `url(${HeroImageDesktop})`,
      }}
    >
      <div className="hero-banner-overlay"></div>
      <div className="hero-text">
        <span>{heroText}</span>
        <Link className="hero-button" to={heroButtonLink}>
          {heroButton}
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
