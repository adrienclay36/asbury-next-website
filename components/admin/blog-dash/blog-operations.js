import React, { useState, useEffect, useContext } from 'react';
import BlogList from './blog-list';
import { AiOutlinePlus } from 'react-icons/ai';
import { BlogContext } from './blog-store';
import { useRouter } from 'next/router';

const BlogOperations = () => {
    const blogContext = useContext(BlogContext);
    const router = useRouter();

  return (
    <div className="container my-12">
      <div className="flex justify-center items-center w-full lg:w-1/6 md:w-1/6 mx-auto">
        <button
          onClick={() => router.push("/admin/blog-dashboard/new-post")}
          className="flex flex-1 justify-center items-center px-7 py-2 bg-green-600 text-white font-semibold uppercase rounded-lg"
        >
          <AiOutlinePlus size={25} className="mr-4" />
          <span className="mr-4 tracking-normal lg:tracking-wide md:tracking-wide">
            Add Post
          </span>
        </button>
      </div>

      <BlogList />
    </div>
  );
};

export default BlogOperations;
