import React from "react";
import BookGridItem from "./book-grid-item";
import styles from './book-grid-view.module.css';
const BookGridView = ({ books }) => {
  return (
    <div className={`${styles.scroll} p-2`}>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12 lg:grid-cols-3">
        {books.map((book) => (
          <BookGridItem key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGridView;
