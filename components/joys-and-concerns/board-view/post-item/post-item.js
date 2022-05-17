import React, { useState, useContext, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./post-item.module.css";
import { FrontPrayerContext } from "../main-board-store";
import { useRouter } from "next/router";
import { UserContext } from "../../../../store/user-context";
import { Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
const PostItem = ({ post }) => {
  const [readMore, setReadMore] = useState(false);
  const [liveLikes, setLiveLikes] = useState(post?.likes);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);

  const formatDate = new Date(post?.created_at).toLocaleDateString("en-US", {
    timeZone: "America/Denver",
  });
  const prayerContext = useContext(FrontPrayerContext);
  const userContext = useContext(UserContext);
  const router = useRouter();
  const disableTooltip = useMediaQuery("(max-width: 900px)");

  let formatAuthor;
  if (post?.author) {
    formatAuthor = post?.author
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .replace("---", "-")
      .toLowerCase();
  } else {
    formatAuthor = "administrator";
  }

  const goToPost = () => {
    router.push(`/joys-and-concerns/${formatAuthor}/${post?.id}`);
  };

  const incrementLikeHandler = () => {
    if (localStorage.getItem(post?.id)) {
      setLiked(false);
      setLiveLikes(liveLikes - 1);
      setClicked(false);
      prayerContext.decrementLike(post?.id);
      localStorage.removeItem(post?.id);
      return;
    }
    setLiked(true);
    prayerContext.incrementLike(post?.id);
    setLiveLikes(liveLikes + 1);
    setClicked(true);
    localStorage.setItem(post?.id, 1);
  };

  

  useEffect(() => {
    if (localStorage.getItem(post?.id)) {
      setLiked(true);
    }
  
  }, [post?.id]);

  const longContent = (
    <>
      <p>
        {!readMore && post?.postcontent.slice(0, 140) + "..."}
        {readMore && post?.postcontent}
      </p>

      <button
        className="mt-2 font-semibold text-gray-500 hover:underline"
        onClick={() => setReadMore(!readMore)}
      >
        {readMore ? "Hide" : "Read More"}
      </button>
    </>
  );

  const regularContent = <p>{post?.postcontent}</p>;

  const deletePostHandler = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this post? This cannot be undone"
    );
    if (confirmation) {
      prayerContext.deletePost(post?.id);
    }
  };

  const joyLabel = (
    <div className="bg-teal-600 px-4 py-1 rounded-full flex justify-center items-center ">
      <p className="text-white font-semibold">Joy</p>
    </div>
  );

  const concernLabel = (
    <div className="bg-cyan-700 px-4 py-1 rounded-full flex justify-center items-center ">
      <p className="text-white font-semibold">Concern</p>
    </div>
  );

  return (
    <>
      <div
        className={`${styles.init} z-10 container w-full lg:w-3/6 md:w-5/6 my-12 rounded-sm border-b-2 border-gray-200`}
      >
        <div className="flex flex-1 justify-start items-center ">
          <div className={styles.init}>
            <Image
              loading="eager"
              src={post?.avatar_url}
              height={60}
              width={60}
              alt={post?.author}
              className="object-cover
              rounded-full"
            />
          </div>

          <div className="ml-4">
            <p className="font-semibold">{post?.author}</p>

            <p className="text-seaFoam-500">{formatDate}</p>
          </div>
        </div>
        <div className="p-4">
          {post?.postcontent.length > 140 ? longContent : regularContent}
        </div>
        <div className="flex flex-1 justify-between items-center px-4">
          <div className="flex flex-1 items-center">
            {!liked && (
              <FaRegHeart
                onClick={incrementLikeHandler}
                className="mr-4 text-red-800 cursor-pointer"
                size={30}
              />
            )}
            {liked && (
              <FaHeart
                onClick={incrementLikeHandler}
                size={30}
                className="mr-4 text-red-800 cursor-pointer"
              />
            )}
            <p className={`${clicked ? styles.like : ""} text-lg`}>
              {liveLikes}
            </p>
          </div>
          {post.posttype === "joy" ? joyLabel : concernLabel}
        </div>
        <div className="flex flex-1 justify-between items-center">
          <button
            onClick={goToPost}
            className="p-4 mb-4 font-semibold text-seaFoam-500 hover:underline"
          >
            View Replies ({post?.comment_count})
          </button>
        </div>

        {userContext.role === "admin" && userContext.socialPermissions && (
          <div className="px-4 pb-2 flex flex-1 justify-center items-center">
            <Tooltip
              disabled={disableTooltip}
              label="Delete this post if it violates community guidelines"
              position="bottom"
              placement="center"
            >
              <button
                onClick={deletePostHandler}
                className="cursor-pointer hover:underline text-seaFoam-500 font-semibold"
              >
                Admin: Delete Post
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};

export default PostItem;
