import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useGetUser from '../../../hooks/useGetUser'
import Image from "next/image";
import styles from "./blog-post-item.module.css";
import SkeletonPost from "../../ui/skeleton-post";
import parse from 'html-react-parser';
const BlogPostItem = ({
  id,
  title,
  author,
  date,
  content,
  image,
  userID,
  i,
}) => {
  const router = useRouter();
  const formatDate = new Date(
    date.replace(/-/g, "/").replace(/T.+/, "")
  ).toLocaleDateString("en-US");
  const formatTitle = title
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace("---", "-")
    .toLowerCase();

  const { user, avatarURL, loadingUser} = useGetUser(userID);


  if(!avatarURL || !user) {
    return <SkeletonPost width={'w-full'}/>
  }


  const getPreviewText = (content) => {

    if(content.length < 150) {
      const firstCutoff = content.indexOf("</p>");
      const previewText = content.slice(0, firstCutoff + 4);
      return previewText;
    }

    if(content.length > 150) {
      const slicedContent = content.slice(0, 150) + '...</p>'
      return slicedContent;
    }

  }

  const formatAuthor = `${user.first_name} ${user.last_name}`


  

  

 


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
            <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-center lg:justify-start md:justify-start mb-4 lg:mb-0 md:mb-0 px-10 mt-2 items-center">
              <Image
              src={avatarURL ? avatarURL : '/images/default-2.png'}
              alt={'Admin'}
              width={25}
              height={25}
              className="object-cover rounded-full"
              />
              <p className="ml-0 lg:ml-4 md:ml-4 mt-4 lg:mt-0 md:mt-0 font-semibold text-seaFoam-600">
                {formatAuthor}
              </p>
            </div>
            <p className="uppercase font-semibold text-seaFoam-400 px-6 text-sm lg:text-md md:text-md">
              {formatDate}
            </p>
          </div>
        </div>
        <div className="h-0.5 w-3/6 rounded-lg bg-gray-200 mx-auto my-5"></div>
        <div className="px-10 pb-5">
          {content.length > 50 && parse(getPreviewText(content))}
          {content.length < 50 && parse(content)}
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
