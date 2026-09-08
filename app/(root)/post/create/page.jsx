import PostForm from '@/components/PostForm'
import { createPost } from '@/lib/actions/post.actions'
import React from 'react'

function page() {
  return (
  
    <>
      <section className="bg-primary px-5 py-10">
        <div className="inline-block bg-black px-6 py-4">
          <h1 className="text-white font-extrabold text-2xl md:text-3xl uppercase">
            Write a New Post
          </h1>
        </div>
      </section>

      <section>
         <PostForm  action ={createPost} submitLabel="Publish post"/> 
      </section>
    </>
  )
}

export default page
