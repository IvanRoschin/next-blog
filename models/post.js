import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  excerpt: {
    type: String,
    required: [true, "Excerpt is required!"],
  },
  text: {
    type: String,
    required: [true, "Text is required!"],
  },
  date: {
    type: Date,
    required: [true, "Date is required!"],
  },
  isFeatured: {
    type: Boolean,
  },
  image: {
    type: String,
    required: [true, "Image is required!"],
  },
  tag: { type: String, required: [true, "Tag is required!"] },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
