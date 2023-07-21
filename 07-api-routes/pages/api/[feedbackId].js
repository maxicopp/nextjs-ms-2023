import { extractFeedbackData } from './feedback';

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const feedbackData = extractFeedbackData();
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
