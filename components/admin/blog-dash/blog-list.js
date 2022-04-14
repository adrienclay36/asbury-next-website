import React, { useState, useContext } from "react";
import BlogItem from "./blog-item";
import { AiOutlineSearch } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { BlogContext } from "../../../store/blog-store";
import PageLoading from '../../PageLoading/PageLoading';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import { UserContext } from "../../../store/user-context";
const BlogList = () => {
  const [query, setQuery] = useState("");
  const blogContext = useContext(BlogContext);
  const userContext = useContext(UserContext);
  

  const provideQuery = (e) => {
    setQuery(e.target.value);
    blogContext.setQuery(e.target.value);
  };

  const clearInput = () => {
    setQuery("");
    blogContext.setNoData(false);
    blogContext.getPosts();
  };

  const decreasePageHandler = () => {
    blogContext.decreasePage();
    if(query) {
      setQuery("");
      blogContext.setQuery("");
    }
  }


  const increasePageHandler = () => {
    blogContext.increasePage();
    if(query) {
      setQuery("");
      blogContext.setQuery("");
    }
  }
  return (
    <>
      <div className="container flex items-center justify-center mt-8 mb-8 lg:mb-0 md:mb-0">
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
          className="p-2 mx-4 rounded-lg bg-emerald-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          onClick={increasePageHandler}
          className="p-2 mx-4 rounded-lg bg-emerald-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>

      <div>
        {blogContext.loading && <PageLoading />}
        {blogContext.noData && blogContext.posts.length === 0 && (
          <h1 className="text-center text-lg font-semibold mt-4 text-red-700">
            No posts found. Be sure to enter full names to search by names. (Case Insensitive)
          </h1>
        )}
        {blogContext.posts.map((post) => (
          <BlogItem key={post.id} post={post} permitted={userContext.blogPermissions}/>
        ))}
      </div>

      <div className="flex flex-1 p-4 justify-between items-center container">
        <button
          onClick={decreasePageHandler}
          className="p-2 mx-4 rounded-lg bg-emerald-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          onClick={increasePageHandler}
          className="p-2 mx-4 rounded-lg bg-emerald-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </>
  );
};

export default BlogList;
