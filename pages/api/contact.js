import { connectDatabase } from "@/db/mongo/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
      const db = client.db();
      const messagesCollection = db.collection("messages");
      const newMessage = {
        email,
        name,
        message,
      };

      const result = await messagesCollection.insertOne(newMessage);
      newMessage.id = result.insertedId;
      client.close();
      res
        .status(201)
        .json({ message: "Successfully stored message", data: newMessage });
    } catch (error) {
      if (client) {
        client.close();
      }
      res.status(500).json({ message: error.message || "Insert data error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
