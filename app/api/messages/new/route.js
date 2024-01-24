import { connectToDB } from "@utils/database";
import Messages from "@models/messages";

export const POST = async (req) => {
  const { email, name, phone, text } = await req.json();
  console.log("email", email);
  console.log("name", name);
  console.log("phone", phone);
  console.log("text", text);

  try {
    await connectToDB();
    const newMessage = new Messages({
      email,
      name,
      phone,
      text,
    });
    await newMessage.save();
    return new Response(JSON.stringify(newMessage), { status: 201 });
  } catch (error) {
    return new Response("Faild to send a message", { status: 500 });
  }
};
