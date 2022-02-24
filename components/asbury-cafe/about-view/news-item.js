import React from "react";

const NewsItem = ({
  title,
  author,
  image,
  authorImage,
  previewText,
  date,
  href,
}) => {
  return (
    <div>
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
              <img
                src={authorImage}
                alt={"Admin"}
                className="object-cover h-6 w-6 rounded-full"
              />
              <p className="ml-0 lg:ml-4 md:ml-4 mt-4 lg:mt-0 md:mt-0 font-semibold text-seaFoam-400">
                {author}
              </p>
            </div>
            <p className="uppercase font-semibold text-seaFoam-500 px-6">
              {date}
            </p>
          </div>
        </div>
        <div className="h-0.5 w-3/6 rounded-lg bg-gray-200 mx-auto my-5"></div>
        <div className="px-10 pb-5">
          <p>
            {previewText.length > 50
              ? previewText.slice(0, 100) + "..."
              : previewText}
          </p>
        </div>
        <div className="flex justify-center lg:justify-end md:justify-end items-center p-4">
          <a href={href} target="_blank" rel="noreferrer">
            <button className="px-7 py-3 m-2 rounded-md bg-seaFoam-400 text-white uppercase font-semibold tracking-wide">
              Read More
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
