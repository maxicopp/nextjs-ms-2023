import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-util';

async function handlePostRequest(req, res, db) {
  const { email, name, text } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !text ||
    text.trim() === ''
  ) {
    res.status(422).json({ message: 'Invalid input.' });
    client.close();
    return;
  }

  const eventId = req.query.eventId;

  const newComment = {
    email,
    name,
    text,
    eventId,
  };

  try {
    const result = await insertDocument(db, 'comments', newComment);
    newComment._id = result.insertedId.toString();

    res.status(201).json({ message: 'Comment added.', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Inserting comment failed.' });
  }
}

async function handleGetRequest(req, res, db) {
  try {
    const comments = await getAllDocuments(db, 'comments', { _id: -1 });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Getting comments failed.' });
  }
}

async function handler(req, res) {
  const client = await connectDatabase();

  if (req.method === 'POST') {
    try {
      await handlePostRequest(req, res, client);
    } catch (error) {
      res.status(500).json({ message: 'Connecting to database failed.' });
    }
  } else if (req.method === 'GET') {
    try {
      await handleGetRequest(req, res, client);
    } catch (error) {
      res.status(500).json({ message: 'Connecting to database failed.' });
    }
  }

  client.close();
}

export default handler;
