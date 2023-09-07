import { MongoClient } from 'mongodb';

async function ConnectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
}

export default ConnectToDatabase;
