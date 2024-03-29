import React, { useContext, useState } from "react";
import BlogPostItem from "./blog-post-item";
import { AiOutlineSearch } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import SkeletonGrid from './skeleton-grid';
import { BlogContext } from '../../../store/blog-store';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
const BlogPostList = () => {
  const [query, setQuery] = useState('');
  const blogContext = useContext(BlogContext);
  
  const provideQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    blogContext?.setQuery(e.target.value);
    
  }
  
  const clearInput = () => {
    setQuery("");
    blogContext?.setNoData(false);
    blogContext?.getPosts();
  };

  const decreasePageHandler = () => {
    blogContext?.decreasePage();
    if (query) {
      setQuery("");
      blogContext?.setQuery("");
    }
  };

  const increasePageHandler = () => {
    blogContext?.increasePage();
    if (query) {
      setQuery("");
      blogContext?.setQuery("");
    }
  };

  if(blogContext?.posts !== undefined && blogContext?.posts.length > 0 && blogContext?.posts.length === 0) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="font-semibold text-xl">No Bulletins Yet!</p>
      </div>
    )
  }

  return (
    <section>
      <div className="container flex items-center justify-center mb-2">
        <div className="relative focus-within:text-seaFoam-400 lg:w-auto md:w-auto w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pl-1 mr-4">
            {query.length === 0 && <AiOutlineSearch />}
            {query.length > 0 && (
              <BsX onClick={clearInput} className="cursor-pointer" size={20} />
            )}
          </span>
          <input
            className="px-4 py-2 w-full lg:w-96 md:w-96 mx-auto border-2 rounded-md focus:outline-none outline-none active:outline-none border-seaFoam-500"
            value={query}
            onChange={provideQuery}
            type="text"
            placeholder="Start Typing to Search Posts"
          />
        </div>
      </div>
      <div className="flex flex-1 p-4 justify-between items-center container">
        <button
          onClick={decreasePageHandler}
          className="p-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowBackIos />
        </button>

        <button
          onClick={increasePageHandler}
          className="p-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
      {blogContext?.loading && <SkeletonGrid />}
      {blogContext?.noData && (
        <h1 className="text-lg text-center mt-4 font-semibold">
          No posts found...
        </h1>
      )}
      <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-12">
        {blogContext?.posts && blogContext?.posts.map((post, index) => (
          <BlogPostItem
            key={post.id}
            post={post}
            i={index}
          />
        ))}
      </div>

      <div className="flex flex-1 p-4 justify-center items-center">
        <button
          onClick={decreasePageHandler}
          className="p-4 border-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          onClick={increasePageHandler}
          className="p-4 border-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>

    </section>
  );
};

export default BlogPostList;
