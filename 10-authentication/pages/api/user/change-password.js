import { getSession } from 'next-auth/client';
import { ConnectToDatabase } from '../../../lib/db';
import { hashPassword, verifyPassword } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await ConnectToDatabase();

  const db = client.db();

  const user = await db.collection('users').findOne({ email: userEmail });

  if (!user) {
    client.close();
    return res.status(404).json({ message: 'User not found' });
  }

  const isValid = await verifyPassword(oldPassword, user.password);

  if (!isValid) {
    client.close();
    return res.status(403).json({ message: 'Invalid password' });
  }

  const hashedPassword = await hashPassword(newPassword);

  await db
    .collection('users')
    .updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

  client.close();

  return res.status(200).json({ message: 'Password changed successfully' });
}

export default handler;
