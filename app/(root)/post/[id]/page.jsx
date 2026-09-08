import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getPostById } from "@/lib/actions/post.actions";
//import DeleteButton from "@/components/DeleteButton";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const { userId } = await auth();
  const isOwner = userId === post.authorId;

  return (
    <>
      <section className="bg-primary px-5 py-10">
        <div className="inline-block bg-black px-6 py-4 max-w-3xl">
          <h1 className="text-white font-extrabold text-2xl md:text-3xl uppercase">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image
              src={post.authorImage}
              alt={post.authorName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{post.authorName}</p>
              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          <span className="text-xs bg-black text-white px-3 py-1 rounded-full capitalize">
            {post.category}
          </span>
        </div>

        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-100 mb-6">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>

        <p className="text-gray-700 mb-6">{post.description}</p>

        <div className="prose max-w-none whitespace-pre-wrap text-gray-800 leading-relaxed">
          {post.content}
        </div>
 
        {/* {isOwner && (
          <div className="flex gap-3 mt-8">
            <Link
              href={`/post/${post._id}/edit`}
              className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary transition-colors"
            >
              Edit
            </Link>
            <DeleteButton id={post._id} />
          </div>
        )}  */}
      </section>
    </>
  );
}
