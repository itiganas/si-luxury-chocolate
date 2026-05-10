function OrderPage() {
  return (
    <section className="contact">
      <h2>Place an Order</h2>
      <form>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <input type="text" placeholder="Delivery Address" />
        <textarea placeholder="Special instructions (optional)" />
        <button className="btn" type="submit">Submit Order</button>
      </form>
    </section>
  );
}

export default OrderPage;
