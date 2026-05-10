function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h4>Online Shop</h4>
          <a href="#">Terms of Delivery</a>
          <a href="#">Payment Info</a>
          <a href="#">Help & FAQ</a>
          <a href="#">Data Protection</a>
        </div>
        <div>
          <h4>My Account</h4>
          <a href="#">Overview</a>
          <a href="#">Address Book</a>
          <a href="#">Orders</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">Contact</a>
          <a href="#">Jobs</a>
          <a href="#">Media</a>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SI Luxury Chocolate</p>
        <p>All prices include VAT</p>
      </div>
    </footer>
  );
}

export default Footer;
