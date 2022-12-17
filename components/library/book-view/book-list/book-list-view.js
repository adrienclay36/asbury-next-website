import React, { useContext } from "react";
import LibrarySkeletonGrid from "./library-skeleton-grid";
import BookListItem from "./book-list-item";
import { useMediaQuery } from "@mantine/hooks";
import { LibraryContext } from "../../../../store/library-store";
import BookTableView from "./book-table-view";
import BookItem from "../../../admin/library-dash/book-item";
import { UserContext } from "../../../../store/user-context";



const BookListView = ({ editing = false }) => {
  const libraryContext = useContext(LibraryContext);
  const mobileScreen = useMediaQuery("(max-width: 520px)");
  const userContext = useContext(UserContext);

  return (
    <div>
      {libraryContext.loading && <LibrarySkeletonGrid />}
      {libraryContext.noData && (
        <h1 className="text-lg text-center mt-4 font-semibold">
          No Data for that query...
        </h1>
      )}
      {!mobileScreen && !libraryContext?.loading && !libraryContext.noData && <BookTableView editing={editing} />}
      {mobileScreen && !userContext?.libraryPermissions && (
        <div className="container">
          {libraryContext.books.map((book) => (
            <BookListItem editing={editing} key={book.id} book={book} />
          ))}
        </div>
      )}
      {mobileScreen && userContext?.libraryPermissions && (
        <div className="container">
          {libraryContext.books.map((book) => (
            <BookItem key={book?.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookListView;
