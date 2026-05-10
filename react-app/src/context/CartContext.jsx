import { createContext, useContext, useState, useEffect } from 'react';

/*
  CartContext provides cart state and actions to the whole app.

  Usage in any component:
    import { useCart } from '../context/CartContext';
    const { cartItems, addToCart, removeFromCart } = useCart();
*/

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load the cart from localStorage on first render so it survives page refreshes.
  // When the backend is ready, replace this with a GET /api/cart call.
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('si_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart to localStorage on every change.
  // When the backend is ready, replace this with a PUT /api/cart call.
  useEffect(() => {
    localStorage.setItem('si_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Product already in cart — just increase quantity
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  // Derived values — computed fresh on every render
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
