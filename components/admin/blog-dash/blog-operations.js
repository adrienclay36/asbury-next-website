import React, { useState, useEffect, useContext } from "react";
import BlogList from "./blog-list";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import { UserContext } from "../../../store/user-context";
import DualRingLoader from "../../dual-ring-loader/DualRingLoader";

const BlogOperations = () => {
  const userContext = useContext(UserContext);
  const [routing, setRouting] = useState(false);
  const router = useRouter();

  const navigateNewBook = () => {
    setRouting(true);
    router.push("/admin/bulletins-dashboard/new-post");
  };

  const buttonText = (
    <>
      <AiOutlinePlus size={25} className="mr-4" />
      <span className="mr-4 tracking-normal lg:tracking-wide md:tracking-wide">
        Add Post
      </span>
    </>
  );

  return (
    <div className="container my-12">
      {userContext.blogPermissions && (
        <div className="flex justify-center items-center w-full lg:w-1/6 md:w-1/6 mx-auto">
          <button
            onClick={navigateNewBook}
            className="flex flex-1 justify-center items-center px-7 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold uppercase rounded-lg"
          >
            {routing ? <DualRingLoader /> : buttonText}
          </button>
        </div>
      )}

      <BlogList />
    </div>
  );
};

export default BlogOperations;
