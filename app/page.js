import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/actions/post.actions";
import { Search } from "lucide-react";
import Image from "next/image";

// Your dummy data
const dummyPosts = [
  {
    _id: "6a43df6a6aa9f560c37c99c5",
    title: "hhhhhhhhhhhhhhhh",
    description: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    category: "tech",
    image:
      "https://i.pinimg.com/474x/1f/3b/6a/1f3b6abbd12db406ab61b0815b783869.jpg",
    content: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    authorId: "user_3FqzuTHIQjafSv02gbLcs3wKDHY",
    authorName: "Akinola Ebitigha",
    authorImage:
      "https://img.magnific.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg",
    createdAt: "2026-06-30T15:23:22.670+00:00",
    updatedAt: "2026-06-30T15:23:22.670+00:00",
    __v: 0,
  },
  {
    _id: "6a43e59815c6c31609e8264b",
    title: "the girst blog we test now",
    description: "who am i",
    category: "travel",
    image:
      "https://img.magnific.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg",
    content: "i am editing the document now to test what is happening here ",
    authorId: "user_3FqzuTHIQjafSv02gbLcs3wKDHY",
    authorName: "Akinola Ebitigha",
    authorImage:
      "https://img.magnific.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg",
    createdAt: "2026-06-30T15:49:45.009+00:00",
    updatedAt: "2026-07-02T11:06:07.251+00:00",
    __v: 0,
  },
];

export default async function Home({ searchParams }) {
  const query = (await searchParams).query;
  const posts = await getAllPosts(query);

  return (
    <>
      {/* {JSON.stringify(posts, null, 2)} */}
      <section className="bg-black px-5 py-10 md:py-16 text-center dark:bg-white">
        <div className="max-w-3xl px-6 py-4 inline-block bg-white dark:bg-black">
          <header>
            <h1>Welcome to Dalse Blog</h1>
          </header>
        </div>
        <p className="text-white text-sm mt-4 max-w-xl mx-auto dark:text-black">
          Read post from community or share your own story!
        </p>
        <form action="/" className="max-w-md mx-auto mt-6">
          <div className="bg-white flex items-center rounded-full overflow-hidden border-white px-2 dark:bg-black">
            <input
              type="text"
              name="query"
              defaultValue={query}
              className="flex-1 px-4 py-3 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0"
            >
              <Search size={16} />
            </button>
          </div>
        </form>
        <p className="text-red-600">this is what are search ( {query} ) </p>
      </section>

      <section className="px-5 py-8 max-w-7xl mx-auto">
        <h2 className="font-bold text-xl mb-6">
          {query ? `Search results for "${query}"` : "All posts"}
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No posts found yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
              // <p>{post.authorName}</p>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
