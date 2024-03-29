import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import { NotificationContext } from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enteredEmail = emailInputRef.current.value;

    if (!emailPattern.test(enteredEmail)) {
      return;
    }

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter...',
      status: 'pending',
    });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data);

      notificationCtx.showNotification({
        title: 'Signed up!',
        message: 'Successfully registered for newsletter!',
        status: 'success',
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Signing up failed!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    }
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
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
