import { MongoClient } from "mongodb";

const connetcionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.djatngh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

if (!connetcionString) {
  throw new Error("Please add your Mongo connetcionData to next.config.js");
}

export async function connectDatabase() {
  const client = new MongoClient(connetcionString, {
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
