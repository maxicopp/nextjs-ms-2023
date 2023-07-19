const { v4: uuidv4 } = require('uuid');
import fs from 'fs';
import path from 'path';

function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;
    const id = uuidv4();

    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    data.push({ id, email, feedbackText });
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: { id, email, feedbackText },
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;
