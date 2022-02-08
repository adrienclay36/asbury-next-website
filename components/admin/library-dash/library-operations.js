import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
const LibraryOperations = () => {
  return (
    <div className="container my-12">
      <div className="flex justify-center items-center w-full lg:w-1/6 md:w-1/6 mx-auto">
        <button
          onClick={() => router.push("/admin/blog-dashboard/new-book")}
          className="flex flex-1 justify-center items-center px-7 py-2 bg-green-600 text-white font-semibold uppercase rounded-lg"
        >
          <AiOutlinePlus size={25} className="mr-4" />
          <span className="mr-4">Create New</span>
        </button>
      </div>

    </div>
  );
};

export default LibraryOperations;
