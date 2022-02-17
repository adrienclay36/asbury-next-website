import React, { useState, useContext } from "react";
import { Select } from "@mantine/core";
import { FrontPrayerContext } from "./main-board-store";
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
const NewPrayerForm = ({ setOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({name: false, email: false, type: false, content: false});
  const [postingError, setPostingError] = useState(false);
  const prayerContext = useContext(FrontPrayerContext);

  
  const cancelForm = () => {
    setOpen(false);
    setName('');
    setEmail('');
    setType('');
    setContent('');
    setErrors({ name: false, email: false, type: false, content: false });
  }
  
  const addPostHandler = async (e) => {
    e.preventDefault();
    setPostingError(false);
    if(name && type && content) {
      const response = await prayerContext.addPost(name, email, type, content);
      if(response.status === "ok") {
        cancelForm();
      } else {
        setPostingError(true);
      }
      return;
    } 

    if(!name) {
      setErrors({...errors, name: true});
    }

    if(!type) {
      setErrors({...errors, type: true});
    }

    if(!content) {
      setErrors({...errors, content: true});
    }
  }
  
  return (
    <div className="container w-11/12 lg:w-2/6 md:w-3/6 border-2 p-8 rounded-lg shadow-md mt-6">
      <form className="container w-full" onSubmit={addPostHandler}>
        <div className="flex flex-col flex-1 mb-4">
          <label className="font-semibold mb-2 ml-1" htmlFor="name">
            Name <span className="text-red-800">*</span>
          </label>
          <input
            className="p-2 border-2 rounded-lg focus:outline-none active:outline-none"
            id="name"
            type="text"
            placeholder="Enter Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="100"
          />
        </div>

        <div className="flex flex-col flex-1 mb-4">
          <label className="font-semibold mb-2 ml-1" htmlFor="email">
            Email (Optional)
          </label>
          <input
            className="p-2 border-2 rounded-lg focus:outline-none active:outline-none"
            id="email"
            type="email"
            placeholder="Get Reply Notifications"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength="100"
          />
        </div>
        <div className="flex flex-col flex-1 mb-4">
          <Select
            error={errors.type && "You must pick one"}
            onChange={setType}
            label="Is this a joy or concern?"
            data={[
              { value: "joy", label: "Joy" },
              { value: "concern", label: "Concern" },
            ]}
            required
            maxLength="100"
          />
        </div>
        <div className="flex flex-col flex-1 mb-4">
          <label className="font-semibold mb-2 ml-1" htmlFor="type">
            Content <span className="text-red-800">*</span>
          </label>
          <textarea
            rows="10"
            className="focus:outline-none active:outline-none border-2 rounded-md p-2"
            required
            placeholder="Posts are limited to 1000 characters"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength="1000"
          />
        </div>
        <div className="text-left">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg shadow-lg border-2 bg-seaFoam-600 text-white mr-4"
            disabled={prayerContext.posting ? true : false}
          >
            {prayerContext.posting ? <DualRingLoader /> : "Post"}
          </button>
          {!prayerContext.posting && (
            <button
              type="button"
              onClick={cancelForm}
              disabled={prayerContext.posting ? true : false}
              className="px-5 py-2 rounded-lg shadow-lg border-2 bg-gray-600 hover:bg-gray-800 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPrayerForm;
