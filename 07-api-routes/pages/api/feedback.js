const { v4: uuidv4 } = require('uuid');
import fs from 'fs';
import path from 'path';

function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

function extractFeedbackData() {
  const filePath = buildFeedbackPath();
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;
    const id = uuidv4();

    const data = extractFeedbackData();

    data.push({ id, email, feedbackText });
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: { id, email, feedbackText },
    });
  } else {
    const data = extractFeedbackData();
    res.status(200).json({ feedback: data });
  }
}

export default handler;
