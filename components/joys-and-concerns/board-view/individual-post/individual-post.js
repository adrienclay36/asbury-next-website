import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaRegHeart, FaHeart, FaSadTear } from 'react-icons/fa';
import { BiHappyBeaming } from 'react-icons/bi';
import styles from './individual-post.module.css';
import { supabase } from '../../../../supabase-client';
const IndividualPost = ({ id, author, date, content, likes, type}) => {
  const [readMore, setReadMore] = useState(false);
  const [liveLikes, setLiveLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const formatDate = new Date(date).toLocaleDateString("en-US", {timeZone: "America/Denver"});



  const incrementLikeHandler = async () => {
    if(localStorage.getItem(id)) {
      return;
    }
    setLiked(true);
    setLiveLikes(liveLikes+1);
    setClicked(true);
    const { data, error } = await supabase.rpc("increment_like", {
      post_id: id,
    });
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
        className={` ${styles.init} container w-11/12 lg:w-3/6 md:w-5/6 border-2 px-6 lg:px-10 md:px-10 pt-10 mt-12 rounded-lg shadow-md`}
      >
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
          {regularContent}
        </div>
        <div className="flex flex-1 justify-between items-center px-4 mb-12">
          <div className="flex flex-1 items-center">
            {!liked && (
              <FaRegHeart
                onClick={incrementLikeHandler}
                className="mr-4 text-red-800 cursor-pointer"
                size={30}
              />
            )}
            {liked && <FaHeart size={30} className="mr-4 text-red-800" />}
            <p className={`${clicked ? styles.like : ''} text-lg`}>{liveLikes}</p>
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