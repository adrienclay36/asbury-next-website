import React from 'react'
import Image from 'next/image'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiHappyBeaming } from 'react-icons/bi';
const PostItem = ({ id, title, date, content, likes, type}) => {


  const incrementLikeHandler = () => {
    console.log("liked");
  }
  return (
    <>
      <div className="container w-full lg:w-3/6 md:w-5/6 border-2 px-10 pt-10 mt-12 rounded-lg shadow-md">
        <div className="flex flex-1 justify-start items-center ">
          <Image
            src="/images/default-2.png"
            alt="default user"
            height={50}
            width={50}
          />
          <div className="ml-4">
            <p className="font-semibold">Author</p>
            <p className="text-seaFoam-500">Date</p>
          </div>
        </div>
      <div className="p-4">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos
          tenetur laborum incidunt soluta itaque fugit, illo error quia aperiam
          doloremque odio earum similique modi enim labore commodi quisquam
          saepe. Sed ipsam perferendis rem corporis magnam...
        </p>
      </div>
      <div className="flex flex-1 justify-between items-center px-4">
        <div className="flex flex-1 items-center">
          <FaRegHeart onClick={incrementLikeHandler} className="mr-4 text-red-800 cursor-pointer" size={30}/>
          <p className="text-lg">12</p>
        </div>
        <BiHappyBeaming size={35} className="text-green-700"/>

      </div>
      <button className="p-4 font-semibold text-seaFoam-500 hover:underline">View Replies</button>
      </div>
    </>
  );
}

export default PostItem