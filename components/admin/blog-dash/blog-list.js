import React, { useState } from "react";
import BlogItem from "./blog-item";
import { AiOutlineSearch } from "react-icons/ai";
import { BsX } from "react-icons/bs";
const BlogList = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useState("");
  const filterHandler = (e) => {
    setQuery(e.target.value);
    const newFilter = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.author.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.date.toString().includes(e.target.value)
      );
    });

    if (e.target.value === "") {
      setFilteredPosts([]);
    } else {
      setFilteredPosts(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredPosts([]);
    setQuery("");
  };
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
            onChange={filterHandler}
            type="text"
            placeholder="Start Typing to Search Posts"
          />
        </div>
      </div>

      {filteredPosts.length === 0 && (
        <div>
          {posts.map((post) => (
            <BlogItem key={post.id} post={post} />
          ))}
        </div>
      )}
      {filteredPosts.length > 0 && (
        <div>
          {filteredPosts.map((post) => (
            <BlogItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default BlogList;
