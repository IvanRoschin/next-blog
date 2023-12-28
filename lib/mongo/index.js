import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const options = {};

if (!URI) {
  throw new Error("Please add your Mongo URI to .env");
}

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    try {
      global._mongoClientPromise = client.connect();
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Could not connect to database" });
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
