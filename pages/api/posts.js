import { connectDatabase, insertDocument } from "@/db/mongo/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, postText } = req.body;
    if (!title || title.trim() === "" || !postText || postText.trim() === "") {
      res.status(422).json({ message: "Invalid data" });
      return;
    }
    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Connecting to database faild" });
    }
    try {
      await insertDocument(client, "posts", {
        title: title,
        postText: postText,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: error.message || "Insert data error" });
    }
    res.status(201).json({ message: "Signed Up!" });
  }
}
