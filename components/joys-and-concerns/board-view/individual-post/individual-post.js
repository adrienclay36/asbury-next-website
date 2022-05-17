import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { FaRegHeart, FaHeart, FaSadTear } from 'react-icons/fa';
import { BiHappyBeaming } from 'react-icons/bi';
import styles from './individual-post.module.css';
import { supabase } from '../../../../supabase-client';
import { FrontPrayerContext } from '../main-board-store';
const IndividualPost = ({ id, author, date, content, likes, type, avatar_url}) => {
  const [readMore, setReadMore] = useState(false);
  const [liveLikes, setLiveLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const formatDate = new Date(date).toLocaleDateString("en-US", {timeZone: "America/Denver"});



  const incrementLikeHandler = async () => {
    if(localStorage.getItem(id)) {
      setLiked(false);
      setLiveLikes(liveLikes - 1);
      setClicked(false);
      await supabase.rpc("decrement_like", { post_id: id });
      localStorage.removeItem(id);
      return;
    }
    setLiked(true);
    setLiveLikes(liveLikes+1);
    setClicked(true);
    await supabase.rpc("increment_like", { post_id: id });
    localStorage.setItem(id, 1);

  }

  useEffect(() => {
    if(localStorage.getItem(id)) {
      setLiked(true);
    }
  }, [id])

  const regularContent = (
    <p>
    {content}
    </p>
  )
  return (
    <>
      <div
        className={` ${styles.init} z-10 container w-full lg:w-3/6 md:w-5/6 my-12 rounded-sm border-b-2 border-gray-200`}
      >
        <div className="flex flex-1 justify-start items-center ">
          <Image
            src={avatar_url}
            alt="default user"
            height={50}
            width={50}
            className={`object-cover
              rounded-full`}
          />
          <div className="ml-4">
            <p className="font-semibold">{author}</p>
            <p className="text-seaFoam-500">{formatDate}</p>
          </div>
        </div>
        <div className="p-4">{regularContent}</div>
        <div className="flex flex-1 justify-between items-center px-4 mb-12">
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
          {type === "joy" ? (
            <BiHappyBeaming size={35} className="text-green-700" />
          ) : (
            <FaSadTear size={30} className="text-blue-900" />
          )}
        </div>
      </div>
    </>
  );
}

export default IndividualPost;