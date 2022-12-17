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
import { BulletinItem } from "../types/bulletin-item";

const PAGE_SIZE = 6;
const TABLE = "posts";

interface IBlogContext {
  posts?: BulletinItem[];
  pageNumber: number;
  totalPages: number;
  modifying: boolean;
  loading: boolean;
  noData: boolean;
  increasePage: () => void;
  decreasePage: () => void;
  setQuery: (query: string) => void;
  getPosts: () => void;
  setNoData: React.Dispatch<React.SetStateAction<boolean>>;
  deletePost: (id: string) => Promise<void>;
  addPost: (title: string, image: string, author: string, content: string, user_id: string) => Promise<void>;
  updatePost: (id: string, title: string, image: string, author:string, content: string) => Promise<void>
}

export const BlogContext = React.createContext<IBlogContext | null>(null);

let isInitial = true;

interface Props {
  children: React.ReactNode;
}
const BulletinProvider: React.FC<Props> = (props) => {
  const [posts, setPosts] = useState<BulletinItem[] | undefined>([]);
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
    setPosts(data as BulletinItem[]);
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
    if(data) {

      setPosts(data);
    }
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

  const addPost = async (title: string, image: string, author: string, content: string, user_id: string) => {
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

  const deletePost = async (id: string) => {
    await deleteItemFromTable(TABLE, id);
    if (query) {
      await callQueryFunction();
    } else {
      getPosts();
      initTotalPages();
    }
  };

  const updatePost = async (id: string, title: string, image: string, author: string, content: string) => {
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
    modifying: false,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BulletinProvider;
