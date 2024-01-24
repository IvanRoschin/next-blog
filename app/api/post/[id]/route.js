import { connectToDB } from "@utils/database";
import Post from "@models/post";

//GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate("creator");
    if (!post) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    new Response("Faild to fetch post", { status: 500 });
  }
};

//PATCH
export const PATCH = async (request, { params }) => {
  const { title, excerpt, text, date, isFeatured, image, tag } =
    await request.json();
  try {
    await connectToDB();
    const existingPost = await Post.findById(params.id).populate("creator");
    if (!existingPost) return new Response("Post not found", { status: 404 });

    existingPost.title = title;
    existingPost.excerpt = excerpt;
    existingPost.text = text;
    existingPost.date = date;
    existingPost.isFeatured = isFeatured;
    existingPost.image = image;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    new Response("Faild update Post", { status: 500 });
  }
};

//DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const existingPost = await Post.findByIdAndDelete(params.id).populate(
      "creator"
    );
    if (!existingPost) return new Response("Post not found", { status: 404 });

    return new Response("Post was succesfully deleted", { status: 200 });
  } catch (error) {
    new Response("Faild to delete Post", { status: 500 });
  }
};
