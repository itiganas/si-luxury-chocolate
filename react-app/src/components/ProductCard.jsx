import { useCart } from '../context/CartContext';

function ProductCard({ id, name, price, image }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img className="card-image" src={image} alt={name} />
      <h3>{name}</h3>
      <p>CHF {price}</p>
      <button className="btn" onClick={() => addToCart({ id, name, price, image })}>
        Add to Bag
      </button>
    </div>
  );
}

export default ProductCard;
