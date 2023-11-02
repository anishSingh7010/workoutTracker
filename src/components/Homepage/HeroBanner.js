import { Link } from 'react-router-dom';
import './HeroBanner.css';
import HeroImageDesktop from '../../assets/desktop-hero-image.jpg';
import HeroImageMobile from '../../assets/mobile-hero-image.jpg';
import useWindowDimensions from '../../hooks/use-window-dimensions';

const HeroBanner = () => {
  const { width } = useWindowDimensions();
  return (
    <div
      className="hero-banner-wrapper"
      style={{
        backgroundImage: `url(${
          width >= 768 ? HeroImageDesktop : HeroImageMobile
        })`,
      }}
    >
      <div className="hero-text">
        HI PLEASE JOIN
        <button>
          {/*Different text for logged in users*/}
          <Link to="/register">Join us</Link>
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
