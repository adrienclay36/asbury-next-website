import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { LibraryContext } from "../../../../store/library-store";
import { TextInput } from "@mantine/core";
import AsburyButton from "../../../ui/AsburyButton";

const BookEditForm = ({ book, setOpen }) => {
  const libraryContext = useContext(LibraryContext);
  const [title, setTitle] = useState(book?.title);
  const [subject, setSubject] = useState(book?.subject);
  const [author, setAuthor] = useState(book?.author);
  const [deweyNumber, setDeweyNumber] = useState(book?.deweynumber);
  const [authorCode, setAuthorCode] = useState(book?.authorcode);
  const [adding, setAdding] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  const didValueChange = (initial, newValue) => {
    return initial !== newValue;
  };

  const updateBookHandler = async (e) => {
    e.preventDefault();
    setAdding(true);
    await libraryContext.updateBook(
      book?.id,
      title,
      subject,
      author,
      deweyNumber,
      authorCode
    );
    setOpen(false);
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
        <form onSubmit={updateBookHandler}>
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
            <AsburyButton disabled={!formChanged} text="Update Book" loading={adding} />
          </div>
        </form>
      </div>
    </>
  );
};

export default BookEditForm;
