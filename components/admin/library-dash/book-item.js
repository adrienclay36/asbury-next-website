import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  BsPencilSquare,
  BsTrash,
  BsToggleOff,
  BsToggleOn,
} from "react-icons/bs";
import { LibraryContext } from './library-admin-store';
const BookItem = ({ book, libraryPermissions }) => {
  const [available, setAvailable] = useState(book.availability);
  const libraryContext = useContext(LibraryContext);
  const router = useRouter();

  const toggleAvailableHandler = () => {
    libraryContext.toggleAvailable(book.id);
    setAvailable(!available);
  }

  const deleteBookHandler = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this item? This operation cannot be undone");
    if(confirmDelete) {
      libraryContext.deleteBook(book.id);
    }
  }

  const availableClass = 'text-green-700 font-semibold';
  const checkedOut = 'text-red-700 font-semibold'
 
  
  return (
    <>
      <div className="container p-4">
        <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-center lg:justify-between md:justify-between items-center">
          <div className="p-2 text-center lg:text-left md:text-left">
            <h1 className="text-lg font-semibold">{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.subject}</p>
            <h1>{book.deweynumber}</h1>
            <h1>{book.authorcode}</h1>
            <h1 className={available ? availableClass : checkedOut}>{available ? "Available" : "Checked Out"}</h1>
          </div>
          <div></div>
          <div>
            {libraryPermissions && <div>
              <button
              onClick={toggleAvailableHandler}
                className={`px-4 py-2 mx-1 mb-2 lg:mb-0 ${available ? 'bg-green-800' : 'bg-transparent border-2 border-gray-400'} text-white rounded-lg ${available ? 'hover:bg-green-900' : 'hover:bg-gray-200'}`}
              >
                {available ? (
                  <BsToggleOn className="text-white" />
                ) : (
                  <BsToggleOff className="text-gray-400" />
                )}
              </button>
              <button
                onClick={() =>
                  router.push(`/admin/library-dashboard/${book.id}`)
                }
                className="px-4 py-2 mx-1 mb-2 lg:mb-0 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
              >
                <BsPencilSquare className="text-white" />
              </button>
              <button className="px-4 py-2 mx-1 my-4 lg:my-0 md:my-0 bg-red-600 rounded-lg hover:bg-red-800">
                <BsTrash
                  onClick={deleteBookHandler}
                  className="text-white"
                />
              </button>
            </div>}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default BookItem;
