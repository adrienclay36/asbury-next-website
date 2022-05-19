import React, { useState, useContext } from "react";
import { BlogContext } from "../../../store/blog-store";
import { UserContext } from "../../../store/user-context";
import styles from "./new-post-form.module.css";
import { useRouter } from "next/router";
import { LoadingOverlay } from "@mantine/core";
import CKEditorConfig from "./ck-editor-config";
import { supabase } from "../../../supabase-client";
import AsburyButton from "../../ui/AsburyButton";
import { TextInput } from "@mantine/core";
const NewPostForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(true);
  const [adding, setAdding] = useState(false);
  const blogContext = useContext(BlogContext);
  const userContext = useContext(UserContext);

  const addPostHandler = async (e) => {
    setAdding(true);
    e.preventDefault();
    if (!title || !userContext.firstName || !userContext.lastName || !content) {
      setError(true);
      setAdding(false);
      return;
    }
    const author = `${userContext.firstName} ${userContext.lastName}`;
    let imageContent;
    if (image) {
      imageContent = image;
    } else {
      imageContent = "/images/blog-default.png";
    }
    const newPost = {
      title: title,
      image: imageContent,
      author,
      postcontent: content,
      postdate: new Date().toLocaleDateString("en-US", {
        timeZone: "America/Denver",
      }),
      user_id: userContext?.user?.id,
      avatar_url: userContext?.avatarURL,
    };
    const { data, error } = await supabase.from('posts').insert(newPost);
    if(error){
      console.log("Error adding blog post:: ", error.message);
      return;
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
      <div className="container w-11/12 lg:w-3/6 mt-12 p-4 border-2 rounded-lg shadow-md mb-40 relative">
        <LoadingOverlay visible={adding} />
        <form onSubmit={addPostHandler}>
          <div className="flex flex-1 flex-col mb-4">
            
            <TextInput
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              placeholder="Add a title"
              id="title"
              type="text"
              value={title}
              required
              maxLength="70"
            />
          </div>
          <div className="flex flex-1 flex-col mb-8">
            
            <TextInput
              label="Image Link"
              description="Leave this blank to use a default image"
              onChange={(e) => setImage(e.target.value)}
              placeholder="http://www.unsplash.com is a good place to find free stock images"
              id="image"
              type="url"
              value={image}
            />
          </div>
          <div className="flex flex-1 flex-col mb-8">
            <CKEditorConfig setContent={setContent} />
          </div>
          
          <AsburyButton text="Create Post" loading={adding} />
        </form>
      </div>
    </>
  );
};

export default NewPostForm;
