import React, { useContext } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { IoMdExit } from 'react-icons/io';
import { BlogContext } from "./blog-store";
import { useRouter } from 'next/router';
import Link from "next/link";
import parse from 'html-react-parser';
const BlogItem = ({ post, permitted }) => {
  const blogContext = useContext(BlogContext);
  const router = useRouter();

  const formatTitle = post.title
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace("---", "-")
    .toLowerCase();


  const deletePostHandler = (e) => {
    const response = confirm("Are you sure you want to delete this post? This operation cannot be undone");
    if(response) {
      blogContext.deletePost(post.id);
    }
  }

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
          <h1 className="uppercase font-semibold text-center lg:text-left md:text-left">
            {post.author}
          </h1>
        </div>
      </div>
      <div className="mt-4 lg:mt-0 md:mt-0">
        <Link href={`/blog/${post.id}/${formatTitle}`} passHref>
          <a target="_blank" rel="noreferrer">
          <button className="px-4 py-2 mx-1 mb-2 lg:mb-0 bg-cyan-700 text-white rounded-lg hover:bg-cyan-900">
            <IoMdExit className="text-white" />
          </button>
          </a>
        </Link>
        {permitted && <button
          onClick={() => router.push(`/admin/blog-dashboard/${post.id}`)}
          className="px-4 py-2 mx-1 mb-2 lg:mb-0 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
        >
          <BsPencilSquare className="text-white" />
        </button>}
        {permitted && <button
          onClick={deletePostHandler}
          className="px-4 py-2 mx-1 my-4 lg:my-0 md:my-0 bg-red-600 rounded-lg hover:bg-red-800"
        >
          <BsTrash className="text-white" />
        </button>}
      </div>
    </div>
  );
};

export default BlogItem;
