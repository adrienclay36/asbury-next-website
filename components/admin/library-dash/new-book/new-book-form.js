import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { LibraryContext } from "../../../../store/library-store";
import { LoadingOverlay } from "@mantine/core";
import { TextInput, Radio, RadioGroup } from "@mantine/core";
import DualRingLoader from "../../../dual-ring-loader/DualRingLoader";
import AsburyButton from "../../../ui/AsburyButton";

const NewBookForm = () => {
  const libraryContext = useContext(LibraryContext);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [author, setAuthor] = useState("");
  const [deweyNumber, setDeweyNumber] = useState("");
  const [authorCode, setAuthorCode] = useState("");
  const [availability, setAvailability] = useState("true");
  const [adding, setAdding] = useState(false);
  const router = useRouter();


 
  const addBookHandler = async (e) => {
    setAdding(true);
    e.preventDefault();
    await libraryContext.addBook(
      title,
      subject,
      author,
      deweyNumber,
      authorCode,
      availability
    );
    router.push("/admin/library-dashboard");
  };

  const optionChange = (e) => {
    setAvailability(e.target.value);
    console.log(e.target.value);
  }


  
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
      <div className="container w-11/12 lg:w-3/6 mt-12 p-4 border-2 rounded-lg shadow-md mb-40 relative">
        <LoadingOverlay
          visible={adding}
        />
        <form onSubmit={addBookHandler}>
          <div className="flex flex-1 flex-col mb-8">
            
            <TextInput
            label="Dewey Number"
            required
              onChange={(e) => setDeweyNumber(e.target.value)}
              id="deweyNumber"
              type="text"
              value={deweyNumber}
              maxLength="140"
              
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
              id="subject"
              type="text"
              label="Subject"
              value={subject}
              maxLength="140"
              required
            />
          </div>
          <RadioGroup className="mb-4" value={availability} onChange={setAvailability} label="Is this book available?" required>
            <Radio value="true" label="Yes"/>
            <Radio value="false" label="No"/>
          </RadioGroup>
          {/* <button
            type="submit"
            className="bg-emerald-900 px-4 py-2 rounded-md text-white font-semibold"
            disabled={adding ? true : false}
          >
            {adding ? <DualRingLoader /> : "Add Book"}
          </button> */}
          <AsburyButton margin="mt-2" loading={adding} text="Add Book" />
        </form>
      </div>
    </>
  );
};

export default NewBookForm;
