import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { BlogContext } from './blog-store';
const PostEditForm = ({post, id }) => {
    const [title, setTitle] = useState(post.title);
    const [author, setAuthor] = useState(post.author);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image);
    const blogContext = useContext(BlogContext);
    const router = useRouter();
    

    const updatePostHandler = async (e) => {
        e.preventDefault();
        const response = await blogContext.updatePost(id, title, author, content, image);
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
            type="text"
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
        <button className="bg-emerald-900 px-4 py-2 rounded-md text-white font-semibold">Save Changes</button>
      </form>
    </div>
            </>
  );
};

export default PostEditForm;
