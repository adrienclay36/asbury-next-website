import React from 'react';

const AllPostItem = ({ id, title, author, date, content, image }) => {
    const formatDate = date.toLocaleDateString("en-US");
  return (
    <div className="border-2 w-11/12 lg:w-3/6 md:3/6 mx-auto mb-4">
      <img src={image} alt={title} className="w-full h-60 object-cover" />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 justify-between items-center">
          <h1 className="px-6 mt-6 text-2xl">{title}</h1>
          <p className="px-6 mt-6 text-lg uppercase font-semibold text-seaFoam-400 tracking-wide">
            {formatDate}
          </p>
        </div>
        <p className="px-6 mt-6 text-lg uppercase font-semibold text-seaFoam-400">
          Posted By: {author}
        </p>
        <p className="px-6 py-4">{content.length > 150 ? content.slice(0, 150) + "..." : content}</p>
      </div>
    </div>
  );
};

export default AllPostItem;
