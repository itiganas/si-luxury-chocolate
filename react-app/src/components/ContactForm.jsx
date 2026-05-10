import { useState } from 'react';

// Comes from .env.development / .env.te1 / .env.production — do not hardcode this
const API_URL = import.meta.env.VITE_API_URL;

// Possible states the form can be in
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(STATUS.IDLE);

  function handleChange(event) {
    setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.LOADING);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      setStatus(STATUS.SUCCESS);
      setFields({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus(STATUS.ERROR);
    }
  }

  return (
    <section className="contact">
      <h2>Contact Us</h2>

      {status === STATUS.SUCCESS ? (
        <p className="form-feedback form-feedback--success">
          Thank you! We will get back to you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={fields.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={fields.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={fields.message}
            onChange={handleChange}
            required
          />

          {status === STATUS.ERROR && (
            <p className="form-feedback form-feedback--error">
              Something went wrong. Please try again.
            </p>
          )}

          <button className="btn" type="submit" disabled={status === STATUS.LOADING}>
            {status === STATUS.LOADING ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}
    </section>
  );
}

export default ContactForm;
