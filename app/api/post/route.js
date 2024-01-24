import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (request) => {
  try {
    await connectToDB();
    const posts = await Post.find({}).populate("creator");
    if (posts.length === 0) {
      return new Response("No any posts yet", { status: 404 });
    }
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Faild to fetch all posts", { status: 500 });
  }
};
