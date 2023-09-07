import hashPassword from '../../../lib/auth';
import ConnectToDatabase from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: 'You must provide an email and password' });
    return;
  }

  const client = await ConnectToDatabase();
  const db = client.db();
  const hashedPassword = await hashPassword(password);

  const result = await db
    .collection('users')
    .insertOne({ email, password: hashedPassword });

  client.close();

  res.status(201).json({ message: 'User created!' });
}

export default handler;
