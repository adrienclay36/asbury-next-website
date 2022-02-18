import React, {useState, useEffect} from 'react';
import { supabase } from '../../../../supabase-client';
import PreviewComment from './preview-comment';
import { useRouter } from 'next/router';
const PreviewCommentsList = ({ postID, formatAuthor }) => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const router = useRouter();

  const getComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select()
      .match({ postid: postID })
      .order("id", { ascending: false });
    if (data.length > 0) {
      setComments(data);
    }
  };

  useEffect(() => {
    if (!posting) {
      getComments();
    }
  }, []);

  useEffect(() => {
    if (newComment) {
      setComments((prevComments) => {
        return [newComment, ...prevComments];
      });
      setNewComment(null);
    }
  }, [newComment]);

  useEffect(() => {
    if (!posting) {
      const commentSub = supabase
        .from("comments")
        .on("INSERT", (payload) => setNewComment(payload.new))
        .subscribe();
      return () => supabase.removeSubscription(commentSub);
    }
  }, []);
  return (
    <div
      className={`border-b-2 border-r-2 border-l-2 -z-1 w-full lg:w-3/6 md:w-5/6 rounded-br-lg rounded-bl-lg`}
    >
      {comments.length > 0 &&
        comments.map((comment) => (
          <PreviewComment
            key={comment.id}
            author={comment.author}
            date={comment.postdate}
            content={comment.commentcontent}
          />
        ))}
        <div className="text-center">

      <button
        onClick={() => router.push(`/joys-and-concerns/${formatAuthor}/${postID}`)}
        className="p-4  font-semibold text-seaFoam-500 hover:underline"
        >
        View All Comments
      </button>
        </div>
    </div>
  );
}

export default PreviewCommentsList