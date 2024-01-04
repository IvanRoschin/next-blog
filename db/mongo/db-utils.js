import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;

if (!URI) {
  throw new Error("Please add your Mongo URI to .env");
}

export async function connectDatabase() {
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
  } catch (error) {
    res.status(500).json({
      message: error.message || "Could not connect to database",
    });
  }

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return documents;
}
