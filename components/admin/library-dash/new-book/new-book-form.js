import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { LibraryContext } from "../library-admin-store";
const NewBookForm = () => {
  const libraryContext = useContext(LibraryContext);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [author, setAuthor] = useState("");
  const [deweyNumber, setDeweyNumber] = useState("");
  const [authorCode, setAuthorCode] = useState("");
  const [availability, setAvailability] = useState(true);
  const router = useRouter();
  const addBookHandler = (e) => {
    e.preventDefault();
    libraryContext.addBook(
      title,
      subject,
      author,
      deweyNumber,
      authorCode,
      availability
    );
  };
  return (
    <>
      <div className="text-center">
        <button
          onClick={() => router.push("/admin/library-dashboard")}
          className="bg-emerald-900 px-4 py-2 text-white font-semibold rounded-lg shadow-md"
        >
          Back To All Books
        </button>
      </div>
      <div className="container w-11/12 lg:w-3/6 mt-12 p-4 border-2 rounded-lg shadow-md mb-40">
        <form onSubmit={addBookHandler}>
          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="title" className="text-lg mb-2 font-semibold">
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="p-2"
              id="title"
              type="text"
              value={title}
              required
              maxLength="140"
            />
          </div>

          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="subject" className="text-lg mb-2 font-semibold">
              Subject
            </label>
            <input
              onChange={(e) => setSubject(e.target.value)}
              className="p-2"
              id="subject"
              type="text"
              value={subject}
              maxLength="140"
              required
            />
          </div>

          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="author" className="text-lg mb-2 font-semibold">
              Author
            </label>
            <input
              onChange={(e) => setAuthor(e.target.value)}
              className="p-2"
              id="author"
              type="text"
              value={author}
              maxLength="140"
              required
            />
          </div>

          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="authorCode" className="text-lg mb-2 font-semibold">
              Author Code
            </label>
            <input
              onChange={(e) => setAuthorCode(e.target.value)}
              className="p-2"
              id="authorCode"
              type="text"
              value={authorCode}
              maxLength="140"
              required
            />
          </div>

          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="deweyNumber" className="text-lg mb-2 font-semibold">
              Dewey Number
            </label>
            <input
              onChange={(e) => setDeweyNumber(e.target.value)}
              className="p-2"
              id="deweyNumber"
              type="text"
              value={deweyNumber}
              maxLength="140"
              required
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="mb-2">
              <label className="mx-2" htmlFor="available">
                Available
              </label>
              <input
                type="radio"
                id="available"
                name="availability"
                value={true}
                onChange={(e) => setAvailability(e.target.value)}
                checked
              />
            </div>
            <div className="mb-2">
              <label className="mx-2" htmlFor="unavailable">
                Checked Out
              </label>
              <input
                type="radio"
                id="unavailable"
                value={false}
                name="availability"
                onChange={(e) => setAvailability(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-emerald-900 px-4 py-2 rounded-md text-white font-semibold"
          >
            Create Post
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBookForm;
