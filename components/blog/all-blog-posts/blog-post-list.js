import React, { useState } from "react";
import BlogPostItem from "./blog-post-item";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPower, BsX } from "react-icons/bs";
import styles from './blog-post-list.module.css';
const BlogPostList = ({ posts }) => {
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
            onChange={filterHandler}
            type="text"
            placeholder="Start Typing to Search Posts"
          />
        </div>
      </div>

      <div className={styles.scroll}>
        {filteredPosts.length === 0 && (
          <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-12">
            {posts.map((post) => (
              <BlogPostItem
                key={post.id}
                id={post.id}
                title={post.title}
                author={post.author}
                date={post.date}
                content={post.content}
                image={post.image}
              />
            ))}
          </div>
        )}

        {filteredPosts.length > 0 && (
          <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-12">
            {filteredPosts.map((post) => (
              <BlogPostItem
                key={post.id}
                id={post.id}
                title={post.title}
                author={post.author}
                date={post.date}
                content={post.content}
                image={post.image}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostList;
