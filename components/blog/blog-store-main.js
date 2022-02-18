import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  getQueriedData,
  getTotalPages,
  getPagedDataByDate,
} from "../../supabase-util";

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

const PAGE_SIZE = 6;
const TABLE = "posts";

const MainBlogProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [query, setQuery] = useState("");

  const getPosts = useCallback(async () => {
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
  }, [pageNumber]);

  const initTotalPages = async () => {
    const totalPages = await getTotalPages(PAGE_SIZE, TABLE);
    setTotalPages(totalPages);
  };

  useEffect(() => {
    initTotalPages();
  }, []);

  useEffect(() => {
    getPosts();
  }, [pageNumber, getPosts]);

  const callQueryFunction = useCallback(async () => {
    setLoading(true);
    setPosts([]);
    const { data, status } = await getQueriedData(
      TABLE,
      query,
      "search_blog_fixed_ts"
    );

    setPosts(data);
    if (status !== "ok") {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setLoading(false);
  }, [query]);

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
  }, [query, callQueryFunction, getPosts]);

  const increasePage = () => {
    setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
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
  );
};

export default MainBlogProvider;
