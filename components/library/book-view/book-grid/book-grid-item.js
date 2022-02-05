import React from 'react';

const BookGridItem = ({ book }) => {
  // const { deweyNumber, authorCode, author, title, subject, availability } = book;
  const available = <span className="text-seaFoam-600">Available</span>
  const checkedOut = <span className="text-red-300">Checked Out</span>;
  return (
    <div className="container border-2 p-4 shadow-md rounded-md text-center">
      <div className="h-20">
        <h1 className="text-lg uppercase text-center my-4 text-seaFoam-600">
          {book.title}
        </h1>
      </div>
      <hr />
      <p className="my-4 p-1 tracking-wide text-seaFoam-800 font-semibold">
        Author: {book.author}
      </p>
      <p className="my-4 p-1 tracking-wide text-seaFoam-800 font-semibold">
        Author Code: {book.authorCode}
      </p>
      <p className="my-4 p-1 tracking-wide text-seaFoam-800 font-semibold">
        Dewey #: {book.deweyNumber}
      </p>
      <p className="my-4 p-1 tracking-wide text-seaFoam-800 font-semibold">
        Subject: {book.subject}
      </p>
      <p className="my-4 p-1 tracking-wide text-seaFoam-800 font-semibold">
        Availability: {book.availability ? available : checkedOut}
      </p>
    </div>
  );
};

export default BookGridItem;
