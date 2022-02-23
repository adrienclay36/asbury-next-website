import React from 'react'
import { Skeleton } from '@mantine/core';
const LibrarySkeleton = () => {
  return (
    <div
      className={`bg-gray-100 z-10 container w-full mt-12 mb-6 rounded-lg`}
    >
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
     
      <Skeleton height={8} mt={6} mb={50} width="70%" radius="xl" />
    </div>
  );
}

export default LibrarySkeleton