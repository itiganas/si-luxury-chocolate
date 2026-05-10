import { useCart } from '../context/CartContext';

function BagPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="cart">
        <h2>Shopping Bag</h2>
        <p className="cart-empty">Your bag is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2>Shopping Bag</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>CHF {item.price}</p>
            </div>

            <div className="cart-item-actions">
              <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
              <span className="qty-value">{item.quantity}</span>
              <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <p className="cart-item-subtotal">CHF {item.price * item.quantity}</p>

            <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <button className="btn btn-outline" onClick={clearCart}>Clear Bag</button>
        <div className="cart-total">
          <span>Total</span>
          <strong>CHF {cartTotal}</strong>
        </div>
        <button className="btn">Checkout</button>
      </div>
    </section>
  );
}

export default BagPage;
