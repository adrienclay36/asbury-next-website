import React from "react";
import { useRouter } from "next/router";
import styles from "./blog-post-item.module.css";
const BlogPostItem = ({ id, title, author, date, content, image, i }) => {
  const formatDate = new Date(date.replace(/-/g, "/").replace(/T.+/, "")).toLocaleDateString("en-US");
  const formatTitle = title
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-").replace("---", "-")
    .toLowerCase();
  const router = useRouter();
  return (
    <div className={styles[`post-animation-${i}`]}>
      <div className={`border-2 shadow-lg w-11/12 lg:w-full md:w-full mx-auto`}>
        <img className={`object-cover w-full h-64`} src={image} />
        <div>
          <div className="pt-10 px-10 flex flex-1 justify-center lg:justify-between md:justify-between items-center">
            <h1 className={`text-2xl text-center lg:text-left md:text-center`}>
              {title}
            </h1>
          </div>
          <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-between items-center mt-3">
            <p className="px-10 mt-2 font-semibold text-seaFoam-400">
              {author}
            </p>
            <h1 className="uppercase font-semibold text-seaFoam-500 px-6">
              {formatDate}
            </h1>
          </div>
        </div>
        <div className="h-0.5 w-3/6 rounded-lg bg-gray-200 mx-auto my-5"></div>
        <div className="px-10 pb-5">
          <p>{content.length > 50 ? content.slice(0, 100) + "..." : content}</p>
        </div>
        <div className="flex justify-center lg:justify-end md:justify-end items-center p-4">
          <button
            onClick={() => router.push(`/blog/${id}/${formatTitle}`)}
            className="px-7 py-3 m-2 rounded-md bg-seaFoam-400 text-white uppercase font-semibold tracking-wide"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostItem;
