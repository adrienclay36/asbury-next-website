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


  useEffect(() => {
    if(newPost) {
      setPosts(prevPosts => {
        return [newPost, ...prevPosts];
      })
      setNewPost(null);
    }
  }, [newPost])

  useEffect(() => {
    getPosts();
  }, [pageNumber])

  useEffect(() => {
    if(!posting) {
      const prayerSub = supabase.from('prayers').on('INSERT', (payload) => setNewPost(payload.new)).subscribe();
      return () => supabase.removeSubscription(prayerSub);
    }
    
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
    }
  return (
    <FrontPrayerContext.Provider value={contextValue}>
      {props.children}
    </FrontPrayerContext.Provider>
  )
}

export default FrontPrayerContextProvider;