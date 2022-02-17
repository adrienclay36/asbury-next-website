import React, { useState, useContext } from "react";
import PostItem from "./post-item/post-item";
import NewPrayerForm from "./new-prayer-form";
import { Collapse } from "@mantine/core";
import { FrontPrayerContext } from "./main-board-store";
import PageLoading from '../../PageLoading/PageLoading';
const BoardView = () => {
  const [open, setOpen] = useState(false);
  const prayerContext = useContext(FrontPrayerContext);
  

  return (
    <>
      <div className="text-center mt-12">
        <button
          onClick={() => setOpen(!open)}
          className="px-5 py-2 rounded-lg shadow-lg border-2 bg-seaFoam-600 text-white"
        >
          {open ? "Close" : "New Post"}
        </button>
      </div>




      <Collapse in={open}>
        <NewPrayerForm setOpen={setOpen} />
      </Collapse>

      <div className="container flex flex-col flex-1 justify-center items-center">
        {prayerContext.loading && <PageLoading/>}
        {prayerContext.posts.length > 0 && prayerContext.posts.map(post => (
          <PostItem key={post.id} id={post.id} author={post.author} title={post.title} date={post.postdate} content={post.postcontent} likes={post.likes} type={post.posttype}/>
        ))}
        {prayerContext.pageLoading && <PageLoading/>}
        {!prayerContext.hasMore && <p className="mt-12 font-bold text-gray-500">No More Posts...</p>}
      </div>
    </>
  );
};

export default BoardView;
