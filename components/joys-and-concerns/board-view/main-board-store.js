import React, {createContext, useState, useEffect, useCallback} from 'react'
import axios from 'axios';
import { addItemToTable, getPagedDataByDate, getTotalPages, getPagedDataByID, deleteItemFromTable } from '../../../supabase-util';
import { supabase } from '../../../supabase-client';


const TABLE = "prayers";
const PAGE_SIZE = 5;
let isInit = true;
export const FrontPrayerContext = createContext({
    posts: [],
    fetchPosts: () => {},
    addPost: (name, email, type, content) => {},
    addUserPost: (type, content, user_id) => {},
    deletePost: (id) => {},
    incrementLike: (postID) => {},
    setPayload: () => {},
    pageNumber: 0,
    loading: false,
    hasMore: false,
    pageLoading: false,
    posting: false,
    decrementLike: (postID) => {},

})

const FrontPrayerContextProvider = (props) => {
    const [loading, setLoading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [changed, setChanged] = useState(false);
    const [payload, setPayload] = useState();

    const toggleChange = () => {
      setChanged(!changed);
    }


    const getPosts = useCallback(async () => {
      if(isInit){

        setLoading(true);
      }
      const data = await getPagedDataByDate(pageNumber, PAGE_SIZE, TABLE, "created_at");
      
      setPosts(prevPosts => {
        return [...prevPosts, ...data];
      });
      setLoading(false);
      setPageLoading(false);
      isInit = false;
    }, [pageNumber]);


    const initTotalPages = async () => {
    const initPages = await getTotalPages(PAGE_SIZE, TABLE);
    setTotalPages(initPages);
  };


  useEffect(() => {
    initTotalPages();
  }, []);

  




  // Get posts for page 0 on initial load and all pageNumber changes after.
  useEffect(() => {
    getPosts();
  }, [pageNumber, getPosts]);

  useEffect(() => {


    if(payload){

      
      if (payload.eventType === "INSERT") {
        setPosts((prevPosts) => {
          const filtered = prevPosts.filter(
            (prevPost) => prevPost.id !== payload.new.id
          );
          return [payload.new, ...filtered];
        });
      }

      if(payload.eventType === "DELETE") {
        setPosts(prevPosts => {
          const filtered = prevPosts.filter(post => post.id !== payload.old.id);
          return filtered;
        })
      }


    }
    return () => setPayload(null);
  }, [payload]);

  useEffect(() => {
    const postSub = supabase
      .from("prayers")
      .on("*", (payloadItem) => setPayload(payloadItem))
      .subscribe();
    return () => supabase.removeSubscription(postSub);
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
      const postToAdd = {
        author: name,
        email,
        posttype: inputType,
        postcontent: content,
        ipaddress,
        notifications,
        created_at: new Date(),
      }
      const response = await addItemToTable(TABLE, postToAdd);
      
      setPosting(false);
      toggleChange();
      return response;
    }

    const incrementLike = async (postID) => {
      
      const { data, error } = await supabase.rpc("increment_like", {
        post_id: postID,
      });
      
      
    }

    const decrementLike = async (postID) => {
      const { data, error } = await supabase.rpc("decrement_like", {
        post_id: postID,
      });
      if(error) {
        console.log(error);
      }
    }


    const addUserPost = async (type, content, user_id) => {
      setPosting(true);

      let inputType = type;
      if (!type) {
        inputType = "joy";
      }
      const postToAdd = {
        posttype: inputType,
        postcontent: content,
        created_at: new Date(),
        user_id: user_id,
      };
      const response = await addItemToTable(TABLE, postToAdd);
      setPosting(false);
      toggleChange();
      return response;
    };


    const deletePost = async (id) => {
      // const { data: deleteCommentData , error: deleteCommentError } = await supabase.from('comments').delete().match({post_id: id });
      // if(error){
      //   console.log(
      //     "Error deleting comments for post:: ",
      //     deleteCommentError.message
      //   );
      // }
      const { data, error } = await supabase.from('prayers').delete().match({id: id });
      if(error){
        console.log("Error deleting posting:: ", error.message);
      }
    }



    const contextValue = {
        posts: posts,
        loading: loading,
        pageLoading: pageLoading,
        hasMore: hasMore,
        posting: posting,
        pageNumber: pageNumber,
        addPost: addPost,
        addUserPost: addUserPost,
        deletePost: deletePost,
        incrementLike: incrementLike,
        decrementLike,
        setPayload: setPayload,
    }
  return (
    <FrontPrayerContext.Provider value={contextValue}>
      {props.children}
    </FrontPrayerContext.Provider>
  )
};

export default FrontPrayerContextProvider;