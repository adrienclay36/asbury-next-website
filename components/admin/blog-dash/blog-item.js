import React, { useContext } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteBlogPost } from "../../../firebase-util";
import { BlogContext } from "./blog-store";
import { useRouter } from 'next/router';
const BlogItem = ({ post }) => {
  const blogContext = useContext(BlogContext);
  const router = useRouter();

  return (
    <div className="p-4 border-b-2 flex flex-1 flex-col lg:flex-row md:flex-row justify-center lg:justify-between md:justify-between items-center ">
      <div className="flex flex-1 flex-col lg:flex-row md:flex-row items-center justify-center lg:justify-start md:justify-start">
        <div className="flex justify-center items-center">

        <img
          className="h-24 w-24 lg:h-20 lg:w-20 md:h-20 md:w-20 object-cover mr-4 mb-5 lg:mb-0 md:mb-0"
          src={post.image}
          alt={post.title}
          />
          </div>
        <div>
          <h1 className="uppercase text-center lg:text-left md:text-left mb-4 lg:mb-0 md:mb-0 text-lg font-semibold w-auto mx-auto">
            {post.title}
          </h1>
          <h1 className="uppercase font-semibold text-center lg:text-left md:text-left">{post.author}</h1>
        </div>
      </div>
      <div>
        <button onClick={() => router.push(`/admin/blog-dashboard/${post.id}`)} className="px-4 py-2 mx-1 mb-2 lg:mb-0 bg-blue-600 text-white rounded-lg">
          <BsPencilSquare className="text-white" />
        </button>
        <button
          onClick={() => blogContext.deletePost(post.id)}
          className="px-4 py-2 mx-1 my-4 lg:my-0 md:my-0 bg-red-600 rounded-lg"
        >
          <BsTrash className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default BlogItem;
