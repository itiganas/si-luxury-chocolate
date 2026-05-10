import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: 'Dark Truffle', price: 'CHF 12' },
  { id: 2, name: 'Hazelnut Praline', price: 'CHF 15' },
  { id: 3, name: 'Milk Caramel', price: 'CHF 10' },
];

function ShopPage() {
  return (
    <section className="products">
      <h2>Featured Collection</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} name={product.name} price={product.price} />
        ))}
      </div>
    </section>
  );
}

export default ShopPage;
