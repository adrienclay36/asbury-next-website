import React, {useEffect, useState, useCallback, useContext} from 'react'
import { supabase } from '../../../../supabase-client';
import CommentItem from './comment-item';
import { Collapse } from '@mantine/core';
import NewComment from './new-comment';
import { UserContext } from '../../../../store/user-context';
import styles from './comment-list.module.css';
import NewUserComment from './new-user-comment.js';
let isInit = true;
const CommentList = ({ postID, user }) => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const userContext = useContext(UserContext);
  const prayerContext = useContext(UserContext);

  const getComments = useCallback(async () => {
    setLoadingComments(true);
    const { data } = await supabase.from('comments').select().match({postid: postID}).order('id', {ascending: false});
    if(data.length > 0) {

      setComments(data);
    }
    isInit = false;
    setLoadingComments(false);
  }, [postID])


  useEffect(() => {
      getComments();
  },[getComments])

  useEffect(() => {
    if (payload) {
      if (payload.eventType === "INSERT") {
        setComments((prevComments) => {
          const filtered = prevComments.filter(
            (prevComment) => prevComment.id !== payload.new.id
          );
          return [payload.new, ...filtered];
        });
      }

      if(payload.eventType === "DELETE") {
        setComments(prevComments => {
          const filtered = prevComments.filter(comment => comment.id !== payload.old.id);
          return filtered;
        })
      }
      
    }


    return () => setPayload(null);
  }, [payload]);

  useEffect(() => {

      const commentSub = supabase
        .from("comments")
        .on("*", (payloadItem) => setPayload(payloadItem))
        .subscribe();
      return () => supabase.removeSubscription(commentSub);
    
  }, []);


  return (
    <>
      <div className="text-center my-12">
        <button
          onClick={() => setOpen(!open)}
          className="px-5 py-2 rounded-lg shadow-lg border-2 bg-seaFoam-600 text-white"
        >
          {open ? "Close" : "Add Comment"}
        </button>
      </div>

      <Collapse in={open}>
        {userContext.role === "admin" || userContext.role === "user" ? <NewUserComment setOpen={setOpen} user={user} postID={postID}/> : <NewComment setOpen={setOpen} postID={postID} />}
      </Collapse>
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem key={comment.id} id={comment.id} comment={comment} />
        ))}
      {comments.length === 0 && !loadingComments && (
        <p
          className={`${styles.init} text-center my-12 text-lg font-semibold text-gray-400`}
        >
          No Comments Yet.. Add One Now!
        </p>
      )}
    </>
  );
}

export default CommentList