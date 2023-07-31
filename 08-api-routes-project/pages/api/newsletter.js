import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URL);

    const db = client.db();

    const emailsCollection = db.collection('emails');

    const result = await emailsCollection.insertOne({
      email: userEmail,
    });

    console.log(result);

    client.close();

    console.log({ userEmail });
    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
