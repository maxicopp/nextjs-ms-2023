import { useRef } from 'react';
import styles from './HomePage.module.css';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    console.log(enteredEmail, enteredFeedback);

    emailInputRef.current.value = '';
    feedbackInputRef.current.value = '';
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Your Email Address
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            ref={emailInputRef}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="feedback" className={styles.label}>
            Your Feedback
          </label>
          <textarea
            id="feedback"
            rows="5"
            className={styles.textarea}
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button className={styles.button}>Send Feedback</button>
      </form>
    </div>
  );
}

export default HomePage;
