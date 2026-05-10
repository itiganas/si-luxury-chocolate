import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Validation rules for each field
function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) {
    errors.name = 'Name is required.';
  }
  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.message.trim()) {
    errors.message = 'Message is required.';
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

function ContactForm() {
  const [fields, setFields]   = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus]   = useState(STATUS.IDLE);

  const errors = validate(fields);

  // Mark a field as touched when the user leaves it, so we only show
  // its error message after they've had a chance to fill it in.
  function handleBlur(event) {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }));
  }

  function handleChange(event) {
    setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Mark all fields touched so every error becomes visible on submit
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(errors).length > 0) return;

    setStatus(STATUS.LOADING);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (!response.ok) throw new Error('Server error');

      setStatus(STATUS.SUCCESS);
      setFields({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus(STATUS.ERROR);
    }
  }

  if (status === STATUS.SUCCESS) {
    return (
      <section className="contact">
        <div className="contact-card">
          <div className="contact-success">
            <span className="contact-success-icon">✓</span>
            <h3>Message sent!</h3>
            <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
            <button className="btn" onClick={() => setStatus(STATUS.IDLE)}>
              Send another message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact">
      <div className="contact-card">
        <div className="contact-header">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you — whether it's a custom order, a question, or just to say hello.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name + Email side by side on wider screens */}
          <div className="contact-row">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Jane Doe"
                aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                className={touched.name && errors.name ? 'input-error' : ''}
              />
              {touched.name && errors.name && (
                <span id="name-error" className="field-error">{errors.name}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="jane@example.com"
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                className={touched.email && errors.email ? 'input-error' : ''}
              />
              {touched.email && errors.email && (
                <span id="email-error" className="field-error">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={fields.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about your order or question…"
              rows={5}
              aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
              className={touched.message && errors.message ? 'input-error' : ''}
            />
            {touched.message && errors.message && (
              <span id="message-error" className="field-error">{errors.message}</span>
            )}
          </div>

          {status === STATUS.ERROR && (
            <p className="form-feedback form-feedback--error">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            className="btn contact-submit-btn"
            type="submit"
            disabled={status === STATUS.LOADING}
          >
            {status === STATUS.LOADING ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
