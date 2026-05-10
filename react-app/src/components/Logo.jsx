import { Link } from 'react-router-dom';

/*
  A chocolate bar icon with embossed "SI" initials, beside a two-line wordmark.
  The segment grid gives it a hand-crafted, artisanal feel.
*/
function Logo() {
  return (
    <Link to="/" className="logo-link">
      {/* Chocolate bar icon */}
      <svg
        className="logo-icon"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer bar shape */}
        <rect x="4" y="8" width="32" height="24" rx="3" fill="#8b5e3c" />

        {/* Segment lines — horizontal */}
        <line x1="4" y1="20" x2="36" y2="20" stroke="#fffaf5" strokeWidth="1.5" />

        {/* Segment lines — vertical */}
        <line x1="17" y1="8"  x2="17" y2="32" stroke="#fffaf5" strokeWidth="1.5" />
        <line x1="27" y1="8"  x2="27" y2="32" stroke="#fffaf5" strokeWidth="1.5" />

        {/* Small break notch at top center for a hand-snapped feel */}
        <path
          d="M17 8 L19 12 L21 8"
          stroke="#fffaf5"
          strokeWidth="1.2"
          fill="none"
          strokeLinejoin="round"
        />

        {/* Embossed "SI" monogram on the top-left segment */}
        <text
          x="10.5"
          y="17.5"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fontSize="7"
          fill="#fffaf5"
          opacity="0.7"
          letterSpacing="0.5"
        >
          SI
        </text>
      </svg>

      {/* Two-line wordmark */}
      <span className="logo-text">
        <span className="logo-name">SI Luxury</span>
        <span className="logo-tagline">Chocolate</span>
      </span>
    </Link>
  );
}

export default Logo;
