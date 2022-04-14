import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router';
import { LibraryContext } from '../../../../store/library-store';
import DualRingLoader from '../../../dual-ring-loader/DualRingLoader';
const BookEditForm = ({ book }) => {
     const libraryContext = useContext(LibraryContext);
     const [title, setTitle] = useState(book.title);
     const [subject, setSubject] = useState(book.subject);
     const [author, setAuthor] = useState(book.author);
     const [deweyNumber, setDeweyNumber] = useState(book.deweynumber);
     const [authorCode, setAuthorCode] = useState(book.authorcode);
     const [availability, setAvailability] = useState(book.availability);
     const [adding, setAdding] = useState(false);
     const router = useRouter();


     const updateBookHandler = async (e) => {
         e.preventDefault();
         setAdding(true);
         await libraryContext.updateBook(
           book.id,
           title,
           subject,
           author,
           deweyNumber,
           authorCode,
           availability
         );
         router.push("/admin/library-dashboard");
     }

     const optionChange = (e) => {
       setAvailability(e.target.value);
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
        <form onSubmit={updateBookHandler}>
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

          <div
            className="flex flex-1 flex-row mb-4"
            onChangeCapture={(e) => setAvailability(e.target.value)}
          >
            <div className="mb-2 mx-2">
              <label className="mx-2" htmlFor="available">
                Available
              </label>
              <input
                type="radio"
                id="available"
                name="availability"
                value={true}
                onChange={optionChange}
              />
            </div>
            <div className="mb-2">
              <label className="mx-2" htmlFor="unavailable">
                Checked Out
              </label>
              <input
                type="radio"
                id="unavailable"
                name="availability"
                value={false}
                onChange={optionChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-emerald-900 px-4 py-2 rounded-md text-white font-semibold"
            disabled={adding ? true : false}
          >
            {adding ? <DualRingLoader /> : "Update Book"}
          </button>
        </form>
      </div>
    </>
  );
}

export default BookEditForm;