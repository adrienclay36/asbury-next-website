import React, { useState, useEffect, useContext } from "react";
import BlogList from "./blog-list";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import { UserContext } from "../../../store/user-context";
import { Plus } from 'tabler-icons-react';
import DualRingLoader from "../../dual-ring-loader/DualRingLoader";
import AsburyButton from "../../ui/AsburyButton";

const BlogOperations = () => {
  const userContext = useContext(UserContext);
  const [routing, setRouting] = useState(false);
  const router = useRouter();

  const navigateNewPost = () => {
    setRouting(true);
    router.push("/admin/bulletins-dashboard/new-post");
  };


  return (
    <div className="container my-12">
      {userContext.blogPermissions && (
        <div className="flex justify-center items-center w-full lg:w-1/6 md:w-1/6 mx-auto">
          
          <AsburyButton leftIcon={<Plus size={20} color="white" />} loading={routing} text="Add Post" onClick={() => navigateNewPost()} />
        </div>
      )}

      <BlogList />
    </div>
  );
};

export default BlogOperations;
