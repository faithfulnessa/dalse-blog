"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { uploadImage } from "@/lib/cloudinary";
import Post from "@/lib/models/post";

function toPlain(doc) {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    category: doc.category,
    image: doc.image,
    content: doc.content,
    authorId: doc.authorId,
    authorName: doc.authorName,
    authorImage: doc.authorImage,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

/**
 * Get all blog posts (homepage feed), newest first.
 * Optionally filter by a search query matching title, category, or description.
 */
export async function getAllPosts(query) {
  await connectToDatabase();

  const filter = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

  return posts.map(toPlain);
}

/**
 * Get a single blog post by id.
 */
export async function getPostById(id) {
  await connectToDatabase();

  const post = await Post.findById(id).lean();

  if (!post) return null;

  return toPlain(post);
}

/**
 * Get all blog posts belonging to the currently logged-in user.
 */
export async function getUserPosts() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  await connectToDatabase();

  const posts = await Post.find({ authorId: userId })
    .sort({ createdAt: -1 })
    .lean();

  return posts.map(toPlain);
}

/**
 * Create a new blog post.
 */
export async function createPost(formData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to create a post.");
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const content = formData.get("content");
  const imageFile = formData.get("image");

  if (!title || !description || !category || !content) {
    throw new Error("All fields are required.");
  }

  if (!imageFile || imageFile.size === 0) {
    throw new Error("An image is required.");
  }

  await connectToDatabase();

  const imageUrl = await uploadImage(imageFile);

  const newPost = await Post.create({
    title,
    description,
    category,
    content,
    image: imageUrl,
    authorId: user.id,
    authorName: user.fullName || user.username || "Anonymous",
    authorImage: user.imageUrl,
  });

  revalidatePath("/");
  revalidatePath("/profile");

  redirect(`/post/${newPost._id}`);
}

/**
 * Update an existing blog post. Only the original author may update it.
 */
export async function updatePost(id, formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to update a post.");
  }

  await connectToDatabase();

  const post = await Post.findById(id);

  if (!post) {
    throw new Error("Post not found.");
  }

  if (post.authorId !== userId) {
    throw new Error("You are not authorized to edit this post.");
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const content = formData.get("content");
  const imageFile = formData.get("image");

  if (!title || !description || !category || !content) {
    throw new Error("All fields are required.");
  }

  post.title = title;
  post.description = description;
  post.category = category;
  post.content = content;

  if (imageFile && imageFile.size > 0) {
    const imageUrl = await uploadImage(imageFile);
    post.image = imageUrl;
  }

  await post.save();

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath(`/post/${id}`);

  redirect(`/post/${id}`);
}

/**
 * Delete a blog post. Only the original author may delete it.
 */
export async function deletePost(id) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to delete a post.");
  }

  await connectToDatabase();

  const post = await Post.findById(id);

  if (!post) {
    throw new Error("Post not found.");
  }

  if (post.authorId !== userId) {
    throw new Error("You are not authorized to delete this post.");
  }

  await Post.findByIdAndDelete(id);

  revalidatePath("/");
  revalidatePath("/profile");

  redirect("/profile");
}
