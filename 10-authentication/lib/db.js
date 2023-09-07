import { MongoClient } from 'mongodb';

async function ConnectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  return client;
}

export default ConnectToDatabase;
