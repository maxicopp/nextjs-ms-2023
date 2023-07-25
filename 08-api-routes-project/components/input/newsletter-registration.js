import { useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  function registrationHandler(event) {
    event.preventDefault();

    if (!isValidEmail) {
      return;
    }

    // TODO: send valid data to API
    console.log({ email });
  }

  function emailChangeHandler(event) {
    setEmail(event.target.value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(event.target.value));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            onChange={emailChangeHandler}
            value={email}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
