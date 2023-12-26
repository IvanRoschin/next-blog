import clientPromise from "@lib/mongo";

let client;
let db;
let messages;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    messages = db.collection("messages");
  } catch (error) {
    throw new Error("Faild to stablish connection to database");
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" || // Fixed function invocation for trimming
      !message ||
      message.trim() === "" // Fixed function invocation for trimming
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    // Store to DB
    try {
      await init();
      const result = await messages.insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res
        .status(500)
        .json({ message: error.message || "Error storing message" });
    }
    res
      .status(201)
      .json({ message: "Successfully stored message", data: newMessage });
  }
}
