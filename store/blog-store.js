import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getPagedDataByDate,
  getTotalPages,
  getQueriedData,
  addItemToTable,
  deleteItemFromTable,
  updateItemInTable,
} from "../supabase-util";
import { supabase } from "../supabase-client";

const PAGE_SIZE = 6;
const TABLE = "posts";
export const BlogContext = React.createContext({
  posts: [],
  pageNumber: 0,
  totalPages: 0,
  modifying: false,
  loading: false,
  noData: false,
  increasePage: () => {},
  decreasePage: () => {},
  setQuery: () => {},
  getPosts: () => {},
  setNoData: () => {},
  deletePost: (id) => {},
  addPost: (title, image, author, content) => {},
  updatePost: (id, title, image, author, content) => {},
});

let isInitial = true;
const BulletinProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [query, setQuery] = useState("");

  const getPosts = async () => {
    setNoData(false);
    setLoading(true);
    setPosts([]);

    const data = await getPagedDataByDate(
      pageNumber,
      PAGE_SIZE,
      TABLE,
      "postdate"
    );
    setPosts(data);
    setLoading(false);
    isInitial = false;
  };

  const initTotalPages = async () => {
    const totalPagesInit = await getTotalPages(PAGE_SIZE, TABLE);
    console.log(totalPagesInit);
    setTotalPages(totalPagesInit);
  };

  useEffect(() => {
    initTotalPages();
  }, []);

  useEffect(() => {
    getPosts();
  }, [pageNumber]);

  const callQueryFunction = async () => {
    setLoading(true);
    setPosts([]);
    const { data, status } = await getQueriedData(
      TABLE,
      query,
      "search_blog_rpc"
    );
    setPosts(data);
    if (status !== "ok") {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Don't run side effect on initial render
    if (!isInitial) {
      //  If query has changed and there is not a query, the user has backspaced or cleraed manually
      // In this case, get the books so something loads, otherwise it would stay empty

      if (!query) {
        getPosts();
        return;
      }
      // Wait until the user is done typing (or try)
      const timeout = setTimeout(callQueryFunction, 500);

      // If user types, clear the timeout with cleanup function
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [query]);

  const increasePage = () => {
    if(totalPages === 0 || totalPages === 1) {
      return;
    }
    setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
  };
  const decreasePage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const addPost = async (title, image, author, content, user_id) => {
    const newPost = {
      title,
      image,
      author,
      postcontent: content,
      postdate: new Date().toLocaleDateString("en-US", {
        timeZone: "America/Denver",
      }),
      user_id,
    };
    await addItemToTable(TABLE, newPost);
  };

  const deletePost = async (id) => {
    await deleteItemFromTable(TABLE, id);
    if (query) {
      await callQueryFunction();
    } else {
      getPosts();
      initTotalPages();
    }
  };

  const updatePost = async (id, title, image, author, content) => {
    const postData = {
      title: title,
      author: author,
      image: image,
      postcontent: content,
    };
    const response = await updateItemInTable(TABLE, id, postData);
  };

  const contextValue = {
    posts: posts,
    pageNumber: pageNumber,
    totalPages: totalPages,
    increasePage: increasePage,
    decreasePage: decreasePage,
    loading: loading,
    setQuery: setQuery,
    getPosts: getPosts,
    noData: noData,
    setNoData: setNoData,
    deletePost: deletePost,
    addPost: addPost,
    updatePost: updatePost,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BulletinProvider;
