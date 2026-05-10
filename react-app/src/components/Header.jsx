import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        SI Luxury Chocolate
      </Link>

      <nav>
        <Link to="/about">About</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/order">Order</Link>
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
        </Link>
      </nav>
    </header>
  );
}

export default Header;
