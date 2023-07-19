import { useRef, useState } from 'react';
import styles from './HomePage.module.css';

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  async function submitFormHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    if (!enteredEmail || !enteredFeedback) {
      return;
    }

    const response = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail, text: enteredFeedback }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      emailInputRef.current.value = '';
      feedbackInputRef.current.value = '';
    }
  }

  async function loadFeedbackHandler(event) {
    event.preventDefault();
    const response = await fetch('/api/feedback');
    const data = await response.json();
    setFeedbackItems(data.feedback);
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
      <hr />
      <button className={styles.button} onClick={loadFeedbackHandler}>
        Load Feedback
      </button>
      {feedbackItems.length > 0 && (
        <ul className={styles['feedback-list']}>
          {feedbackItems.map(({ id, email, feedbackText }) => (
            <li key={id}>
              {email} - {feedbackText}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
