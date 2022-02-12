import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { BlogContext } from './blog-store';
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
const PostEditForm = ({post, id }) => {
    const [title, setTitle] = useState(post.title);
    const [author, setAuthor] = useState(post.author);
    const [content, setContent] = useState(post.postcontent);
    const [image, setImage] = useState(post.image);
    const [updating, setUpdating] = useState(false);
    const blogContext = useContext(BlogContext);
    const router = useRouter();
    

    const updatePostHandler = async (e) => {
        setUpdating(true);
        e.preventDefault();
        await blogContext.updatePost(id, title, image, author, content);
        router.push("/admin/blog-dashboard");
    }

   

  return (
      <>
      <div className="text-center">
          <button onClick={() => router.push("/admin/blog-dashboard")} className="bg-emerald-900 px-4 py-2 text-white font-semibold rounded-lg shadow-md">Back To All Posts</button>
      </div>
    <div className="container w-11/12 lg:w-3/6 mt-12 p-4 border-2 rounded-lg shadow-md mb-40">
      <form onSubmit={updatePostHandler}>
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
            maxLength="70"
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
        <button disabled={updating ? true : false} className="bg-emerald-900 px-4 py-2 rounded-md text-white font-semibold hover:bg-emerald-800">{updating ? <DualRingLoader/> : "Save Changes"}</button>
      </form>
    </div>
            </>
  );
};

export default PostEditForm;
