import React, { useState, useContext, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart, FaSadTear } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { BiHappyBeaming } from "react-icons/bi";
import styles from "./post-item.module.css";
import { FrontPrayerContext } from "../main-board-store";
import { useRouter } from "next/router";
import { UserContext } from "../../../../store/user-context";
import { supabase } from "../../../../supabase-client";
import { Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getUser, getSignedUrl, getPublicUrl, downloadImage } from "../../../../supabase-util";
import SkeletonPost from "./skeleton-post";
const PostItem = ({ id, author, date, content, likes, type, user_id }) => {
  const [readMore, setReadMore] = useState(false);
  const [liveLikes, setLiveLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(false);
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(false);
  const [avatarURL, setAvatarURL] = useState("");
  const formatDate = new Date(date).toLocaleDateString("en-US", {
    timeZone: "America/Denver",
  });
  const prayerContext = useContext(FrontPrayerContext);
  const userContext = useContext(UserContext);
  const router = useRouter();
  const disableTooltip = useMediaQuery("(max-width: 900px)");

  let formatAuthor;
  if (author) {
    formatAuthor = author
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .replace("---", "-")
      .toLowerCase();
  } else {
    formatAuthor = "administrator";
  }

  const getUserHandler = useCallback(async () => {
    setLoadingUser(true);
    const userInfo = await getUser(user_id);
    setUser(userInfo);
    const userImage = await downloadImage(
      "avatars",
      userInfo.avatar_url
      );
      
      
      setAvatarURL(userImage ? userImage : "/images/default-2.png");
      
      setLoadingUser(false);
      
  }, [user_id]);

  useEffect(() => {
    if (user_id) {
      getUserHandler();
    }
  }, [user_id, getUserHandler]);

  const incrementLikeHandler = () => {
    if (localStorage.getItem(id)) {
      return;
    }
    setLiked(true);
    prayerContext.incrementLike(id);
    setLiveLikes(liveLikes + 1);
    setClicked(true);
    localStorage.setItem(id, 1);
  };

  const getCommentCount = useCallback(async () => {
    const { data, count } = await supabase
      .from("comments")
      .select("postid", { count: "exact" })
      .match({ postid: id });
    setCommentCount(count);
  },[id]);

  useEffect(() => {
    if (localStorage.getItem(id)) {
      setLiked(true);
    }
    getCommentCount();
  }, [getCommentCount, id]);

  const longContent = (
    <>
      <p>
        {!readMore && content.slice(0, 140) + "..."}
        {readMore && content}
      </p>

      <button
        className="mt-2 font-semibold text-gray-500 hover:underline"
        onClick={() => setReadMore(!readMore)}
      >
        {readMore ? "Hide" : "Read More"}
      </button>
    </>
  );

  const regularContent = <p>{content}</p>;

  const deletePostHandler = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this post? This cannot be undone"
    );
    if (confirmation) {
      prayerContext.deletePost(id);
    }
  };

  if(loadingUser) {
    return <SkeletonPost/>
  }

  return (
    <>
      <div
        className={`${styles.init} bg-gray-100 z-10 container w-full lg:w-3/6 md:w-5/6 border-2 px-6 lg:px-10 md:px-10 pt-10 mt-12 rounded-lg shadow-md`}
      >
        <div className="flex flex-1 justify-start items-center ">
          {avatarURL && !loadingUser ? (
            <div className={styles.init}>

            <Image
              loading="eager"
              src={avatarURL}
              height={60}
              width={60}
              alt={user.first_name}
              className="object-cover
              rounded-full"
              />
              </div>
          ) : (
            <Image
              src={"/images/default-2.png"}
              priority={true}
              alt="default user"
              height={50}
              width={50}
            />
          )}

          <div className="ml-4">
            {user ? <p className="font-semibold">{user.first_name} {user.last_name}</p> : <p className="font-semibold">{author}</p>}
            <p className="text-seaFoam-500">{formatDate}</p>
          </div>
        </div>
        <div className="p-4">
          {content.length > 140 ? longContent : regularContent}
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
            {liked && <FaHeart size={30} className="mr-4 text-red-800" />}
            <p className={`${clicked ? styles.like : ""} text-lg`}>
              {liveLikes}
            </p>
          </div>
          {type === "joy" ? (
            <BiHappyBeaming size={35} className="text-green-700" />
          ) : (
            <FaSadTear size={30} className="text-blue-900" />
          )}
        </div>
        <div className="flex flex-1 justify-between items-center">
          <button
            onClick={() =>
              router.push(`/joys-and-concerns/${formatAuthor}/${id}`)
            }
            className="p-4 mb-4 font-semibold text-seaFoam-500 hover:underline"
          >
            View Replies ({commentCount ? commentCount : 0})
          </button>
          {userContext.role === "admin" && userContext.socialPermissions && (
            <Tooltip
              disabled={disableTooltip}
              label="Delete this post if it violates community guidelines"
              position="bottom"
              placement="start"
            >
              <button
                onClick={deletePostHandler}
                className="cursor-pointer hover:underline text-seaFoam-500 font-semibold"
              >
                Delete Post
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
};

export default PostItem;
