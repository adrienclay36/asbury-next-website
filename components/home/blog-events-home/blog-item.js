import React from "react";
import Link from "next/link";
const BlogItem = ({ id, title, author, content, date, index }) => {
  const formatTitle = title
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace("---", "-")
    .toLowerCase();
  return (
    <li
      className={`${
        index !== 2 && "border-b-2"
      } mb-3 flex flex-col flex-1 py-2 px-4 mr-4 text-center lg:text-left md:text-left`}
    >
      {/* Author and Date */}
      <div className="flex flex-1 flex-col lg:flex-row md:flex-row m-4 justify-center lg:justify-start md:justify-start">
        <h1 className="uppercase font-semibold text-seaFoam-600 mb-2 lg:mb-0 md:mb-0">{title}</h1>
        <p className="lg:ml-4 md:ml-4 font-semibold text-seaFoam-400">{date}</p>
      </div>
      <p className="lg:ml-4 md:ml-4 mb-4 font-semibold text-gray-600">{author}</p>
      <p className="lg:ml-4 md:ml-4 text-gray-500 w-full">
        {content.length > 100 ? content.slice(0, 200) + "..." : content}
      </p>
      <Link href={`/blog/${id}/${formatTitle}`} passHref>
        <p className="lg:ml-4 md:ml-4 my-2 text-seaFoam-500 cursor-pointer">Read More</p>
      </Link>
    </li>
  );
};

export default BlogItem;
