import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: 'Dark Truffle',      price: 'CHF 12', image: '/images/choco_truffle.png' },
  { id: 2, name: 'Hazelnut Praline',  price: 'CHF 15', image: '/images/choco_1.jpg' },
  { id: 3, name: 'Milk Caramel',      price: 'CHF 10', image: '/images/choco_2.jpg' },
  { id: 4, name: 'Dark Collection',   price: 'CHF 18', image: '/images/choco_3.jpg' },
];

function ShopPage() {
  return (
    <section className="products">
      <h2>Our Collection</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}

export default ShopPage;
