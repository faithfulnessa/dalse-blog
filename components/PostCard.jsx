import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function PostCard({post}) {
  return (
   <>
   <div className="bg-white border border-black rounded-2xl p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center text-xs text-gray-500">
         <p>{formatDate(post.createdAt)}</p> 
      </div>

      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">{post.authorName}</p>
          <Link href={`/post/${post._id}`}>
            <h3 className="font-bold text-lg leading-tight line-clamp-2 hover:text-primary">
              {post.title}
            </h3>
          </Link>
        </div>
        <Image
          src={post.authorImage}
          alt={post.authorName}
          width={36}
          height={36}
          className="rounded-full object-cover shrink-0"
        /> 
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>

      <Link href={`/post/${post._id}`} className="block">
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gray-100">
           <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          /> 
        </div>
      </Link>

      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-500 capitalize">{post.category}</span>
        <Link
          href={`/post/${post._id}`}
          className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary transition-colors"
        >
          Details
        </Link>
      </div>
    </div>
   </>
  )
}

export default PostCard
