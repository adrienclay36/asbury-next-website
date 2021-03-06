import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { LibraryContext } from "../../../../store/library-store";
import { TextInput } from "@mantine/core";
import AsburyButton from "../../../ui/AsburyButton";
import { showNotification } from "@mantine/notifications";
import { CircleCheck } from "tabler-icons-react";

const BookEditForm = ({ book, setOpen }) => {
  const libraryContext = useContext(LibraryContext);
  const [title, setTitle] = useState(book?.title);
  const [subject, setSubject] = useState(book?.subject);
  const [author, setAuthor] = useState(book?.author);
  const [deweyNumber, setDeweyNumber] = useState(book?.deweynumber);
  const [authorCode, setAuthorCode] = useState(book?.authorcode);
  const [loading, setLoading] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  const didValueChange = (initial, newValue) => {
    return initial !== newValue;
  };

  const updateBookHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await libraryContext.updateBook(
      book?.id,
      title,
      subject,
      author,
      deweyNumber,
      authorCode
    );
    showNotification({
      title: "Success!",
      message: "Book successfully updated.",
      icon: <CircleCheck size={30}/>,
      color: "green",
    })
  };

  const deleteBookHandler = async (e) => {
    e.preventDefault();
    const confirmDelete = confirm(
      "Are you sure you want to delete this item? This operation cannot be undone."
    );
    if (confirmDelete) {
      await libraryContext.deleteBook(book.id);
      showNotification({
        title: "Success!",
        message: "Book successfully deleted!",
        icon: <CircleCheck size={30}/>,
        color: "green",
      })
    } 
  };

  useEffect(() => {
    if(
      didValueChange(book?.title, title) ||
      didValueChange(book?.author, author) ||
      didValueChange(book?.authorcode, authorCode) ||
      didValueChange(book?.deweynumber, deweyNumber) ||
      didValueChange(book?.subject, subject)
    ) {
      setFormChanged(true);
    } else {
      setFormChanged(false);
    }
  }, [title, subject, author, deweyNumber, authorCode])

  return (
    <>
      <div className="">
        <form>
          <div className="flex flex-1 flex-col mb-8">
            <TextInput
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              id="title"
              type="text"
              value={title}
              required
              maxLength="140"
            />
          </div>

          <div className="flex flex-1 flex-col mb-8">
            <TextInput
              onChange={(e) => setSubject(e.target.value)}
              label="Subject"
              id="subject"
              type="text"
              value={subject}
              maxLength="140"
              required
            />
          </div>

          <div className="flex flex-1 flex-col mb-8">
            <TextInput
              onChange={(e) => setAuthor(e.target.value)}
              label="Author"
              id="author"
              type="text"
              value={author}
              maxLength="140"
              required
            />
          </div>

          <div className="flex flex-1 flex-col mb-8">
            <TextInput
              onChange={(e) => setAuthorCode(e.target.value)}
              label="Author Code"
              id="authorCode"
              type="text"
              value={authorCode}
              maxLength="140"
              required
            />
          </div>

          <div className="flex flex-1 flex-col mb-8">
            <TextInput
              onChange={(e) => setDeweyNumber(e.target.value)}
              label="Dewey Number"
              id="deweyNumber"
              type="text"
              value={deweyNumber}
              maxLength="140"
              required
            />
          </div>
          <div className="flex flex-1 justify-center items-center">
            <AsburyButton
              onClick={updateBookHandler}
              disabled={!formChanged}
              text="Update Book"
              loading={loading}
            />
          </div>
          <div className="flex flex-1 justify-center items-center mt-4">
            <AsburyButton
              onClick={deleteBookHandler}
              disabled={loading}
              color="bg-red-600"
              hoverColor="hover:bg-red-700"
              text="Delete Book"
              
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default BookEditForm;
