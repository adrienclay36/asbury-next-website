import React, { useState, useContext} from 'react';
import { BlogContext } from './blog-store';
import { UserContext } from '../../../store/user-context';
import styles from './new-post-form.module.css';
import { useRouter } from 'next/router';
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
import { LoadingOverlay } from '@mantine/core'
import CKEditorConfig from './ck-editor-config';
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
        if(!title || !userContext.firstName || !userContext.lastName || !content) {
            setError(true);
            setAdding(false);
            return;
        }
        const author = `${userContext.firstName} ${userContext.lastName}`
        let imageContent;
        if(image) {
          imageContent = image;
        } else {
          imageContent = "/images/blog-default.png"
        }
        await blogContext.addPost(title, imageContent, author, content, userContext.user.id);
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
          <div className="flex flex-1 flex-col mb-4">
            <label htmlFor="title" className="text-lg mb-2 font-semibold">
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder="Add a title"
              id="title"
              type="text"
              value={title}
              required
              maxLength="70"
            />
          </div>
          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="image" className="text-lg font-semibold">
              Image Link
            </label>
            <p className="text-sm text-gray-500 font-semibold mb-2">Leave this blank to use the default blog image</p>
            <input
              onChange={(e) => setImage(e.target.value)}
              className={styles.input}
              placeholder="http://www.unsplash.com is a good place to find free stock images"
              id="image"
              type="url"
              value={image}
            />
          </div>
          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="content" className="text-lg mb-2 font-semibold">
              Contents
            </label>

            <CKEditorConfig setContent={setContent}/>
            

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
