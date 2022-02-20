import React, {useState, useContext} from "react";
import Image from "next/image";
import styles from './comment-item.module.css'
import { UserContext } from "../../../../store/user-context";
import { deleteItemFromTable } from "../../../../supabase-util";
import { supabase } from "../../../../supabase-client";
import { Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
const CommentItem = ({ comment, id}) => {
  const [readMore, setReadMore] = useState(false);
  const userContext = useContext(UserContext);
  const { author, commentcontent, postdate } = comment;
  const formatDate = new Date(comment.postdate).toLocaleDateString("en-US");
  const disableTooltip = useMediaQuery('(max-width: 900px)')
  


  const deleteCommentHandler = async () => {
    const confirmation = confirm("Are you sure you want to delete this comment? This cannot be undone.")
    if(confirmation){

      const response = await deleteItemFromTable('comments', id);
    }
  }

  const longContent = (
    <>
      <p className="m-4">
        {!readMore && commentcontent.slice(0, 140) + "..."}
        {readMore && commentcontent}
      </p>

      <button
        className="mt-2 font-semibold text-gray-500 hover:underline"
        onClick={() => setReadMore(!readMore)}
      >
        {readMore ? "Hide" : "Read More"}
      </button>
    </>
  );

  const regularContent = <p className="m-4">{commentcontent}</p>;
  return (
    <div
      className={`container ${styles.init} flex flex-1 flex-col border-2 my-4 p-6 lg:p-10 md:p-10 rounded-lg shadow-md w-11/12 lg:w-2/6 md:w-2/6 mx-auto`}
    >
      <div className="flex flex-1 justify-start items-center">
        <div className="flex flex-1 justify-start items-center">
          <Image
            src="/images/default-2.png"
            alt="Default Image"
            height={25}
            width={25}
          />
          <p className="font-semibold ml-4">{author}</p>
        </div>
        <div>
          <p className="text-seaFoam-400 font-semibold">{formatDate}</p>
        </div>
      </div>

      {commentcontent.length > 140 ? longContent : regularContent}

      {userContext.socialPermissions && userContext.role === "admin" && (
        <div className="flex flex-1 justify-end items-center">

        <Tooltip
          disabled={disableTooltip}
          label="Delete this post if it violates community guidelines"
          position="bottom"
          placement="start"
          >
          <button
            onClick={deleteCommentHandler}
            className="cursor-pointer hover:underline text-seaFoam-500 font-semibold"
            >
            Delete Post
          </button>
        </Tooltip>
            </div>
      )}
    </div>
  );
};

export default CommentItem;
