import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header>
      <Logo />

      <nav>
        <Link to="/about">About</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>

        {/* Bag icon with item count badge */}
        <Link to="/bag" className="nav-bag-link" aria-label="Shopping Bag">
          <svg
            className="bag-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        {/* Show the user's Google avatar + name when logged in, otherwise a Login link */}
        {user ? (
          <div className="nav-user">
            {user.picture && (
              <img src={user.picture} alt={user.name} className="nav-avatar" />
            )}
            <span className="nav-user-name">{user.name}</span>
            <button className="nav-logout-btn" onClick={logout}>Log out</button>
          </div>
        ) : (
          <Link to="/login" className="nav-login-link">Log in</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
