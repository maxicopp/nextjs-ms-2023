import { extractFeedbackData } from '.';

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const feedbackData = extractFeedbackData();
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(selectedFeedback ? 200 : 404).json({ feedback: selectedFeedback });
}

export default handler;
