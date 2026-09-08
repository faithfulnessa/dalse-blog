import mongoose, { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true, index: true },
    authorName: { type: String, required: true },
    authorImage: { type: String, required: true },
  },
  { timestamps: true },
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
