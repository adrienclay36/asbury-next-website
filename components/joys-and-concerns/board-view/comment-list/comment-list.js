import React, {useEffect, useState} from 'react'
import { supabase } from '../../../../supabase-client';
import CommentItem from './comment-item';
import { Collapse } from '@mantine/core';
import NewComment from './new-comment';
import PageLoading from '../../../PageLoading/PageLoading';
import styles from './comment-list.module.css';
let isInit = true;
const CommentList = ({ postID }) => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);

  const getComments = async () => {
    setLoadingComments(true);
    const { data } = await supabase.from('comments').select().match({postid: postID}).order('id', {ascending: false});
    if(data.length > 0) {

      setComments(data);
    }
    isInit = false;
    setLoadingComments(false);
  }


  useEffect(() => {
      getComments();
  },[])

  useEffect(() => {
    if (newComment) {
      setComments((prevComments) => {
        setNewComment(null);
        return [newComment, ...prevComments];
      });
      
    }
  }, [newComment]);

  useEffect(() => {

      const commentSub = supabase
        .from("comments")
        .on("INSERT", (payload) => setNewComment(payload.new))
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
        <NewComment setOpen={setOpen} postID={postID} />
      </Collapse>
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      {/* {loadingComments && <PageLoading/>} */}
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