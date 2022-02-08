import React from 'react';
import { useRouter } from 'next/router';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
const BookItem = ({ book }) => {
  return (
    <>
      <div className="container p-4">
        <div className="flex flex-1 justify-between items-center">
          <div className="p-2">
            <h1 className="text-lg font-semibold">{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.subject}</p>
            <h1>{book.deweyNumber}</h1>
            <h1>{book.authorCode}</h1>
          </div>
          <div>
          </div>
          <div>
            <div>
              <button
                onClick={() => router.push(`/admin/library-dashboard/${book._id}`)}
                className="px-4 py-2 mx-1 mb-2 lg:mb-0 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
              >
                <BsPencilSquare className="text-white" />
              </button>
              <button
                className="px-4 py-2 mx-1 my-4 lg:my-0 md:my-0 bg-red-600 rounded-lg hover:bg-red-800"
              >
                <BsTrash className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default BookItem;
