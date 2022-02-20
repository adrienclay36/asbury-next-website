import React from "react";
import { Skeleton } from "@mantine/core";
const SkeletonComment = () => {
  return (
    <>
      <div
        className={`bg-gray-100 z-10 container w-11/12 lg:w-2/6 md:w-2/6 border-2 px-6 lg:px-10 md:px-10 pt-10 mt-12 rounded-lg shadow-md`}
      >
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />

        <Skeleton height={8} mt={6} mb={50} width="50%" radius="xl" />
      </div>
    </>
  );
};

export default SkeletonComment;
