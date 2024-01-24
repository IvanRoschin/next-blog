import { connectToDB } from "@utils/database";
import Messages from "@models/messages";

export const POST = async (req) => {
  const { email, name, phone, text } = await req.json();

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
    console.log(error);
    return new Response("Faild to send a message", { status: 500 });
  }
};
