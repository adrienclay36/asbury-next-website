import React, { useState, useContext } from "react";
import PostItem from "./post-item/post-item";
import NewPrayerForm from "./new-prayer-form";
import { Collapse } from "@mantine/core";
import { FrontPrayerContext } from "./main-board-store";
import { UserContext } from "../../../store/user-context";
import PageLoading from "../../PageLoading/PageLoading";
import styles from "./board-view.module.css";
import { useRouter } from "next/router";
import SkeletonPost from "../../ui/skeleton-post";
const BoardView = () => {
  const [open, setOpen] = useState(false);
  const prayerContext = useContext(FrontPrayerContext);
  const userContext = useContext(UserContext);
  const router = useRouter();

  const adminMessage = (
    <div
      className={`${styles.init} text-center p-10 mt-4 shadow-md border-2 w-11/12 lg:w-2/6 md:w-2/6 mx-auto`}
    >
      <p>Welcome, {userContext.firstName}</p>
      <p>
        You are a moderator of this board. You will only see the moderator
        controls if you are logged in. You can find more controls in the admin
        dashboard
      </p>
      <button
        onClick={() => router.push("/admin/admin-dashboard")}
        className="px-3 py-2 bg-emerald-900 text-white rounded-lg mt-4"
      >
        Go To Admin Dashboard
      </button>
    </div>
  );

  return (
    <>
      {userContext.socialPermissions && adminMessage}
      <div className="text-center mt-12">
        <button
          onClick={() => setOpen(!open)}
          className="px-5 py-2 rounded-lg shadow-lg border-2 bg-seaFoam-600 text-white"
        >
          {open ? "Close" : "New Post"}
        </button>
      </div>

      <Collapse in={open}>
        <NewPrayerForm setOpen={setOpen}/>
      </Collapse>

      <div className="container flex flex-col flex-1 justify-center items-center">
        {prayerContext.loading && <SkeletonPost />}
        {prayerContext.posts.length > 0 &&
          prayerContext.posts.map((post) => (
            <PostItem
              key={post.id}
              id={post.id}
              post={post}
            />
          ))}
        {prayerContext.pageLoading && <PageLoading />}
        {!prayerContext.hasMore && !prayerContext.pageLoading && (
          <p className={`${styles.init} mt-12 font-bold text-gray-500`}>
            No More Posts...
          </p>
        )}
      </div>
    </>
  );
};

export default BoardView;
