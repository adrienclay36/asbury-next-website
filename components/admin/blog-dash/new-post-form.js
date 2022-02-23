import React, { useState, useContext} from 'react';
import { BlogContext } from './blog-store';
import { UserContext } from '../../../store/user-context';
import styles from './new-post-form.module.css';
import { useRouter } from 'next/router';
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
import { LoadingOverlay } from '@mantine/core';
const NewPostForm = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(true);
    const [adding, setAdding] = useState(false);
    const blogContext = useContext(BlogContext);
    const userContext = useContext(UserContext);
    


    const addPostHandler = async (e) => {
        setAdding(true);
        e.preventDefault();
        if(!title || !image || !userContext.firstName || !userContext.lastName || !content) {
            setError(true);
            return;
        }
        const author = `${userContext.firstName} ${userContext.lastName}`
        await blogContext.addPost(title, image, author, content, userContext.user.id);
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
      <div className="container w-11/12 lg:w-3/6 mt-12 p-4 border-2 rounded-lg shadow-md mb-40 relative">
        <LoadingOverlay visible={adding} />
        <form onSubmit={addPostHandler}>
          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="title" className="text-lg mb-2 font-semibold">
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              id="title"
              type="text"
              value={title}
              required
              maxLength="70"
            />
          </div>
          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="image" className="text-lg mb-2 font-semibold">
              Image Link
            </label>
            <input
              onChange={(e) => setImage(e.target.value)}
              className={styles.input}
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
              className={styles.input}
              id="content"
              type="text"
              value={content}
              required
            />
          </div>
          <button
            disabled={adding ? true : false}
            className="bg-emerald-900 px-4 py-2 rounded-md text-white font-semibold"
          >
            {adding ? <DualRingLoader /> : "Create Post"}
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPostForm;
