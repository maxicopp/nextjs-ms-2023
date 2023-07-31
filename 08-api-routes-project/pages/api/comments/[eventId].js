import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(process.env.MONGODB_URL);

  const db = client.db();

  if (req.method === 'POST') {
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

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const eventsCollection = db.collection('comments');

    const result = await eventsCollection.insertOne(newComment);
    console.log(result);

    newComment.id = result.insertedId.toString();

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [
      {
        id: 'c1',
        name: 'Max',
        text: 'A first comment!',
      },
      {
        id: 'c2',
        name: 'Manu',
        text: 'A second comment!',
      },
    ];

    res.status(200).json({ comments: dummyList });
  }

  client.close();
}

export default handler;
