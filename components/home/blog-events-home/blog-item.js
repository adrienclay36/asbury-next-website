import React from "react";
import Link from "next/link";
const BlogItem = ({ title, author, content, date }) => {
  return (
    <div className="border-b-2 mb-3 flex flex-col flex-1 py-2 px-4 mr-4">
      {/* Author and Date */}
      <div className="flex flex-1 m-4">
        <h1 className="uppercase font-semibold text-seaFoam-600">{title}</h1>
        <p className="ml-4 font-semibold text-seaFoam-400">{date}</p>
      </div>
      <p className="ml-4 mb-4 font-semibold text-gray-600">{author}</p>
      <p className="ml-4 text-gray-500 w-full">
        {content.length > 100 && content + "..."}
      </p>
      <Link href="/postid" passHref>
        <p className="ml-4 my-2 text-seaFoam-500 cursor-pointer">Read More</p>
      </Link>
    </div>
  );
};

export default BlogItem;
