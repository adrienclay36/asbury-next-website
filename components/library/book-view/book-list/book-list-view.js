import React, { useContext } from "react";
import LibrarySkeletonGrid from "./library-skeleton-grid";
import BookListItem from "./book-list-item";
import styles from './book-list-view.module.css';
import { LibraryContext } from "../../../../store/library-store";

const BookListView = () => {
  const libraryContext = useContext(LibraryContext)

  return (
    <div>
      <div className="flex flex-1 hidden lg:flex md:flex justify-between items-center">
        <h1 className="p-4 uppercase font-semibold">Book</h1>
        <div>
          <h1 className="px-4 uppercase font-semibold text-right">Dewey #</h1>
          <h1 className="px-4 uppercase font-semibold">Author Code</h1>
        </div>
      </div>

      <div className={`${styles.scroll} border-2`}>
        {libraryContext.loading && <LibrarySkeletonGrid />}
        {libraryContext.noData && <h1 className="text-lg text-center mt-4 font-semibold">No Data for that query...</h1>}
        {libraryContext.books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookListView;
