function ContactForm() {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message" />
        <button className="btn" type="submit">Send</button>
      </form>
    </section>
  );
}

export default ContactForm;
