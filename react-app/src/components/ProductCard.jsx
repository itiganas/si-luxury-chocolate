function ProductCard({ name, price, image }) {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <button className="btn">Add to Bag</button>
    </div>
  );
}

export default ProductCard;
