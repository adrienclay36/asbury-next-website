import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import { FaRegHeart, FaHeart, FaSadTear } from 'react-icons/fa';
import { BsX } from 'react-icons/bs';
import { BiHappyBeaming } from 'react-icons/bi';
import styles from './post-item.module.css';
import { FrontPrayerContext } from '../main-board-store';
import { useRouter } from 'next/router';
import { UserContext } from '../../../../store/user-context';
import { supabase } from '../../../../supabase-client';

const PostItem = ({ id, author, date, content, likes, type}) => {
  const [readMore, setReadMore] = useState(false);
  const [liveLikes, setLiveLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(false);
  const formatDate = new Date(date).toLocaleDateString("en-US", {timeZone:"America/Denver"});
  const prayerContext = useContext(FrontPrayerContext);
  const userContext = useContext(UserContext);
  const router = useRouter();

  const formatAuthor = author
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace("---", "-")
    .toLowerCase();



  const incrementLikeHandler = () => {
    if(localStorage.getItem(id)) {
      return;
    }
    setLiked(true);
    prayerContext.incrementLike(id);
    setLiveLikes(liveLikes+1);
    setClicked(true);
    localStorage.setItem(id, 1);

  }

  const getCommentCount = async () => {
    const { data, count } = await supabase.from('comments').select('postid', { count: 'exact'}).match({postid: id});
    setCommentCount(count);
  }

  useEffect(() => {
    if(localStorage.getItem(id)) {
      setLiked(true);
    }
    getCommentCount();
  }, [])


  const longContent = (
    <>
      <p>
        {!readMore && content.slice(0, 140) + "..."}
        {readMore && content}
      </p>

        <button className="mt-2 font-semibold text-gray-500 hover:underline" onClick={() => setReadMore(!readMore)}>
          {readMore ? "Hide" : "Read More"}
        </button>
    </>
  );

  const regularContent = (
    <p>
    {content}
    </p>
  )


  const deletePostHandler = async () => {
    const confirmation = confirm("Are you sure you want to delete this post? This cannot be undone");
    if(confirmation) {
      prayerContext.deletePost(id);
    }
  }


  
  return (
    <>
      <div
        className={`${styles.init} bg-gray-100 z-10 container w-full lg:w-3/6 md:w-5/6 border-2 px-6 lg:px-10 md:px-10 pt-10 mt-12 rounded-lg shadow-md`}
      >
        {userContext.role === "admin" && userContext.socialPermissions && <div className="flex flex-1 justify-end items-center">
          <BsX size={30} className="cursor-pointer" onClick={deletePostHandler}/>
        </div>}
        <div className="flex flex-1 justify-start items-center ">
          <Image
            src="/images/default-2.png"
            alt="default user"
            height={50}
            width={50}
          />
          <div className="ml-4">
            <p className="font-semibold">{author}</p>
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
        <button
          onClick={() =>
            router.push(`/joys-and-concerns/${formatAuthor}/${id}`)
          }
          className="p-4 mb-4 font-semibold text-seaFoam-500 hover:underline"
        >
          View Replies ({commentCount ? commentCount : 0})
        </button>
      </div>

    </>
  );
}

export default PostItem