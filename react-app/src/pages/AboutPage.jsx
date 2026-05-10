const reviews = [
  { id: 1, stars: '★★★★★', text: 'Amazing luxury chocolate. Every bite is an experience.', author: 'Sophie M.' },
  { id: 2, stars: '★★★★★', text: 'Perfect gift quality. The packaging alone impressed everyone.', author: 'Thomas K.' },
  { id: 3, stars: '★★★★☆', text: 'Very elegant taste. Refined and not too sweet — exactly right.', author: 'Elena R.' },
];

function AboutPage() {
  return (
    <>
      {/* Story section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-label">Our Story</p>
          <h1>Made with love,<br />one truffle at a time.</h1>
          <p className="about-intro">
            SI Luxury Chocolate was born from a simple belief: that chocolate should be an
            experience, not just a treat. Every piece is handcrafted in small batches using
            the finest cacao, with no shortcuts and no compromises.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-grid">
          <div className="about-value-card">
            <span className="about-value-icon">🍫</span>
            <h3>Handcrafted</h3>
            <p>Each piece is rolled, dipped and finished by hand in our small workshop.</p>
          </div>
          <div className="about-value-card">
            <span className="about-value-icon">🌱</span>
            <h3>Ethically Sourced</h3>
            <p>We work directly with cacao farmers who share our commitment to quality.</p>
          </div>
          <div className="about-value-card">
            <span className="about-value-icon">🎁</span>
            <h3>Gift Ready</h3>
            <p>Every order is beautifully packaged — no extra wrapping needed.</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews">
        <h2>What our customers say</h2>
        <div className="review-inline">
          {reviews.map((review) => (
            <div key={review.id} className="card review-card">
              <p className="review-stars">{review.stars}</p>
              <p className="review-text">"{review.text}"</p>
              <p className="review-author">— {review.author}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default AboutPage;
