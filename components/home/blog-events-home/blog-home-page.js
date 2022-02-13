import React from "react";
import BlogItem from "./blog-item";
import PageLoading from '../../PageLoading/PageLoading';
import { useRouter } from 'next/router';
const BlogHomePage = ({ posts }) => {
  const router = useRouter();
  return (
    <section>
      <div className="border-r-4 w-full h-full shadow-md rounded-lg p-2">
        <h1 onClick={() => {router.push("/blog")}} className="cursor-pointer uppercase text-3xl text-center mb-2 border-b-2 py-2 pb-4">
          Blog
        </h1>
        {!posts && <PageLoading/>}
        {posts && <ul>
          {posts.map((post, index) => (
            <BlogItem key={post.id} id={post.id} title={post.title} content={post.postcontent} author={post.author} date={post.postdate} index={index} />
          ))}
        </ul>}
        
      </div>
    </section>
  );
};

export default BlogHomePage;