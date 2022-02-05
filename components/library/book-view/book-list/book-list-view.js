import React from "react";
import BookListItem from "./book-list-item";
const BookListView = ({ books }) => {
  const available = <span className="text-seaFoam-600">Available</span>
  const checkedOut = <span className="text-red-300">Checked Out</span>;
  return (
    <div>
      <div className="flex flex-1 justify-between items-center">
        <h1 className="p-4 uppercase font-semibold">Book</h1>
        <div>
          <h1 className="px-4 uppercase font-semibold text-right">Dewey #</h1>
          <h1 className="px-4 uppercase font-semibold">Author Code</h1>
        </div>
      </div>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookListView;
