import React from 'react'
import { Skeleton } from '@mantine/core';
const SkeletonProfile = () => {
  return (
    <div className="flex flex-1 flex-col justify-center p-10 items-center w-11/12 lg:w-2/6 md:w-4/6 border-2 rounded-lg shadow-md mx-auto my-12">
      <Skeleton height={200} circle mb="xl" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} mb={50} width="70%" radius="xl" />
    </div>
  );
}

export default SkeletonProfile