function ProductCard({ name, price }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{price}</p>
      <button className="btn">Add to Bag</button>
    </div>
  );
}

export default ProductCard;
