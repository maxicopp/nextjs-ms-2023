import { MongoClient } from 'mongodb';

async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();
  const collection = db.collection('newsletter');
  const result = await collection.insertOne(document);
  return result;
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to database failed.' });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
    } catch (error) {
      res.status(500).json({ message: 'Inserting document failed.' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
    client.close();
  }
}

export default handler;
