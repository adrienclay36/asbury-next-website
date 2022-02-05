import React from "react";

const BookListItem = ({ book }) => {
  const available = <span className="text-seaFoam-600">Available</span>;
  const checkedOut = <span className="text-red-300">Checked Out</span>;
  return (
    <>
      <div className="container flex flex-1 justify-between items-center py-4">
        <div>
          <h1 className="py-1">
            <span className="font-semibold">Title</span>: {book.title}
          </h1>
          <p className="py-1">
            <span className="font-semibold">Author</span>: {book.author}
          </p>
          <p className="py-1">
            <span className="font-semibold">Subject</span>: {book.subject}
          </p>
          <p className="py-2 font-semibold">
            {book.availability ? available : checkedOut}
          </p>
        </div>
        <div>
          <p>{book.deweyNumber}</p>
          <p>{book.authorCode}</p>
        </div>
      </div>
      <div className="h-0.5 w-full rounded-lg bg-gray-300 text-center mx-auto"></div>
    </>
  );
};

export default BookListItem;
