import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios';
import { addItemToTable, getPagedDataByDate, getTotalPages, getPagedDataByID } from '../../../supabase-util';
import { supabase } from '../../../supabase-client';


const TABLE = "prayers";
const PAGE_SIZE = 5;
let isInit = true;
export const FrontPrayerContext = createContext({
    posts: [],
    fetchPosts: () => {},
    addPost: (name, email, type, content) => {},
    incrementLike: (postID) => {},
    setNewPost: () => {},
    pageNumber: 0,
    loading: false,
    hasMore: false,
    pageLoading: false,
    posting: false,

})

const FrontPrayerContextProvider = (props) => {
    const [loading, setLoading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [navigating, setNavigating] = useState(false);
    const [newPost, setNewPost] = useState();


    const getPosts = async () => {
      if(isInit){

        setLoading(true);
      }
      const data = await getPagedDataByDate(pageNumber, PAGE_SIZE, TABLE, "postdate");
      
      setPosts(prevPosts => {
        return [...prevPosts, ...data];
      });
      setLoading(false);
      setPageLoading(false);
      isInit = false;
    }


    const initTotalPages = async () => {
    const totalPages = await getTotalPages(PAGE_SIZE, TABLE);
    setTotalPages(totalPages);
  };


  useEffect(() => {
    initTotalPages();
  }, []);




  // Get posts for page 0 on initial load and all pageNumber changes after.
  useEffect(() => {
    getPosts();
  }, [pageNumber])



  useEffect(() => {
    if(newPost) {
      console.log("APPENDING POST");
      setPosts((prevPosts) => {
        setNewPost(null);
        return [newPost, ...prevPosts];
      })
    }
  }, [newPost])



  useEffect(() => {
      const postSub = supabase.from('prayers').on('INSERT', (payload) => setNewPost(payload.new)).subscribe();
  }, []);







  const scrollToEnd = () => {
    /*
    This function will set the pageNumber state variable + 1 so it will trigger
    A useEffect re-render above
    */
    if (pageNumber >= totalPages) {
      setLoading(false);
      setHasMore(false);
    } else {
      setPageLoading(true);
    }
    setPageNumber(pageNumber + 1);
  };

  if(typeof window !== "undefined") {

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        scrollToEnd();
      }
    };
  }






    const addPost = async (name, email, type, content) => {
      setPosting(true);
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const ipaddress = ipResponse.data.ip;
      const notifications = email ? true : false;
      let inputType = type;
      if(!type) {
        inputType = "joy"
      }
      const newPost = {
        author: name,
        email,
        posttype: inputType,
        postcontent: content,
        ipaddress,
        notifications,
        postdate: new Date(),
      }
      const response = await addItemToTable(TABLE, newPost);
      setPosting(false);
      return response;
    }

    const incrementLike = async (postID) => {
      const { data, error } = await supabase.rpc("increment_like", {
        postid: postID,
      });
    }



    const contextValue = {
        posts: posts,
        loading: loading,
        pageLoading: pageLoading,
        hasMore: hasMore,
        posting: posting,
        pageNumber: pageNumber,
        addPost: addPost,
        incrementLike: incrementLike,
        setNewPost: setNewPost,
    }
  return (
    <FrontPrayerContext.Provider value={contextValue}>
      {props.children}
    </FrontPrayerContext.Provider>
  )
}

export default FrontPrayerContextProvider;