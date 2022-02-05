import React from "react";

const BlogPostItem = ({ id, title, author, date, content, image }) => {
  const formatDate = date.toLocaleDateString("en-us");
  return (
    <div className="border-2 shadow-lgw-full mx-auto w-full">
      <img className="object-cover w-full h-64" src={image} />
      <div>
        <div className="pt-10 px-10 flex flex-1 justify-between items-center">
          <h1 className="text-2xl">{title}</h1>
          <h1 className="uppercase font-semibold text-seaFoam-500">
            {formatDate}
          </h1>
        </div>
        <p className="px-10 mt-2 font-semibold text-seaFoam-400">{author}</p>
      </div>
      <div className="h-0.5 w-64 rounded-lg bg-gray-200 mx-auto my-5"></div>
      <div className="px-10 pb-5">
        <p>{content.length > 50 ? content.slice(0,100)+"..." : content}</p>
      </div>
      <div className="flex justify-end items-center">
        <button className="px-7 py-3 m-2 rounded-md bg-seaFoam-400 text-white uppercase font-semibold tracking-wide">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogPostItem;
