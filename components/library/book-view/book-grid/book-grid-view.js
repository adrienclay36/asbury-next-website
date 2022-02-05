import React from 'react';
import BookGridItem from './book-grid-item';
const BookGridView = ({ books }) => {
   
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12 lg:grid-cols-3">
      {books.map(book => (
          <BookGridItem key={book.id} book={book}/>
      ))}
    </div>
  );
};

export default BookGridView;
