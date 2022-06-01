import React, { useContext, useState } from "react";
import { LibraryContext } from "../../../../store/library-store";
import styles from "./book-table-view.module.css";
const libraryColumns = [
  "Dewey Number",
  "Author",
  "Availability",
  "Author Name",
  "Title",
  "Subject",
];
import { CircleCheck, CircleX } from "tabler-icons-react";
import { Switch, Modal } from "@mantine/core";
import BookEditForm from "../../../admin/library-dash/book-edit-form/book-edit-form";
import { UserContext } from "../../../../store/user-context";
const BookTableView = ({ editing = false }) => {
  const libraryContext = useContext(LibraryContext);

  return (
    <>
      <div className="flex flex-col mx-auto mt-12 w-11/12 lg:w-6/6 md:11/12">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {libraryColumns.map((column) => (
                      <th
                        className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        key={column}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {libraryContext?.books.map((book) => (
                    <TableRow editing={editing} book={book} key={book.id} />
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

const TableRow = ({ book, editing = false }) => {
  const tableDataClass = `text-center pl-2 border-2 shadow-sm border-2 py-2 px-1 ${styles.fontSize}`;
  const adminRowClass = "hover:bg-gray-200 cursor-pointer";
  const userContext = useContext(UserContext);
  const libraryContext = useContext(LibraryContext);
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState(book?.availability);

  const toggleAvailableHandler = () => {
    libraryContext.toggleAvailable(book.id);
    setAvailable(!available);
  };

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        centered
        trapFocus={false}
      >
        <BookEditForm setOpen={setOpen} book={book} />
      </Modal>
      <tr
        key={book?.id}
        className={userContext?.libraryPermissions && editing && adminRowClass}
      >
        <td onClick={userContext?.libraryPermissions && editing ? () => setOpen(true) : () => {}} className={tableDataClass}>
          <p>{book?.deweynumber}</p>
        </td>
        <td onClick={userContext?.libraryPermissions && editing ? () => setOpen(true) : () => {}} className={tableDataClass}>
          <p>{book?.authorcode}</p>
        </td>
        {editing && (
          <td
            onClick={toggleAvailableHandler}
            className={`${tableDataClass} flex flex-1 justify-between items-center`}
          >
            <p>{available ? "Available" : "Checked Out"}</p>
            <Switch
              value={available}
              checked={available}
            />
          </td>
        )}
        {!editing && (
          <td className={tableDataClass}>
            {book?.availability ? (
              <div className="flex flex-1 justify-center items-center">
                <CircleCheck size={15} color="green" />
                <p className="ml-2">Available</p>
              </div>
            ) : (
              <div className="flex flex-1 justify-center items-center">
                <CircleX size={15} color="red" />
                <p className="ml-2">Checked Out</p>
              </div>
            )}
          </td>
        )}
        <td onClick={userContext?.libraryPermissions && editing ? () => setOpen(true) : () => {}} className={tableDataClass}>
          <p>{book?.author}</p>
        </td>
        <td onClick={userContext?.libraryPermissions && editing ? () => setOpen(true) : () => {}} className={tableDataClass}>
          <p>{book?.title}</p>
        </td>
        <td onClick={userContext?.libraryPermissions && editing ? () => setOpen(true) : () => {}} className={tableDataClass}>
          <p>{book?.subject}</p>
        </td>
      </tr>
    </>
  );
};

export default BookTableView;
