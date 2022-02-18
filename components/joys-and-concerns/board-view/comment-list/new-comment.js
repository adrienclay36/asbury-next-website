import React, { useState } from 'react'
import DualRingLoader from '../../../dual-ring-loader/DualRingLoader';
import { addItemToTable } from '../../../../supabase-util';
import axios from 'axios';
const NewComment = ({setOpen, postID}) => {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [posting, setPosting] = useState(false);

    const addCommentHandler = async (e) => {
        setPosting(true);
        e.preventDefault();
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const ipaddress = ipResponse.data.ip;
        const newComment = {
            author: author,
            commentcontent: content,
            postid: postID,
            postdate: new Date(),
            ipaddress: ipaddress,
        }

        const { data, error } = await addItemToTable("comments", newComment);
        setPosting(false);
        cancelForm();
    }

    const cancelForm = () => {
        setOpen(false);
        setAuthor('');
        setContent('');
    }
  return (
    <div className="container w-11/12 lg:w-2/6 md:w-3/6 border-2 p-8 rounded-lg shadow-md mt-6">
      <form className="container w-full" onSubmit={addCommentHandler}>
        <div className="flex flex-col flex-1 mb-4">
          <label className="font-semibold mb-2 ml-1" htmlFor="name">
            Name
          </label>
          <input
            className="p-2 border-2 rounded-lg focus:outline-none active:outline-none"
            id="name"
            type="text"
            placeholder="Enter Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength="100"
            required
          />
        </div>
        <div className="flex flex-col flex-1 mb-4">
          <label className="font-semibold mb-2 ml-1" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="p-2 border-2 rounded-lg focus:outline-none active:outline-none"
            id="comment"
            type="text"
            placeholder="Comments are limited to 1000 characters"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength="1000"
            rows="5"
            required
          />
        </div>
        <div className="text-left">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg shadow-lg border-2 bg-seaFoam-600 text-white mr-4"
            disabled={posting ? true : false}
          >
            {posting ? <DualRingLoader /> : "Post"}
          </button>
          {!posting && (
            <button
              type="button"
              onClick={cancelForm}
              disabled={posting ? true : false}
              className="px-5 py-2 rounded-lg shadow-lg border-2 bg-gray-600 hover:bg-gray-800 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewComment