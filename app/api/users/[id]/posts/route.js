import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Post.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    new Response("Faild to fetch all prompts", { status: 500 });
  }
};
