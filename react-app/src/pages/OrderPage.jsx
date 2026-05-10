import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ContactForm from '../components/ContactForm';

const products = [
  { id: 1, name: 'Dark Truffle', price: 'CHF 12' },
  { id: 2, name: 'Hazelnut Praline', price: 'CHF 15' },
  { id: 3, name: 'Milk Caramel', price: 'CHF 10' },
];

const reviews = [
  { id: 1, text: '★★★★★ Amazing luxury chocolate.' },
  { id: 2, text: '★★★★★ Perfect gift quality.' },
  { id: 3, text: '★★★★☆ Very elegant taste.' },
];

function OrderPage() {
  return (
    <>
      <Hero />

      <section className="products">
        <h2>Featured Collection</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} name={product.name} price={product.price} />
          ))}
        </div>
      </section>

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

export default OrderPage;
