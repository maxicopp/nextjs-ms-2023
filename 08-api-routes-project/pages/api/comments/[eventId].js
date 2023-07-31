import { MongoClient } from 'mongodb';

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
    return;
  }

  const eventId = req.query.eventId;

  const newComment = {
    email,
    name,
    text,
    eventId,
  };

  const commentsCollection = db.collection('comments');

  const result = await commentsCollection.insertOne(newComment);
  console.log(result);

  newComment.id = result.insertedId.toString();

  res.status(201).json({ message: 'Added comment.', comment: newComment });
}

async function handleGetRequest(req, res, db) {
  const commentsCollection = db.collection('comments');

  const comments = await commentsCollection.find().sort({ _id: -1 }).toArray();

  res.status(200).json({ comments });
}

async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db();

  if (req.method === 'POST') {
    await handlePostRequest(req, res, db);
  } else if (req.method === 'GET') {
    await handleGetRequest(req, res, db);
  }

  client.close();
}

export default handler;
