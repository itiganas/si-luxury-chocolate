import { Link } from 'react-router-dom';

const heroImages = [
  '/images/hero_background_1.png',
  '/images/hero_background_2.png',
  '/images/hero_background_3.png',
];

function Hero() {
  return (
    <section className="hero">
      <div className="slideshow-wrapper">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <div className="hero-content">
        <h1>Crafted Luxury in Every Bite</h1>
        <p>Premium handmade chocolates with elegance and passion.</p>
        <br />
        <Link to="/shop">
          <button className="btn">Discover Collection</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
