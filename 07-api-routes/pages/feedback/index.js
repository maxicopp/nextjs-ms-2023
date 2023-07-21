import { useState } from 'react';
import { extractFeedbackData } from '../api/feedback';
import styles from './Feedback.module.css';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  async function loadFeedbackHandler(id) {
    const response = await fetch(`/api/${id}`);
    const data = await response.json();
    setFeedbackData(data.feedback);
  }

  return (
    <>
      <ul className={styles['feedback-list']}>
        {props.feedbackItems.map(({ id, email, feedbackText }) => (
          <li key={id}>
            <span className={styles.content}>
              {email} - {feedbackText}
            </span>
            <button onClick={loadFeedbackHandler.bind(null, id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
      {feedbackData && (
        <div className={styles['feedback-details']}>
          <h2>Feedback Details</h2>
          <p>
            <strong>Feedback ID:</strong> {feedbackData.id}
          </p>
          <p>
            <strong>Email:</strong> {feedbackData.email}
          </p>
          <p>
            <strong>Feedback:</strong> {feedbackData.feedbackText}
          </p>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const data = extractFeedbackData();

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
