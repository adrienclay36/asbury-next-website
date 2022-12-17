import React from "react";

import styles from "./book-list/book-table-view.module.css";
import { CircleX, CircleCheck } from "tabler-icons-react";
import { ExcelBook } from "../../../types/excel-book";
const libraryColumns = [
  "Dewey Number",
  "Author",
  "Availability",
  "Author Name",
  "Title",
  "Subject",
];

interface Props {
  books: ExcelBook[];
  updatedOn: string;
}

const HTMLBookView: React.FC<Props>= ({ books, updatedOn }) => {

  return (
    <>
      <div>
        <p className="text-md lg:text-xl md:text-xl text-center my-6">
          Asbury Library Collection as of {updatedOn}
        </p>
        <p className="text-md text-center my-4 w-11/12 lg:w-4/6 md:w-4/6 mx-auto">
          Use Ctrl-F to search for any combination of words, numbers or letters
          in any column. Continue to push ‘ENTER’ to find all matches. Any item
          with “Checked Out” next to the author column is not available at this
          time. There are nearly 6,000 entries; being more specific will speed
          your search. If you have questions send them by e-mail to
          Librarian@asburyabq.org
        </p>
        <p className="text-md text-center my-4 w-11/12 lg:w-4/6 md:w-4/6 mx-auto">
          If the Dewey number begins with a capital &apos;L&apos;, that book is in large
          print. If the Dewey number begins with a capital &apos;S&apos;, that book is
          bilingual Spanish/English. Books on the UMW Reading Program have &apos;UMW&apos;
          in the subject column.
        </p>
      </div>
      <div className="flex flex-col mx-auto mt-12 w-11/12 lg:w-6/6 md:11/12">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {libraryColumns.map((column) => (
                      <th
                        className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        key={column}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book, index) => (
                    <TableRow book={book} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


interface TableRowProps {
  book: ExcelBook;
}
const TableRow: React.FC<TableRowProps> = ({ book }) => {
  const tableDataClass = `text-center pl-2 border-2 shadow-sm py-2 px-1 ${styles.fontSize}`;

  return (
    <>
      <tr>
        <td className={tableDataClass}>
          <p>{book?.DeweyNumber}</p>
        </td>
        <td
         className={tableDataClass}
        >
          <p>{book?.Author}</p>
        </td>
        <td className={tableDataClass}>
          {!book?.Borrower ? (
            <div className="flex flex-1 justify-center items-center">
              <CircleCheck size={12} color="green" />
              <p className="ml-2">Available</p>
            </div>
          ) : (
            <div className="flex flex-1 justify-center items-center">
              <CircleX size={15} color="red" />
              <p className="ml-2">Checked Out</p>
            </div>
          )}
        </td>
        <td className={tableDataClass}>
          <p>{book?.AuthorName}</p>
        </td>
        <td className={tableDataClass}>
          <p>{book?.Title}</p>
        </td>
        <td className={tableDataClass}>
          <p>{book?.Subject}</p>
        </td>
      </tr>
    </>
  );
};

export default HTMLBookView;
