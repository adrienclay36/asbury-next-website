import React, { useState, useContext} from 'react';
import { BlogContext } from './blog-store';
import { useRouter } from 'next/router';
import PageLoading from '../../PageLoading/PageLoading';
const NewPostForm = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(true);
    const [adding, setAdding] = useState(false);
    const blogContext = useContext(BlogContext);
    


    const addPostHandler = async (e) => {
        setAdding(true);
        e.preventDefault();
        if(!title || !image || !author || !content) {
            setError(true);
            return;
        }
        await blogContext.addPost(title, image, author, content);
        router.push("/admin/blog-dashboard");
    }


  return (
    <>
      <div className="text-center">
        <button
          onClick={() => router.push("/admin/blog-dashboard")}
          className="bg-emerald-900 px-4 py-2 text-white font-semibold rounded-lg shadow-md"
        >
          Back To All Posts
        </button>
      </div>
      <div className="container w-11/12 lg:w-3/6 mt-12 p-4 border-2 rounded-lg shadow-md mb-40">
        <form onSubmit={addPostHandler}>
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
              maxLength="70"
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
              maxLength="70"
              required
            />
          </div>
          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="image" className="text-lg mb-2 font-semibold">
              Image Link
            </label>
            <input
              onChange={(e) => setImage(e.target.value)}
              className="p-2"
              id="image"
              type="url"
              value={image}
              required
            />
          </div>
          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="content" className="text-lg mb-2 font-semibold">
              Contents
            </label>
            <textarea
              rows="15"
              onChange={(e) => setContent(e.target.value)}
              className="p-2"
              id="content"
              type="text"
              value={content}
              required
            />
          </div>
          {adding ? <PageLoading/> : <button className="bg-emerald-900 px-4 py-2 rounded-md text-white font-semibold">
            Create Post
          </button>}
        </form>
      </div>
    </>
  );
};

export default NewPostForm;
