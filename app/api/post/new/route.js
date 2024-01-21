import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  const { userId, title, excerpt, text, date, isFeatured, image, tag } =
    await req.json();
  console.log("tag:", tag);

  try {
    await connectToDB();
    const newPost = new Post({
      creator: userId,
      title,
      excerpt,
      text,
      date,
      isFeatured,
      tag,
      image,
    });
    console.log("newPost", newPost);
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Faild to create a new post", { status: 500 });
  }
};
