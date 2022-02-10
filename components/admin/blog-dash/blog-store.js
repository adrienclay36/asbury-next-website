import React, { useState, useEffect } from "react";
import axios from "axios";

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
const AdminBlogProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [query, setQuery] = useState("");
  const [modifying, setModifying] = useState(false);

  const getPosts = async () => {
    setNoData(false);
    setLoading(true);
    setPosts([]);
    try {
      const response = await axios.get(`/api/blog?page=${pageNumber}`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setLoading(false);
      isInitial = false;
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [pageNumber, modifying]);

  const getQueriedData = async () => {
    setLoading(true);
    setPosts([]);

    try {
      const response = await axios.get(`/api/blog/query?searchTerm=${query}`);
      setPosts(response.data.posts);
      if (response.data.status !== "ok") {
        setNoData(true);
      } else {
        setNoData(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {

    // Don't run on initial render
    if (!isInitial) {

      if(!query) {
        //  If query has changed and there is not a query, the user has backspaced or cleraed manually
        // In this case, get the books so something loads, otherwise it would stay empty
        getPosts();
        return;
      }
      // Wait until the user is done typing (or try)
      const timeout = setTimeout(getQueriedData, 500);

      // If user types, clear the timeout with cleanup function
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [query]);

  const increasePage = () => {
    setPageNumber(Math.min(totalPages, pageNumber + 1));
  };
  const decreasePage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const toggleModifying = () => {
    setModifying(!modifying);
  };


  const addPost = async (title, image, author, content) => {

    const newPost = {
      title,
      image,
      author,
      content,
    }
    try {
      const response = await axios.post("/api/blog/add", newPost);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  }



  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`/api/blog/${id}`);
      if (query) {
        await getQueriedData();
      } else {
        toggleModifying();
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  const updatePost = async (id, title, image, author, content) => {
    const postData = {
      title,
      image,
      author,
      content,
    };
    try {
      const response = await axios.post(`/api/blog/${id}`, postData);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
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

export default AdminBlogProvider;
