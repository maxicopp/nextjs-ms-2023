import { extractFeedbackData } from '../api/feedback';
import styles from './Feedback.module.css';

function FeedbackPage(props) {
  return (
    <ul className={styles['feedback-list']}>
      {props.feedbackItems.map(({ id, email, feedbackText }) => (
        <li key={id}>
          {email} - {feedbackText}
        </li>
      ))}
    </ul>
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
