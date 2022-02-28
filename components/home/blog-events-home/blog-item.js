import React from "react";
import Link from "next/link";
import useGetUser from '../../../hooks/useGetUser';
import LibrarySkeleton from '../../library/book-view/book-list/library-skeleton';
import Image from "next/image";
import parse from 'html-react-parser';
const BlogItem = ({ id, title, author, content, date, index, user_id }) => {
  const formatTitle = title
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace("---", "-")
    .toLowerCase();
    

    const { user, avatarURL, loadingAvatar } = useGetUser(user_id);


    if(!avatarURL) {
      return (
        <>
      <LibrarySkeleton/>
      <LibrarySkeleton/>
        </>
      )
    }



  return (
    <li
      className={`${
        index !== 2 && "border-b-2"
      } mb-7 flex flex-col flex-1 py-2 px-4 mr-4 text-center lg:text-left md:text-left`}
    >
      {/* Author and Date */}
      <div className="flex flex-1 flex-col lg:flex-row md:flex-row m-4 justify-center lg:justify-start md:justify-start">
        <h1 className="uppercase font-semibold text-seaFoam-600 mb-2 lg:mb-0 md:mb-0">{title}</h1>
        <p className="lg:ml-4 md:ml-4 font-semibold text-seaFoam-400">{date}</p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-center lg:justify-start md:justify-start items-center mb-4 ml-0 lg:ml-4 md:ml-4">
        <Image src={avatarURL} height={25} width={25} className="object-cover rounded-full" alt={author}/>  
      <p className="lg:ml-4 md:ml-4 font-semibold text-gray-600">{author}</p>
      </div>
      <Link href={`/blog/${id}/${formatTitle}`} passHref>
      <div className="lg:ml-4 md:ml-4 text-gray-500 w-full cursor-pointer">
        {content.length > 100 ? parse(content.slice(0, 200)) : content}.....
      </div>
      </Link>
      <Link href={`/blog/${id}/${formatTitle}`} passHref>
        <p className="lg:ml-4 md:ml-4 my-2 text-seaFoam-500 cursor-pointer">Read More</p>
      </Link>
    </li>
  );
};

export default BlogItem;
