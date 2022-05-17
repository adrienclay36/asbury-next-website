import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { BlogContext } from "../../../store/blog-store";
import DualRingLoader from "../../dual-ring-loader/DualRingLoader";
import CKEditorConfig from "./ck-editor-config";
import { supabase } from "../../../supabase-client";

const PostEditForm = ({ post, id }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.postcontent);
  const [image, setImage] = useState(
    post.image === "/images/blog-default.png" ? "" : post.image
  );
  const [updating, setUpdating] = useState(false);
  const blogContext = useContext(BlogContext);
  const router = useRouter();

  const updatePostHandler = async (e) => {
    setUpdating(true);
    e.preventDefault();
    if (title && content) {
      let imageContent;
      if (!image) {
        imageContent = "/images/blog-default.png";
      } else {
        imageContent = image;
      }

      const postData = {
        title: title,
        image: imageContent,
        postcontent: content,
      };

      const { data, error } = await supabase.from('posts').update(postData).match({id: id });
      if(error) {
        console.log("Error updating post:: ", error.message);
        return;
      }

     
    }
    router.push("/admin/bulletins-dashboard");
  };

  return (
    <>
      <div className="text-center">
        <button
          onClick={() => router.push("/admin/bulletins-dashboard")}
          className="bg-emerald-900 px-4 py-2 text-white font-semibold rounded-lg shadow-md"
        >
          Back To All Posts
        </button>
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
            <label htmlFor="image" className="text-lg mb-2 font-semibold">
              Image Link
            </label>
            <input
              onChange={(e) => setImage(e.target.value)}
              className="p-2"
              id="image"
              type="url"
              value={image}
            />
          </div>
          <div className="flex flex-1 flex-col mb-8">
            <label htmlFor="content" className="text-lg mb-2 font-semibold">
              Contents
            </label>
            <CKEditorConfig content={content} setContent={setContent} />
          </div>
          <button
            disabled={updating ? true : false}
            className="bg-emerald-900 px-4 py-2 rounded-md text-white font-semibold hover:bg-emerald-800"
          >
            {updating ? <DualRingLoader /> : "Save Changes"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PostEditForm;
