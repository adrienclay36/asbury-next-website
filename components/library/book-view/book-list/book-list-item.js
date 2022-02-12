import React from "react";

const BookListItem = ({ book }) => {
  const available = <span className="text-seaFoam-600">Available</span>;
  const checkedOut = <span className="text-red-300">Checked Out</span>;
  return (
    <>
      <div className="container flex flex-1 flex-col-reverse lg:flex-row md:flex-row text-center lg:text-left md:text-left justify-between items-center py-4">
        <div>
          <h1 className="py-3 lg:py-1 md:py-1">
            <span className="font-semibold">Title</span>: {book.title}
          </h1>
          <p className="py-3 lg:py-1 md:py-1">
            <span className="font-semibold">Author</span>: {book.author}
          </p>
          <p className="py-3 lg:py-1 md:py-1">
            <span className="font-semibold">Subject</span>: {book.subject}
          </p>
          <p className="py-3 lg:py-2 md:py-2 font-semibold">
            {book.availability ? available : checkedOut}
          </p>
        </div>
        <div>
          <p className="py-2 lg:py-0 md:py-0">
            <span className="lg:hidden md:hidden sm:flex font-semibold">
              Dewey #:
            </span>{" "}
            {book.deweynumber}
          </p>
          <p className="py-2 lg:py-0 md:py-0">
            <span className="lg:hidden md:hidden sm:flex font-semibold">
              Author Code:
            </span>{" "}
            {book.authorcode}
          </p>
        </div>
      </div>
      <div className="h-0.5 w-full rounded-lg bg-gray-300 text-center mx-auto"></div>
    </>
  );
};

export default BookListItem;
