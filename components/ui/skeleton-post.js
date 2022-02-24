import React from "react";
import { Skeleton } from "@mantine/core";
const SkeletonPost = ({ width }) => {
  return (
    <>
      <div
        className={`bg-gray-100 z-10 container w-full ${width ? width : 'lg:w-3/6 md:w-5/6'} border-2 px-6 lg:px-10 md:px-10 pt-10 mt-12 rounded-lg shadow-md`}
      >
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} mb={50} width="70%" radius="xl" />
      </div>
    </>
  );
};

export default SkeletonPost;
