import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const MainBlogContext = React.createContext({
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
});

let isInitial = true;
const MainBlogProvider = (props) => {
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
      try {
        const response = await axios.get(`/api/blog?page=${pageNumber}`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        console.log(response.data.totalPages);
        setLoading(false);
        isInitial = false;
      } catch (err) {
        console.log(err.message);
      }
    };


    useEffect(() => {
      getPosts();
    }, [pageNumber]);


    const getQueriedData = async () => {
      setLoading(true);
      setPosts([]);

      try {
        const response = await axios.get(
          `/api/blog/query?searchTerm=${query}`
        );
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

      // Don't run side effect on initial render
        if(!isInitial) {
          //  If query has changed and there is not a query, the user has backspaced or cleraed manually
          // In this case, get the books so something loads, otherwise it would stay empty

          if (!query) {
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
    };


  return (
    <MainBlogContext.Provider value={contextValue}>
        {props.children}
    </MainBlogContext.Provider>
  )
}

export default MainBlogProvider