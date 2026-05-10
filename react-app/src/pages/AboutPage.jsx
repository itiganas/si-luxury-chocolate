import ContactForm from '../components/ContactForm';

const reviews = [
  { id: 1, text: '★★★★★ Amazing luxury chocolate.' },
  { id: 2, text: '★★★★★ Perfect gift quality.' },
  { id: 3, text: '★★★★☆ Very elegant taste.' },
];

function AboutPage() {
  return (
    <>
      <section className="reviews">
        <h2>Client Reviews</h2>
        <div className="review-inline">
          {reviews.map((review) => (
            <div key={review.id} className="card">
              {review.text}
            </div>
          ))}
        </div>
      </section>

      <ContactForm />
    </>
  );
}

export default AboutPage;
